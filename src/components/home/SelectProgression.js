import React, { useContext } from "react";
import { progressions } from "@utils/chord-progressions";
import styled from "styled-components";
import { ThemeContext } from "@common/Layout";
import { StateContext, DispatchContext } from "@home/Game";
import { CHANGE_PROGRESSION } from "@reducer/action-types";

const StyledSelect = styled.select`
  background: ${({ colors }) => colors.background};
  width: 80%;
  margin: 1vh;
  border: ${({ colors }) => `2px solid ${colors.grey}`};
  color: ${({ colors }) => colors.grey};

  & > option {
    background: ${({ colors }) => colors.brblack};
    color: ${({ colors }) => colors.grey};
  }
`;
const renderOptions = () => {
  let options = [];
  for (const key in progressions) {
    options.push(
      <option key={key} value={key} name="chordProgression">
        {key}
      </option>,
    );
  }
  return options;
};
export const SelectProgression = () => {
  const dispatch = useContext(DispatchContext);
  const colors = useContext(ThemeContext);
  const { progressionName } = useContext(StateContext);
  const changeProgression = (e) =>
    dispatch({
      type: CHANGE_PROGRESSION,
      progression: progressions[e.target.value],
      name: e.target.value,
    });
  return (
    <form>
      <StyledSelect onChange={(e) => changeProgression(e)} value={progressionName} colors={colors}>
        {renderOptions()}
      </StyledSelect>
    </form>
  );
};
