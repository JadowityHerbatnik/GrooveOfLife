const chords = new Map([
  ["D7", ["C", "D", "F#", "A"]],
  ["Bmaj7", ["D#", "F#", "A#", "B"]],
  ["G7", ["D", "F#", "G", "B"]],
  ["A#7", ["C", "D", "G", "G#", "A#"]],
  ["D#7", ["D", "D#", "F", "G", "A#"]],
  ["Am7", ["C", "E", "G", "A", "B"]],
  ["F#7", ["C#", "E", "F#", "A#"]],
  ["Fm7", ["C", "D#", "F", "G", "G#"]],
  ["Fm7", ["C", "D#", "F", "G", "G#"]],
  ["C#m7", ["C#", "E", "G#", "B"]],
  ["D#maj7", ["D", "D#", "G", "A#"]],
  ["D#7", ["C#", "D#", "G", "A#"]],
  ["G#7", ["C", "D#", "G", "G#"]],
  ["B6", ["D#", "F#", "G#", "B"]],
  ["A#6", ["D", "F", "G", "A#"]],
  ["C7", ["C", "D", "E", "G", "A#"]],
  ["Fm11", ["C", "D#", "F", "G", "G#"]],
  ["A#m9", ["D", "F", "G#", "A#", "B"]],
]);
const getChords = (array) => array.map((val) => chords.get(val));
//prettier-ignore
const giant_steps_progression = [
  "Bmaj7", "D7", "G7", "A#7", "D#7", "D#7", "Am7", "D7",
  "G7", "A#7", "D#7", "F#7", "Bmaj7", "Bmaj7", "Fm7", "A#7",
  "D#7", "D#7", "Am7", "D7", "G7", "G7", "C#m7", "F#7",
  "Bmaj7", "Bmaj7", "Fm7", "A#7", "D#7", "D#7", "C#m7", "F#7",
];
//prettier-ignore
const default_progression = [
  "D#maj7", "D#maj7", "D#7", "D#7", "G#7", "G#7", "B6", "B6",
  "A#6", "A#6", "C7", "C7", "Fm11", "Fm11", "A#m9", "A#m9",
];

const default_chords = getChords(default_progression);
const giant_steps = getChords(giant_steps_progression);

export const progressions = { GiantSteps: giant_steps, default: default_chords };
