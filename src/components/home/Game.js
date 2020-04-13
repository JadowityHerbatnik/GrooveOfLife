import React, { useRef, useEffect, useReducer, useContext, createContext } from "react";
import styled from "styled-components";
import ButtonBar from "@home/ButtonBar.js";
import Board from "@home/Board.js";
import { HeightContext } from "@common/Layout.js";
import Settings from "@home/Settings.js";
import { debounce } from "lodash";
import reducer from "../Reducer.js";
import { initialState, keybindings } from "@utils/constants.js";
import { playSelectedColumn, playEntireBoard } from "@helpers/sound.js";
import { usePrevious } from "@hooks/UsePrevious";
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
        dispatch({ type: "dimensions", dimensions: [width, height] });
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
      const chordToPlay = progressionMode === "auto" ? progression[chord] : notes;
      if (playMode === "entireBoard") {
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
        dispatch({ type: "step", changeChord: iteration === speed });
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
