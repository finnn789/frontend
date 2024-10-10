// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,

} from "@chakra-ui/react";
// import Sidebar from "../Components/Sidebar";
// import Navbar from "../Components/Navbar";
// import HomePage from "./Components/HomeDash";
import { Outlet, useLocation } from "react-router-dom";
// import SidebarKKS from "./Components/SidebarSKK";
// import NavbarKKKS from "./Components/NavbarSKK";

export function MachineLearning() {
  const [selectedNav, setSelectedNav] = useState("homeDash");
  const location = useLocation();

  const handleNavClick = (value) => {
    setSelectedNav(value);
  };
  const username = JSON.parse(localStorage.getItem("user")).username;;

  return (
    <Flex backgroundColor={"#F9FAFB"}>
      <iframe
        title="MachineLearning"
        src="http://10.3.8.84:8000/machine-learning/"
        width="100%"
        height="750vh"
      />    </Flex>
  );
}

export default MachineLearning;