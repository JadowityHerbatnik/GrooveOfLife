import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Header from "./header";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
	html, body, main {
		box-sizing: border-box;
		text-align: center;
		font-size: 16px;
		font-family: "Montserrat", sans-serif;
  	margin: 0;
   	padding: 0;
		color: white;
		height: 100%;
	}
	*, *::after, *::before {
		box-sizing: border-box;
	}
`;
const BackgroundWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #000000;
  background-image: linear-gradient(to top, #1f498c, #1cb5e0);
  z-index: -5;
  &:before {
    z-index: -2;
    backdrop-filter: blur(30px);
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;
const Layout = props => {
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
      <GlobalStyle />
      <BackgroundWrapper>
        <Header
          siteTitle={data.site.siteMetadata.title}
          animateHeader={props.animateHeader}
        />
        <main>{props.children}</main>
      </BackgroundWrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
