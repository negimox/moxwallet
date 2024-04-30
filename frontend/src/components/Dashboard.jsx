import React from "react";
import { Link } from "react-router-dom";
import { SVG_MONEY } from "../utils/constants.jsx";
import User from "./User.jsx";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen px-10 py-14">
      <h2 className="font-black text-accent text-4xl">Dashboard</h2>
      <div className="divider"></div>
      <User />
    </div>
  );
};

export default Dashboard;
