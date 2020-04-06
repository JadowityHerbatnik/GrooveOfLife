import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Paragraph } from "@about/Paragraph";
import { Grid, FlexBox } from "@common/Generic.js";
import { Layout } from "@about/Layout";
import styled from "styled-components";
import { keybindings, keybindings2 } from "@utils/paragraphs.js";
import { colors } from "@utils/constants.js";
const { white, yellow, red, green } = colors;
const GridContainer = styled(Grid)`
  display: grid;
  grid: auto / repeat(2, auto);
  grid-auto-flow: row;
`;
export const Keybindings = () => {
  return (
    <Layout name="keybindings" scrollTo="top">
      <FlexBox direction="column">
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Paragraph>
            {keybindings}
            <GridContainer>{keybindings2}</GridContainer>
          </Paragraph>
        </ScrollAnimation>
      </FlexBox>
    </Layout>
  );
};
