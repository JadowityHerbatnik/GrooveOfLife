import Tone from "tone";
import { music } from "@utils/constants.js";

const { highestOctave, octaveRange } = music;

const getTimeInSeconds = (speedms) => {
  const time = speedms / 1000;
  return time;
};

export function playEntireBoard(aliveCells, numberOfRows, speedms, notes) {
  const time = getTimeInSeconds(speedms);
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
  playChord(chordNoDuplicates, `${time}`);
}
export function playSelectedColumn(aliveCells, column, speedms, numberOfRows, notes) {
  const time = getTimeInSeconds(speedms);
  const aliveCellsInColumn = aliveCells.filter((cell) => cell[1] === column).map((cell) => cell[0]);

  const chord = aliveCellsInColumn.map((cell) => {
    const octave = highestOctave - Math.floor((cell / numberOfRows) * octaveRange);
    const tone = notes[(numberOfRows - 1 - cell) % notes.length];
    return `${tone}${octave}`;
  });
  const chordNoDuplicates = [...new Set(chord)];
  if (chordNoDuplicates.length > 0) {
    playChord(chordNoDuplicates, `${time}`);
  }
}
function playChord(chord, time) {
  const numberOfNotes = chord.length;
  const filter = new Tone.Filter(800, "lowpass", -12).toMaster();
  const synth = new Tone.PolySynth(numberOfNotes, Tone.Synth, {
    volume: -25,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.1,
      decay: 0,
      sustain: 1,
      release: 0.5,
    },
  });
  synth.connect(filter);
  synth.triggerAttackRelease(chord, time);
}
