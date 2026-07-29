from flask import Flask, request
from flask_cors import CORS
from sqlalchemy import create_engine, text, Result
from sqlalchemy.orm import Session
from psycopg2.extras import Json

app = Flask(__name__)
CORS(app)

engine = create_engine("postgresql://pathfinder_world_user:UeXoSdrd1B47UxcC5DdUvl24lxnk7L7b@dpg-d9hunoo4n6ts73bj3i60-a.ohio-postgres.render.com/pathfinder_world")

@app.route("/")
def home():
    return {"status": "healthy"}, 200

@app.get("/api/world")
def get_world():
    with Session(engine) as session:
        continents = session.execute(text("SELECT name FROM continents")).all()
        cities = session.execute(text("SELECT name FROM cities")).all()
        
        #Each continent is a tuple with one value, gettings the index of the tuple then the value
        #probably a better way? but this is all I can see for now for python
        #I could modify asdict() here too, but this works for getting all
        continents_ret = [continents[i][0] for i in range(len(continents))]
        cities_ret = [cities[i][0] for i in range(len(cities))]

        return {"continents": continents_ret, "cities": cities_ret}, 200
    
@app.get("/api/continents")
def get_continents():
    with Session(engine) as session:
        continents = session.execute(text("SELECT name, info, id FROM continents")).all()

        continents_ret = [continent._asdict() for continent in continents]

        return {"continents": continents_ret}, 200

@app.get("/api/cities")
def get_cities():
    with Session(engine) as session:
        types = ["name", "interest_areas"]
        cities = session.execute(text("SELECT name, interest_areas, id FROM cities")).all()

        #There was a better way
        new_cities_ret = [city._asdict() for city in cities]

        #Same issue as above, feels a bit magic numbery
        #Likely a better conversion to json that I didn't see
        # cities_ret = []
        # for i in range(len(cities)):
        #     curr_city = {}
        #     for j in range(len(types)):
        #         curr_city[types[j]] = cities[i][j]

        #     cities_ret.append(curr_city)

        return {"cities": new_cities_ret}


@app.get("/api/npcs")
def get_npcs():
    with Session(engine) as session:
        npcs = session.execute(text("SELECT name, info, city_id, id FROM npcs")).all()

        npcs_ret = [npc._asdict() for npc in npcs]
        return {"npcs": npcs_ret}

#requires name, optional info
@app.post("/api/world/continent")
def add_continent():
    req = request.json
    if req.get("name"):
        with Session(engine) as session:
            session.execute(text("INSERT INTO continents (name, info) VALUES (:name, :info)"), {"name": req.get("name"), "info": req.get("info", None)})
            session.commit()
            return {"status":"created"}, 201
    return {"error": "Missing name from continent"}, 415


#requires name, continent_name, optional interest_areas
@app.post("/api/world/city")
def add_city():
    req = request.json
    if req.get("name"):
        with Session(engine) as session:
            continent_id = session.execute(text("SELECT id FROM continents WHERE name = :name"), {"name": req.get("continent_name")}).first()
            if continent_id:
                session.execute(text("INSERT INTO cities (name, interest_areas, continent_id, info) VALUES (:name, :interest_areas, :continent_id, :info)"), {"name": req.get("name"), "interest_areas": Json(req.get("interest_areas", [])), "info": req.get("info", ""), "continent_id": continent_id[0]})
                session.commit()
                return {"status":"created", "city": {"name": req.get("name"), "interest_areas": req.get("interest_areas", ""), "info": req.get("info", ""), "continent": req.get("continent_name")}}, 201
            else: 
                return {"error": f"Continent with name: {req.get("continent_name")} not found."}, 404
            
    return {"error": "Missing name from continent"}, 415

#requires name, continent_name, optional interest_areas
@app.post("/api/world/npcs")
def add_npc():
    req = request.json
    if req.get("name"):
        with Session(engine) as session:
            city_id = session.execute(text("SELECT id FROM cities WHERE name = :name"), {"name": req.get("city_name")}).first()
            if city_id:
                session.execute(text("INSERT INTO npcs (name, info, city_id) VALUES (:name, :info, :city_id)"), {"name": req.get("name"), "info": Json(req.get("info", "")), "city_id": city_id[0]})
                session.commit()
                return {"status":"created", "npc": {"name": req.get("name"), "info": req.get("info", ""), "city": req.get("city_name")}}, 201
            else: 
                return {"error": f"Continent with name: {req.get("city_name")} not found."}, 404
            
    return {"error": "Missing name from continent"}, 415

@app.get("/api/continents/<string:get_cont>")
def direct_to_continent(get_cont):
    with Session(engine) as session:
        continent = session.execute(text("SELECT id, name FROM continents WHERE name = :name"), {"name": get_cont}).first()
        if continent:
            continent = continent._asdict()
            cities = session.execute(text("SELECT name FROM cities WHERE continent_id = :id"), {"id": continent["id"]}).all()
            cities_ret = [cities[i][0] for i in range(len(cities))]

            return {"continent": {"name": continent["name"], "continent_id": continent["id"], "cities": cities_ret}}, 200
        
        return {"error": f"Continent with name: {get_cont} not found."}, 404
        
@app.get("/api/cities/<string:get_city>")
def direct_to_city(get_city):
    with Session(engine) as session:
        print(get_city)
        city = session.execute(text("SELECT id, name, interest_areas, continent_id, info FROM cities WHERE name = :name"), {"name": get_city}).first()

        if city:
            city = city._asdict()

            continent = session.execute(text("SELECT name FROM continents WHERE id = :id"), {"id": city["continent_id"]}).first()._asdict()
            
            npcs = session.execute(text("SELECT name FROM npcs WHERE city_id = :id"), {"id": city["id"]}).all()
            npcs_ret = [npc._asdict() for npc in npcs]

            city["continent"] = continent["name"]
            city["npcs"] = npcs_ret

            return {"result": "success", "city": city}, 200
        
        return {"error": f"City with name: {get_city} not found."}, 404


@app.get("/api/npcs/<string:get_npc>")
def direct_to_npc(get_npc):
    with Session(engine) as session:
        npc = session.execute(text("SELECT id, name, info, city_id FROM npcs WHERE name = :name"), {"name": get_npc}).first()
        

        if npc:
            npc = npc._asdict()
            city = session.execute(text("SELECT name FROM cities WHERE id = :id"), {"id": npc["city_id"]}).first()._asdict()
            npc["city"] = city["name"]
            return {"result": "success", "npc": npc }, 200
        
        return {"error": f"City with name: {get_npc} not found."}, 404

# TODO add extra routes for NPCs, add NPCs to cities, could be a patch route for cities to add them, same with continents.
        

if __name__ == "__main__":
    app.run(port=10000, host="0.0.0.0")