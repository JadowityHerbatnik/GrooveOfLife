import React, { createContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { solarized, gruvbox } from "@utils/constants.js";
import Header from "@common/Header";
import { createGlobalStyle } from "styled-components";
import { useLocalStorageState } from "@hooks/UseLocalStorageState";
export const ThemeContext = createContext();
export const HeightContext = createContext();

const GlobalStyle = createGlobalStyle`
	html, body, main {
		box-sizing: border-box;
		text-align: center;
		font-size: 16px;
		font-family: "Monospace", sans-serif;
  	margin: 0;
   	padding: 0;
    background-color: ${({ colors }) => colors.background}
		color: ${({ colors }) => colors.grey};
		height: 100%;
	}
	*, *::after, *::before {
		box-sizing: border-box;
	}
`;
const BackgroundWrapper = styled.div`
  position: relative;
  min-height: ${({ minHeight }) => `${minHeight}px`};
  // min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : "100vh")};
  // z-index: -5;
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
  const [innerHeight, setInnerHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [theme, setTheme] = useLocalStorageState("theme", "gruvbox");
  const headerRef = useRef(null);
  const themeColors = theme === "solarized" ? solarized : gruvbox;
  console.log(theme);

  useEffect(() => {
    const recalculate = debounce(() => {
      setInnerHeight(window.innerHeight);
      const { height } = headerRef.current.getBoundingClientRect();
      setHeaderHeight(height);
    }, 100);
    window.addEventListener("resize", recalculate);
    recalculate();
    return () => window.removeEventListener("resize", recalculate);
  }, [innerHeight]);

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
      <GlobalStyle colors={themeColors} />
      <ThemeContext.Provider value={themeColors}>
        <HeightContext.Provider value={{ innerHeight: innerHeight, headerHeight: headerHeight }}>
          <BackgroundWrapper minHeight={innerHeight} colors={themeColors}>
            <Header
              theme={theme}
              colors={themeColors}
              ref={headerRef}
              setTheme={() => setTheme(theme === "solarized" ? "gruvbox" : "solarized")}
              siteTitle={data.site.siteMetadata.title}
              animateHeader={props.animateHeader}
            />
            <main>{props.children}</main>
          </BackgroundWrapper>
        </HeightContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
