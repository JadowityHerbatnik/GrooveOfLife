import React, { useContext } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Paragraph } from "@about/Paragraph";
import { Grid, FlexBox } from "@common/Generic.js";
import { Layout } from "@about/Layout";
import styled from "styled-components";
import { keybindings, keyDescription } from "@utils/paragraphs.js";
import { ThemeContext } from "@common/Layout";

const KeyDiv = styled.div`
  background-color: ${({ colors }) => colors.brblack};
  width: 5em;
  height: 2em;
  margin: 5px;
  box-shadow: 2px 2px 0px black;
`;
function generateKeyDescription(colors) {
  let descriptions = [];
  keyDescription.forEach((value, key) => {
    descriptions.push(
      <>
        <KeyDiv colors={colors}>
          <span style={{ lineHeight: "2em" }}>
            <strong>{key}</strong>
          </span>
        </KeyDiv>
        <span className={value.color}>{value.desc}</span>
      </>,
    );
  });
  return descriptions;
}
const GridContainer = styled(Grid)`
  grid: auto / repeat(2, auto);
  grid-auto-flow: row;
`;
export const Keybindings = () => {
  const colors = useContext(ThemeContext);
  return (
    <Layout name="keybindings" scrollTo="top">
      <FlexBox direction="column">
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Paragraph colors={colors}>
            {keybindings}
            <GridContainer>{generateKeyDescription(colors)}</GridContainer>
          </Paragraph>
        </ScrollAnimation>
      </FlexBox>
    </Layout>
  );
};
