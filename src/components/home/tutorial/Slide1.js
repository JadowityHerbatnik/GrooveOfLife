import React, { useContext } from "react";
import { SvgIcon, ScalableText } from "@common/Generic";
import { Play, Random } from "@styles/svg/Buttons";
import { ThemeContext } from "@common/Layout";
import styled from "styled-components";
const StyledSvg = styled(SvgIcon)`
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const Slide1 = () => {
  const colors = useContext(ThemeContext);
  return (
    <article className="d-flex h-100 align-items-center justify-content-center">
      <ScalableText min={12} max={18} as="div">
        <ScalableText min={18} max={25}>
          Welcome to the Groove of Life!
        </ScalableText>
        <br />
        <br />
        Click on the board to activate cells or use the{" "}
        <span>
          <StyledSvg color={colors.border} svg={Random} />
        </span>{" "}
        button to generate random board.
        <br />
        <br /> Press{" "}
        <span>
          <StyledSvg color={colors.green} svg={Play} />
        </span>{" "}
        and listen how the shape evolves!
        <br />
        <br />
      </ScalableText>
    </article>
  );
};
