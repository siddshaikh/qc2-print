import React from "react";
import Header from "../components/Header";
import DDComp from "../components/DDComp";
import Articalqc2Table from "../components/Articalqc2Table";

const Main = () => {
  return (
    <div>
      <Header />
      <div>
        <DDComp />
        <div className="overflow-scroll">
          <Articalqc2Table />
        </div>
      </div>
    </div>
  );
};

export default Main;
