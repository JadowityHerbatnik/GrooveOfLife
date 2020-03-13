import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
// import "./layout.css"
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
 // body {
 //   background-color: black;
 //   color: white;
 //   margin: 0;
 //   padding: 0;
 //   box-sizing: border-box;
 //  }
	html, body {
		box-sizing: border-box;
   margin: 0;
   padding: 0;
		color: white;
		background-image: linear-gradient(to right, blue, orange, blue);
		// background: linear-gradient(to right, rgba(254, 203, 111, 1) 0%, rgba(252, 155, 112, 1) 15%, rgba(237, 106, 111, 1) 30%, rgba(203, 78, 108, 1) 48%, rgba(140, 65, 104, 1) 65%, rgba(81, 60, 99, 1) 82%, rgba(57, 59, 98, 1) 100%);
		height: 100%;
	}
	*, *::after. *::before {
		box-sizing: inherit
	}
`;
const Layout = ({ children }) => {
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
      <Header
        siteTitle={data.site.siteMetadata.title}
        animateHeader={props.animateHeader}
      />
      <main>{props.children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
