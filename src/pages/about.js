import React from "react";
import SEO from "@common/seo";
import { Introduction } from "@about/Intro";
import { Rules } from "@about/Rules";
import { Keybindings } from "@about/Keybindings";
import "animate.css/animate.min.css";

const IndexPage = () => {
  return (
    <>
      <SEO title="About" />
      <Introduction />
      <Rules />
      <Keybindings />
    </>
  );
};

export default IndexPage;
