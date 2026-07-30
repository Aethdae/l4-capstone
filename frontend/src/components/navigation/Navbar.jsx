import React from "react";
import { Link, Links } from "react-router";
import {
  mainNavButtonClasses,
  transitionClasses,
} from "../../helpers/htmlClasses";

export default function Navbar() {
  return (
    <nav>
      <div className="flex gap-2 justify-center py-3">
        <Link
          className={
            mainNavButtonClasses.join(" ") + " " + transitionClasses.join(" ")
          }
          to={"/"}
        >
          Home
        </Link>
        <Link
          className={
            mainNavButtonClasses.join(" ") + " " + transitionClasses.join(" ")
          }
          to={"/continents"}
        >
          Continents
        </Link>
        <Link
          className={
            mainNavButtonClasses.join(" ") + " " + transitionClasses.join(" ")
          }
          to={"/cities"}
        >
          Cities
        </Link>
        <Link
          className={
            mainNavButtonClasses.join(" ") + " " + transitionClasses.join(" ")
          }
          to={"/npcs"}
        >
          NPCs
        </Link>
        <Link
          className={
            mainNavButtonClasses.join(" ") + " " + transitionClasses.join(" ")
          }
          to={"/management"}
        >
          Manage
        </Link>
      </div>
    </nav>
  );
}
