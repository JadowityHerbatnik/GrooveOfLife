import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { colors, gruvbox } from "../utils/constants.js";
import Header from "./header";
import { createGlobalStyle } from "styled-components";
// const { grey, black, yellow } = colors;
export const ThemeContext = React.createContext(colors);

const GlobalStyle = createGlobalStyle`
	html, body, main {
		box-sizing: border-box;
		text-align: center;
		font-size: 16px;
		font-family: "Montserrat", sans-serif;
  	margin: 0;
   	padding: 0;
		color: ${({ colors }) => colors.grey};
		height: 100%;
	}
	*, *::after, *::before {
		box-sizing: border-box;
	}
`;
const BackgroundWrapper = styled.div`
  position: relative;
  background-color: ${({ colors }) => colors.black};
  // min-height: 100vh;
  min-height: 100vh;
  z-index: -5;
  // &:before {
  //   z-index: -2;
  //   backdrop-filter: blur(20px);
  //   content: "";
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  // }
`;
const Layout = (props) => {
  const [theme, setTheme] = useState("solarized");
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle colors={theme === "solarized" ? colors : gruvbox} />
      <ThemeContext.Provider value={theme === "solarized" ? colors : gruvbox}>
        <BackgroundWrapper colors={theme === "solarized" ? colors : gruvbox}>
          <Header
            setTheme={() => setTheme(theme === "solarized" ? "gruvbox" : "solarized")}
            siteTitle={data.site.siteMetadata.title}
            animateHeader={props.animateHeader}
          />
          <main>{props.children}</main>
        </BackgroundWrapper>
      </ThemeContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
