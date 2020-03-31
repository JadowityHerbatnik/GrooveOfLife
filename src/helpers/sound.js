import Tone from "tone";
import { music } from "../utils/constants.js";
const { highestOctave, octaveRange } = music;
const getCommonVariables = (board, speedms) => {
  const numberOfRows = board.length;
  const time = (speedms / 1000) * 0.95;
  return { numberOfRows, time };
};

export function playEntireBoard(aliveCells, board, speedms, notes) {
  const { numberOfRows, time } = getCommonVariables(board, speedms);
  let chord = [];
  let aliveCellsPerRow = [];
  let numberOfNotes = notes.length;
  aliveCells.forEach((value) => {
    if (typeof aliveCellsPerRow[value[0]] === "undefined") {
      aliveCellsPerRow[value[0]] = 0;
    }
    aliveCellsPerRow[value[0]] += value[1];
  });
  for (let i = 0; i < numberOfRows; i++) {
    if (typeof aliveCellsPerRow[i] !== "undefined") {
      const octave = highestOctave - Math.floor((i / numberOfRows) * octaveRange);
      const tone = notes[aliveCellsPerRow[i] % numberOfNotes];
      chord.push(`${tone}${octave}`);
    }
  }
  const chordNoDuplicates = [...new Set(chord)];
  playChord(chordNoDuplicates.length, chordNoDuplicates, `${time}`);
}
export function playSelectedColumn(aliveCells, column, speedms, board, notes) {
  const { numberOfRows, time } = getCommonVariables(board, speedms);
  const aliveCellsInColumn = aliveCells.filter((cell) => cell[1] === column).map((cell) => cell[0]);
  console.log(aliveCellsInColumn);

  const chord = aliveCellsInColumn.map((cell) => {
    const octave = highestOctave - Math.floor((cell / numberOfRows) * octaveRange);
    const tone = notes[(numberOfRows - 1 - cell) % notes.length];
    return `${tone}${octave}`;
  });
  const chordNoDuplicates = [...new Set(chord)];
  if (chordNoDuplicates.length > 0) {
    playChord(chordNoDuplicates.length, chordNoDuplicates, `${time}`);
  }
}
function playChord(numberOfNotes, chord, time) {
  // console.log(time);
  // const ping = new Tone.PingPongDelay(0.16, 0.2).toMaster();

  const filter = new Tone.Filter(600, "lowpass").toMaster();
  const synth = new Tone.PolySynth(numberOfNotes, Tone.Synth, {
    volume: -30,
    oscillator: {
      type: "sine",
    },
    // filter: {
    //   Q: 3,
    //   type: "allpass",
    //   rolloff: -24,
    // },
    envelope: {
      attack: 0.1,
      decay: 0,
      sustain: 1,
      release: 0.3,
    },
    // filterEnvelope: {
    //   attack: 0.2,
    //   decay: 0,
    //   sustain: 1,
    //   release: 0.2,
    //   min: 20,
    //   max: 20,
    //   exponent: 2,
    // },
  });
  // const feedbackDelay = new Tone.FeedbackDelay(0.2, 0.3).toMaster();
  synth.connect(filter);
  // synth.toMaster();
  // synth.connect(feedbackDelay);
  synth.triggerAttackRelease(chord, time);
}
