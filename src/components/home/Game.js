import React, { useEffect, useReducer, useContext, createContext } from "react";
import styled from "styled-components";
import ButtonBar from "@home/ButtonBar";
import Board from "@home/Board.js";
import { HeightContext } from "@common/Layout";
import Settings from "@settings/Settings";
import reducer from "@reducer/Reducer";
import { keybindings } from "@utils/keybindings";
import { initialState } from "@reducer/initial-state";
import { playSelectedColumn, playEntireBoard } from "@helpers/sound";
import { usePrevious } from "@hooks/UsePrevious";
import { MAKE_STEP, PLAY_ALL, PLAY_PRESET } from "@reducer/action-types";
export const DispatchContext = createContext();
export const StateContext = createContext();

const GameWrapper = styled.div`
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => `${height}px`};
  width: 100vw;
  @media screen and (orientation: landscape) {
    width: 85vw;
    flex-direction: row;
  }
`;
export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //prettier-ignore
  const { isPlaying, isSuspended, board, aliveCells, mute, beatsPerChord, speedms, playMode, progressionMode, userChord, progression, activeColumn,  chord} = state;

  const { innerHeight, headerHeight } = useContext(HeightContext);
  const prevAliveCells = usePrevious(aliveCells);

  useEffect(() => {
    if (prevAliveCells === aliveCells) {
      return;
    }
    if (isSuspended || mute || !aliveCells.length || !userChord.length) {
      return;
    }
    const chordToPlay = progressionMode === PLAY_PRESET ? progression[chord] : userChord;
    if (playMode === PLAY_ALL) {
      playEntireBoard(aliveCells, board, speedms, chordToPlay);
    } else {
      playSelectedColumn(aliveCells, activeColumn, speedms, board, chordToPlay);
    }
  });

  useEffect(() => {
    function handleKeyPress(event) {
      const keyAction = keybindings[`${event.key}`];
      keyAction && dispatch(keyAction);
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [beatsPerChord, playMode, userChord, activeColumn]);

  useEffect(() => {
    let iteration = 0;
    const ID = setInterval(() => {
      if (isPlaying) {
        iteration = iteration >= beatsPerChord ? 1 : (iteration += 1);
        dispatch({ type: MAKE_STEP, changeChord: iteration >= beatsPerChord });
      }
    }, speedms);
    return () => {
      clearInterval(ID);
    };
  }, [beatsPerChord, speedms, isPlaying, mute, userChord, playMode]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <GameWrapper height={innerHeight - headerHeight}>
          <ButtonBar />
          <Board />
          <Settings />
        </GameWrapper>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
