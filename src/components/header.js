import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Wrapper = styled.header`
  background-color: purple;
  text-align: center;
  height: 15vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const H1 = styled.h1`
  margin: 0;
  font-size: 7vh;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`
const Header = ({ siteTitle }) => (
  <Wrapper>
    <H1>
      <StyledLink to="/about">{siteTitle}</StyledLink>
    </H1>
  </Wrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
