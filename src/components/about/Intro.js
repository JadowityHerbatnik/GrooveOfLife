import React, { useContext } from "react";
import { intro } from "@utils/paragraphs.js";
import { Paragraph } from "@about/Paragraph";
import { FlexBox } from "@common/Generic.js";
import { Layout } from "@about/Layout";
import styled from "styled-components";
import { ThemeContext } from "@common/Layout";
const Img = styled.img`
  max-height: 20vh;
`;
export const Introduction = () => {
  const colors = useContext(ThemeContext);
  return (
    <Layout name="intro" scrollTo="rules">
      <FlexBox direction="column">
        <Paragraph colors={colors}> {intro} </Paragraph>
        <br />
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif"
          alt="Here was a nice gif, but apparently wiki servers are down"
        />
      </FlexBox>
    </Layout>
  );
};
