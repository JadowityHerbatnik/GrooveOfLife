import Tone from "tone";
import { music } from "../utils/constants.js";

export function playEntireBoard(aliveCells, board, speed) {
  const highestOctave = music.highestOctave;
  const octaveRange = music.octaveRange;
  const numberOfRows = board.length;
  const time = (speed / 1000) * 0.7;
  // let notes = ["C", "D", "E", "F", "G", "A", "B"];
  // let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  // let notes = ["E", "G#", "B", "G", "A#", "C#", "D#"];
  // let notes = ["C", "C#", "D#", "F", "G", "A", "A#"];
  // let notes = ["D", "E", "F#", "G#", "B"]
  // let notes = ["C#", "F#", "B", "E", "A"];
  let notes = ["C#", "D", "F#", "A", "B"];
  // let notes = ["A#", "D#", "G#", "C#", "F#"];
  // let notes = ["C", "C#", "D#", "E", "F#", "G", "A", "A#"]
  // let notes = ["C", "E", "F#", "G", "B"]
  // let notes = ["C", "F#", "A#", "E", "A", "D"];
  // const all = [
  //   ["C", "E", "F#", "G", "B"],
  //   ["C", "C#", "D#", "E", "F#", "G", "A", "A#"],
  //   ["C", "F", "A#", "D#", "G#"],
  //   ["A#", "D#", "G#", "C#", "F#"],
  //   ["D", "E", "F#", "G#", "B"],
  //   ["C", "C#", "D#", "F", "G", "A", "A#"],
  //   ["E", "G#", "B", "G", "A#", "C#", "D#"],
  //   ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
  //   ["C", "D", "E", "F", "G", "A", "B"],
  // ];
  // let notes = all[Math.floor(Math.random() * all.length)];
  let chord = [];
  let aliveCellsPerRow = [];
  let numberOfNotes = notes.length;
  aliveCells.forEach(value => {
    if (typeof aliveCellsPerRow[value[0]] === "undefined") {
      aliveCellsPerRow[value[0]] = 0;
    }
    aliveCellsPerRow[value[0]] += value[1];
  });
  // console.log(aliveCellsPerRow);
  for (let i = 0; i < numberOfRows; i++) {
    if (typeof aliveCellsPerRow[i] !== "undefined") {
      const octave =
        highestOctave - Math.floor((i / numberOfRows) * octaveRange);
      const tone = notes[aliveCellsPerRow[i] % numberOfNotes];
      chord.push(`${tone}${octave}`);
    }
  }
  // console.log(chord);
  const chordNoDuplicates = [...new Set(chord)];
  // console.log(chordNoDuplicates);
  const final = [chordNoDuplicates[0]];
  for (let i = 1; i < chordNoDuplicates.length; i++) {
    if (chordNoDuplicates[i].slice(-1) !== chordNoDuplicates[i - 1].slice(-1)) {
      final.push(chordNoDuplicates[i]);
    }
  }
  // console.log(final);
  playChord(chordNoDuplicates.length, chordNoDuplicates, `${time}`);
}
export function playSelectedColumn(aliveCells, column, speed, board) {
  const time = (speed / 1000) * 0.7;
  const highestOctave = music.highestOctave;
  const octaveRange = music.octaveRange;
  const numberOfRows = board.length;
  const aliveCellsInColumn = aliveCells
    .filter(cell => cell[1] === column)
    .map(cell => cell[0]);
  // const notes = ["A", "B", "D", "F#", "C#"];
  let notes = ["C#", "D", "F#", "A", "B"];
  // let notes = ["C#", "D#", "F#", "G#", "A#"];

  const chord = aliveCellsInColumn.map(cell => {
    const octave =
      highestOctave - Math.floor((cell / numberOfRows) * octaveRange);
    const tone = notes[(numberOfRows - cell) % notes.length];
    return `${tone}${octave}`;
  });
  console.log(chord);
  const chordNoDuplicates = [...new Set(chord)];
  if (chordNoDuplicates.length > 0) {
    playChord(chordNoDuplicates.length, chordNoDuplicates, `${time}`);
  }
}
function playChord(numberOfNotes, chord, time) {
  const synth = new Tone.PolySynth(numberOfNotes, Tone.Synth, {
    volume: -20,
    oscillator: {
      type: "sine",
      // partials: [1, 2, 5, 6, 9, 15, 22, 30],
      // partials: [1, 0, 2, 0, 3],
    },
    envelope: {
      attack: 0.2,
      decay: time / 10,
      sustain: 0.7,
      release: 0.7,
    },
  }).toMaster();

  synth.triggerAttackRelease(chord, `${time}`);
}
