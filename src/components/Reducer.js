import React, { useRef, useState, useEffect, useReducer } from "react";
import { sizes, progression, music } from "../utils/constants.js";
import { isEqual } from "lodash";
import { getAlive, calculateNextBoard } from "../helpers/makestep.js";
const { minSpeed, maxSpeed } = music;

const notesInOrder = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const chordReducer = (state, action, newAliveCelles = []) => {
  if (isEqual(newAliveCelles, state.aliveCells)) {
    return state.chord;
  }
  if (action.changeChord) {
    if (state.chord === progression.length - 1) {
      return 0;
    }
    return state.chord + 1;
  }
  return state.chord;
};
const dimensionReducer = (state, action) => {
  const [width, height] = action.dimensions;
  const numberOfCols = Math.floor(width / sizes.preferredCellSize) - 1;
  const numberOfRows = Math.floor(height / sizes.preferredCellSize);
  const newBoard = new Array(numberOfRows)
    .fill(false)
    .map(() => new Array(numberOfCols).fill(false));
  const oldNumberOfRows = state.board.length;
  const oldNumberOfCols = state.board[0].length;
  const numberOfRowsToCopy = Math.min(numberOfRows, oldNumberOfRows);
  const numberOfColsToCopy = Math.min(numberOfCols, oldNumberOfCols);
  for (let i = 0; i < numberOfRowsToCopy; i++) {
    for (let j = 0; j < numberOfColsToCopy; j++) {
      newBoard[i][j] = state.board[i][j];
    }
  }
  return newBoard;
};
export default function reducer(state, action) {
  switch (action.type) {
    case "togglePlaying":
      return { ...state, isPlaying: !state.isPlaying };
    case "resume":
      return { ...state, isSuspended: false, isPlaying: true };
    case "suspend":
      return { ...state, isSuspended: true, isPlaying: false };
    case "clear":
      return {
        ...state,
        isPlaying: false,
        board: state.board.map((val) => val.map(() => false)),
      };
    case "randomize":
      return {
        ...state,
        board: state.board.map((val) => val.map(() => Math.random() >= 0.8)),
      };
    case "dimensions":
      return { ...state, board: dimensionReducer(state, action) };
    case "boardClick":
      const [i, j] = action.coordinates;
      const clicked = Array.from(state.board);
      clicked[i][j] = !clicked[i][j];
      return { ...state, board: clicked };
    case "newBoard":
      const newAliveCells = getAlive(state.board);
      return {
        ...state,
        board: calculateNextBoard(state.board),
        aliveCells: newAliveCells,
        chord: chordReducer(state, action, newAliveCells),
      };
    case "nextColumn":
      const ifLastColumn = state.column + 1 >= state.board[0].length;
      return {
        ...state,
        column: ifLastColumn ? 0 : state.column + 1,
        board: ifLastColumn ? calculateNextBoard(state.board) : state.board,
        chord: chordReducer(state, action),
      };
    case "mute":
      return { ...state, mute: !state.mute };
    case "speed":
      return { ...state, speed: action.payload, speedms: 1000 / action.payload };
    case "increaseSpeed":
      const incSpeed = state.speed === maxSpeed ? state.speed : state.speed + 1;
      return { ...state, speed: incSpeed, speedms: 1000 / incSpeed };
    case "decreaseSpeed":
      const decSpeed = state.speed === minSpeed ? state.speed : state.speed - 1;
      return { ...state, speed: decSpeed, speedms: 1000 / decSpeed };
    case "columns":
      return { ...state, playMode: "columns" };
    case "entireBoard":
      return { ...state, playMode: "entireBoard", column: null };
    case "progressionMode":
      return { ...state, progressionMode: action.mode };
    case "scale":
      state.scale[action.key] = !state.scale[action.key];
      const newNotes = [];
      state.scale.forEach((value, index) => {
        if (value) {
          newNotes.push(notesInOrder[index]);
        }
      });
      return { ...state, scale: state.scale, notes: newNotes };
    default:
      throw new Error();
  }
}
