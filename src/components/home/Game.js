import React, { useRef, useEffect, useReducer, useContext, createContext } from "react";
import styled from "styled-components";
import ButtonBar from "@home/ButtonBar";
import Board from "@home/Board.js";
import { HeightContext } from "@common/Layout";
import Settings from "@home/Settings";
import { debounce } from "lodash";
import reducer from "@reducer/Reducer";
import { keybindings } from "@utils/keybindings";
import { initialState } from "@reducer/initial-state";
import { playSelectedColumn, playEntireBoard } from "@helpers/sound";
import { usePrevious } from "@hooks/UsePrevious";
import { RESIZE_BOARD, MAKE_STEP, PLAY_ALL, PLAY_PRESET } from "@reducer/action-types";
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
  const { isPlaying, isSuspended, board, aliveCells, mute, speed, speedms, playMode, progressionMode, notes, progression, activeColumn,  chord} = state;

  const boardRef = useRef(null);
  const { innerHeight, headerHeight } = useContext(HeightContext);
  const prevAlive = usePrevious(aliveCells);

  useEffect(() => {
    const recalculate = debounce(() => {
      const { width, height } = boardRef.current.getBoundingClientRect();
      if (!!width && !!height) {
        dispatch({ type: RESIZE_BOARD, dimensions: [width, height] });
      }
    }, 100);
    window.addEventListener("resize", recalculate);
    recalculate();
    return () => window.removeEventListener("resize", recalculate);
  }, [innerHeight]);

  useEffect(
    () => {
      if (prevAlive === aliveCells) {
        return;
      }
      if (isSuspended || mute || !aliveCells.length || !notes.length) {
        return;
      }
      const chordToPlay = progressionMode === PLAY_PRESET ? progression[chord] : notes;
      if (playMode === PLAY_ALL) {
        playEntireBoard(aliveCells, board, speedms, chordToPlay);
      } else {
        playSelectedColumn(aliveCells, activeColumn, speedms, board, chordToPlay);
      }
    },
    //prettier-ignore
    [ board, aliveCells, prevAlive, activeColumn, playMode, isSuspended, notes, mute, progressionMode, progression, speedms, chord, ],
  );

  useEffect(() => {
    function handleKeyPress(event) {
      const keyAction = keybindings[`${event.key}`];
      keyAction && dispatch(keyAction);
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [speed, playMode, notes, activeColumn]);

  useEffect(() => {
    let iteration = 0;
    const ID = setInterval(() => {
      if (isPlaying) {
        iteration = iteration === speed ? 0 : (iteration += 1);
        dispatch({ type: MAKE_STEP, changeChord: iteration === speed });
      }
    }, speedms);
    return () => {
      clearInterval(ID);
    };
  }, [speed, speedms, isPlaying, mute, notes, playMode]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <GameWrapper height={innerHeight - headerHeight}>
          <ButtonBar />
          <Board ref={boardRef} />
          <Settings />
        </GameWrapper>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
