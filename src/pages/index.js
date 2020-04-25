import React from "react";
import SEO from "@common/seo";
import { Game } from "@home/Game.js";
import { Tutorial } from "@tutorial/Tutorial";

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Game />
    <Tutorial />
  </>
);

export default IndexPage;
