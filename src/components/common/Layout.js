import React, { createContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { theme_names, color_themes } from "@utils/constants.js";
import Header from "@common/Header";
import { createGlobalStyle } from "styled-components";
import { useLocalStorageState } from "@hooks/UseLocalStorageState";
import { theme_key } from "@utils/local-storage-keys";
import { FlexBox } from "@common/Generic";
import { AboutLink } from "@common/AboutLink";
import { ThemeSwitch } from "@common/ThemeSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
export const ThemeContext = createContext();
export const SwitchTheme = createContext();
export const HeightContext = createContext();

const { gruvbox, solarized } = theme_names;

const GlobalStyle = createGlobalStyle`
	html, body, main {
		box-sizing: border-box;
		text-align: center;
		font-size: 10px;
		font-family: "Press Start 2P", cursive;
  	margin: 0;
   	padding: 0;
    background-color: ${({ colors }) => colors.background};
		color: ${({ colors }) => colors.grey};
		height: 100%;
	}
	*, *::after, *::before {
		box-sizing: border-box;
	}
`;
const TopBar = styled(FlexBox)`
  width: 100%;
  position: absolute;
  z-index: 2;
`;
const BackgroundWrapper = styled.div`
  position: relative;
  min-height: ${({ minHeight }) => `${minHeight}px`};
  background-color: ${({ colors }) => colors.background};
`;
const Layout = (props) => {
  const [innerHeight, setInnerHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [themeName, setThemeName] = useLocalStorageState(theme_key, gruvbox);
  const [themeColors, setThemeColors] = useState(color_themes[gruvbox]);
  const headerRef = useRef(null);

  const switchTheme = () => setThemeName(themeName === solarized ? gruvbox : solarized);

  useEffect(() => {
    setThemeColors(themeName === solarized ? color_themes[solarized] : color_themes[gruvbox]);
  }, [themeName]);

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
          <SwitchTheme.Provider value={() => switchTheme()}>
            <BackgroundWrapper minHeight={innerHeight} colors={themeColors}>
              <TopBar justify="space-between">
                <ThemeSwitch switchTheme={() => switchTheme()} />
                <AboutLink />
              </TopBar>
              <Header ref={headerRef} siteTitle={data.site.siteMetadata.title} />
              <main>{props.children}</main>
            </BackgroundWrapper>
          </SwitchTheme.Provider>
        </HeightContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
