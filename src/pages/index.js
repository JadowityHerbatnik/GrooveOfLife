import React from "react";
import SEO from "@common/seo";
import { Game } from "@home/Game.js";
import "nes.css/css/nes.min.css";

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Game />
  </>
);

export default IndexPage;
