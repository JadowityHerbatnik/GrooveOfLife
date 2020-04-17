import React, { useContext } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Paragraph } from "@about/Paragraph";
import { Table } from "@common/Table";
import { StyledIcon, FlexBox, Grid } from "@common/Generic.js";
import { Layout } from "@about/Layout";
import styled from "styled-components";
import { rules } from "@utils/paragraphs.js";
import { ThemeContext } from "@common/Layout";
const GridContainer = styled(Grid)`
  grid: repeat(3, auto) / repeat(3, auto);
  grid-auto-flow: column;
  grid-gap: 3vmin 3vmin;
`;
export const Rules = () => {
  const colors = useContext(ThemeContext);
  const { red, green, white, yellow } = colors;
  return (
    <Layout name="rules" scrollTo="keybindings">
      <FlexBox direction="column" justify="center">
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Paragraph colors={colors}>{rules}</Paragraph>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <GridContainer>
            <Table size={[3, 3]} active={[1, 3, 5]} />
            <StyledIcon color={yellow} className="icon-down-bold"></StyledIcon>
            <Table size={[3, 3]} color={{ 4: green }} />
            <Table size={[3, 3]} active={[4]} />
            <StyledIcon color={yellow} className="icon-down-bold"></StyledIcon>
            <Table size={[3, 3]} color={{ 4: red }} />
            <Table size={[3, 3]} active={[...Array(9).keys()]} />
            <StyledIcon color={yellow} className="icon-down-bold"></StyledIcon>
            <Table size={[3, 3]} color={{ 4: red }} />
          </GridContainer>
        </ScrollAnimation>
      </FlexBox>
    </Layout>
  );
};
