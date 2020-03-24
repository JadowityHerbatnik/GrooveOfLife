import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout.js";
import styled from "styled-components";
import { intro, rules } from "../utils/paragraphs.js";
import { StyledIcon, FlexBox, WrapperButton } from "../components/Generic.js";
import { Table } from "../components/Table.js";
import { Link, animateScroll } from "react-scroll";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const GridContainer = styled.div`
  display: grid;
  grid: repeat(3, auto) / repeat(3, auto);
  grid-auto-flow: column;
  grid-gap: 2vmin 2vmin;
  justify-items: center;
  align-items: center;
`;
const Paragraph = styled.p`
  margin: auto;
  font-size: 16px;
  @media (min-width: 960px) {
    font-size: 22px;
  }
  @media (min-width: 300px) and (max-width: 960px) {
    font-size: calc(16px + 6 * (100vw - 300px) / (960 - 300));
  }
  padding: 10px;
  max-width: 90%;
  @media (orientation: landscape) {
    max-width: 70%;
  }
  // text-align: justify;
`;
const Container = styled.div`
  grid: 1fr 70px/ 1fr;
  // border: 5px solid black;
  display: grid;
  grid-gap: 3vh;
  height: ${({ height }) => `${height}px`};
  width: 100vw;
`;
// const Container = styled.div`
//   padding: 0 0 30px 0;
//   // border: 5px solid black;
//   position: relative;
//   box-sizing: border-box;
//   height: ${props => `${props.height}px`};
//   width: 100%;
//   background-color: rgba(0, 0, 0, 0);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

const Img = styled.img`
  // flex: 1 1 auto;
  // margin: 0 50px 0 50px;
  max-height: 20vh;
`;
const ScrollAnchor = props => {
  return (
    <Link to={props.target} duration={props.duration} smooth={true}>
      <StyledIcon className="icon-down-open"></StyledIcon>
    </Link>
  );
};
const IndexPage = () => {
  const [vh, setVh] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => setVh(window.innerHeight));
    setVh(window.innerHeight);
    return window.removeEventListener("resize", () => setVh(window.innerHeight));
  }, []);
  return (
    <Layout>
      <SEO title="Home" />
      <Container id="con1" height={vh * 0.85}>
        <FlexBox direction="column">
          <Paragraph> {intro} </Paragraph>
          <br />
          <Img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif"
            alt="Here was a nice gif, but apparently wiki servers are down"
          />
        </FlexBox>
        <WrapperButton>
          <ScrollAnchor duration={700} target="con2"></ScrollAnchor>
        </WrapperButton>
      </Container>
      <Container height={vh} id="con2">
        <FlexBox direction="column">
          <ScrollAnimation animateIn="fadeInUp">
            <Paragraph>{rules}</Paragraph>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp">
            <GridContainer>
              <Table active={[4]} />
              <StyledIcon className="icon-down-bold"></StyledIcon>
              <Table active={[]} />
              <Table active={[...Array(9).keys()]} />
              <StyledIcon className="icon-down-bold"></StyledIcon>
              <Table active={[]} />
              <Table active={[1, 3, 5]} />
              <StyledIcon className="icon-down-bold"></StyledIcon>
              <Table active={[4]} />
            </GridContainer>
          </ScrollAnimation>
        </FlexBox>
        <WrapperButton>
          <ScrollAnchor duration={700} target="con3"></ScrollAnchor>
        </WrapperButton>
      </Container>
      <Container height={vh} id="con3">
        <FlexBox direction="column">
          <ScrollAnimation animateIn="fadeInUp">
            <Paragraph>
              Ipsum rerum quas accusamus dolorum reprehenderit? Accusantium dignissimos
              perspiciatis suscipit at iste, cum consequatur aliquid. Neque maxime facilis
              explicabo nostrum recusandae Labore repudiandae sed maxime quos accusamus
              perferendis Ratione quam. Ipsum rerum quas accusamus dolorum reprehenderit?
              Accusantium dignissimos perspiciatis suscipit at iste, cum consequatur
              aliquid. Neque maxime facilis explicabo nostrum recusandae Labore
              repudiandae sed maxime quos accusamus perferendis Ratione quam.
            </Paragraph>
          </ScrollAnimation>
        </FlexBox>
        <WrapperButton>
          <StyledIcon
            className="icon-down-open"
            onClick={() => animateScroll.scrollToTop()}
            style={{ transform: "rotate(180deg)" }}
          ></StyledIcon>
        </WrapperButton>
      </Container>
    </Layout>
  );
};

export default IndexPage;
