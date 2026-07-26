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
        types = ["name", "cities"]
        data = session.execute(text("SELECT name, cities FROM continents")).all()

        continents = {}
        for continent in data:
            curr_cont = {}
            for i in range(len(continent)):
                curr_cont[types[i]] = continent[i]
            continents[curr_cont["name"]] = curr_cont["cities"]

        return {"data": continents}

@app.post("/api/world")
def add_content():
    req = request.json
    cities = req.get("cities")
    if cities:
        cities_json = Json(cities)
        with Session(engine) as session:
            session.execute(text("INSERT INTO continents (name, cities) VALUES (:name, :cities)"), {"name": req.get("name"), "cities": cities_json})
            session.commit()
            return {"ph": "ph"}, 201
    
    return {"ph": "pddddd"}, 415

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
                session.execute(text("INSERT INTO cities (name, interest_areas, continent_id) VALUES (:name, :interest_areas, :continent_id)"), {"name": req.get("name"), "interest_areas": Json(req.get("interest_areas", [])), "continent_id": continent_id})
                session.commit()
                return {"status":"created"}, 201
            else: 
                return {"error": f"Continent with name: {req.get("continent_name")} not found."}, 404
            
    return {"error": "Missing name from continent"}, 415
        


if __name__ == "__main__":
    app.run(port=10000, host="0.0.0.0")