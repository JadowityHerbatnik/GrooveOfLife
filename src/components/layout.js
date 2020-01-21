import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
// import "./layout.css"
import { createGlobalStyle } from "styled-components"
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
		background-color: black
	}
	*, *::after. *::before {
		box-sizing: inherit
	}
`
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
