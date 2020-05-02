import React, { useContext } from "react";
import styled from "styled-components";
import { DispatchContext } from "@home/Game";
import { ThemeContext } from "@common/Layout";

const StyledSpan = styled.span`
  color: ${({ colors }) => `${colors.grey} !important`};
  &::before {
    color: ${({ isChecked, colors }) => `${isChecked ? colors.border : colors.black} !important`};
  }
`;
export const RadioInput = ({ name, value, dependency }) => {
  const dispatch = useContext(DispatchContext);
  const colors = useContext(ThemeContext);
  const isChecked = dependency === value;
  return (
    <>
      <label colors={colors} htmlFor={value}>
        <input
          className="nes-radio is-dark"
          colors={colors}
          checked={isChecked}
          type="radio"
          name={name}
          value={value}
          id={value}
          onChange={(e) => dispatch({ type: e.target.value })}
        />
        <StyledSpan colors={colors} isChecked={isChecked}>
          {value}
        </StyledSpan>
      </label>
    </>
  );
};
