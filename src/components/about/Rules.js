import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Paragraph } from "@about/Paragraph";
import { Table } from "@common/Table";
import { StyledIcon, FlexBox, Grid } from "@common/Generic.js";
import { Layout } from "@about/Layout";
import styled from "styled-components";
import { rules } from "@utils/paragraphs.js";
import { colors } from "@utils/constants.js";
const { white, yellow, red, green } = colors;
const GridContainer = styled(Grid)`
  grid: repeat(3, auto) / repeat(3, auto);
  grid-auto-flow: column;
  grid-gap: 3vmin 3vmin;
`;
export const Rules = () => {
  return (
    <Layout name="rules" scrollTo="keybindings">
      <FlexBox direction="column" justify="center">
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Paragraph>{rules}</Paragraph>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <GridContainer>
            <Table size={[3, 3]} active={[4]} />
            <StyledIcon color={yellow} className="icon-down-bold"></StyledIcon>
            <Table size={[3, 3]} active={[]} />
            <Table size={[3, 3]} active={[...Array(9).keys()]} />
            <StyledIcon color={yellow} className="icon-down-bold"></StyledIcon>
            <Table size={[3, 3]} active={[]} />
            <Table size={[3, 3]} active={[1, 3, 5]} />
            <StyledIcon color={yellow} className="icon-down-bold"></StyledIcon>
            <Table size={[3, 3]} active={[4]} />
          </GridContainer>
        </ScrollAnimation>
      </FlexBox>
    </Layout>
  );
};
