import React from "react";
import { Navbar } from "../navbar/navbar";
import Hero from "./hero";
type Props = {};

function Home({}: Props) {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;
