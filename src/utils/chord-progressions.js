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
]);
const getChords = (array) => array.map((val) => chords.get(val));
//prettier-ignore
const giant_steps_progression = [
  "Bmaj7", "D7", "G7", "A#7", "D#7", "D#7", "Am7", "D7",
  "G7", "A#7", "D#7", "F#7", "Bmaj7", "Bmaj7", "Fm7", "A#7",
  "D#7", "D#7", "Am7", "D7", "G7", "G7", "C#m7", "F#7",
  "Bmaj7", "Bmaj7", "Fm7", "A#7", "D#7", "D#7", "C#m7", "F#7",
];
export const giant_steps = getChords(giant_steps_progression);
export const progression = [
  [`D`, `D#`, `G`, `A#`],
  [`C#`, `D#`, "E", `G`, `A#`],
  [`C`, `D#`, `G`, `G#`],
  [`D#`, `F#`, `G#`, `B`],
  [`D`, `F`, `G`, `A#`],
  [`C`, `D`, `E`, `G`, `A#`],
  [`C`, `D#`, `F`, `G`, `G#`],
  [`D`, `F`, `G#`, `A#`, `B`],
];
export const progressions = { GiantSteps: giant_steps, default: progression };
