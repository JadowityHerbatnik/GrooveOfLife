import React from "react";
import SEO from "@common/seo";
import { Game } from "@home/Game.js";

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Game />
  </>
);

export default IndexPage;
