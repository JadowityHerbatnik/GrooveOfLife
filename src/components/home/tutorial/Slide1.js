import React, { useContext } from "react";
import { SvgIcon, ScalableText } from "@common/Generic";
import { Play, Random } from "@styles/svg/Buttons";
import { ThemeContext } from "@common/Layout";
import styled from "styled-components";
const StyledSvg = styled(SvgIcon)`
  display: inline-block;
  width: 1.3em;
  height: 1.3em;
`;

export const Slide1 = () => {
  const colors = useContext(ThemeContext);
  return (
    <article className="d-flex h-100 align-items-center justify-content-center">
      <ScalableText min={9} max={13} as="div">
        <ScalableText min={14} max={20}>
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
