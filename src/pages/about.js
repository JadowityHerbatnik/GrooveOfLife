import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout.js";
import styled from "styled-components";
import { intro } from "../utils/paragraphs.js";
import { StyledIcon, FlexBox } from "../components/Generic.js";
import { Link, animateScroll } from "react-scroll";

const Paragraph = styled.p`
  margin: 0 50px 0 50px;
  max-width: 80%;
`;
const Container = styled.div`
  // border: 5px solid black;
  position: relative;
  box-sizing: border-box;
  height: ${props => `${props.height}px`};
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const Img = styled.img`
  margin: 0 50px 0 50px;
  max-height: 20vh;
`;
// const StyledLink = styled(Link)`
//   // position: absolute;
//   // bottom: 30px;
// `;
const ScrollAnchor = props => {
  return (
    <Link to={props.target} duration={props.duration} smooth={true}>
      <StyledIcon
        className="icon-down-open"
        style={props.rotate ? { transform: "rotate(180deg)" } : null}
      ></StyledIcon>
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

      <Container row id="con1" height={vh * 0.85}>
        <FlexBox row>
          <Paragraph> {intro} </Paragraph>
          <br />
          <Img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif"
            alt="Here was a nice gif, but apparently wiki servers are down"
          />
        </FlexBox>
        <ScrollAnchor duration={700} target="con2"></ScrollAnchor>
      </Container>
      <Container height={vh} id="con2">
        <Paragraph>
          Ipsum rerum quas accusamus dolorum reprehenderit? Accusantium dignissimos
          perspiciatis suscipit at iste, cum consequatur aliquid. Neque maxime facilis
          explicabo nostrum recusandae Labore repudiandae sed maxime quos accusamus
          perferendis Ratione quam.
        </Paragraph>
        <ScrollAnchor duration={700} target="con3"></ScrollAnchor>
      </Container>
      <Container height={vh} id="con3">
        <Paragraph>
          Ipsum rerum quas accusamus dolorum reprehenderit? Accusantium dignissimos
          perspiciatis suscipit at iste, cum consequatur aliquid. Neque maxime facilis
          explicabo nostrum recusandae Labore repudiandae sed maxime quos accusamus
          perferendis Ratione quam. Ipsum rerum quas accusamus dolorum reprehenderit?
          Accusantium dignissimos perspiciatis suscipit at iste, cum consequatur aliquid.
          Neque maxime facilis explicabo nostrum recusandae Labore repudiandae sed maxime
          quos accusamus perferendis Ratione quam.
        </Paragraph>
        <StyledIcon
          className="icon-down-open"
          onClick={() => animateScroll.scrollToTop()}
          style={{ transform: "rotate(180deg)" }}
        ></StyledIcon>
      </Container>
    </Layout>
  );
};

export default IndexPage;
