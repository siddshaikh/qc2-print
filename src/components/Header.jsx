import React from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-evenly">
      <h1 className="uppercase">QC2 Check</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Header;
