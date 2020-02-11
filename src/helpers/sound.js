import Tone from "tone"

export default function sound(aliveCells, board, speed) {
  const lowestOctave = 3
  const octaveRange = 4
  const numberOfRows = board.length
  const time = (speed / 1000) * 0.7
  // let notes = ["C", "D", "E", "F", "G", "A", "B"]
  // let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  // let notes = ["E", "G#", "B", "G", "A#", "C#", "D#"]
  // let notes = ["C", "D", "E", "F#", "A", "A#"]
  // let notes = ["C", "C#", "D#", "F", "G", "A", "A#"]
  // let notes = ["D", "E", "F#", "G#", "B"]
  let notes = ["C", "F", "A#", "D#", "G#"]
  // let notes = ["C", "C#", "D#", "E", "F#", "G", "A", "A#"]
  // let notes = ["C", "E", "F#", "G", "B"]
  let chord = []
  let aliveCellsPerRow = []
  let numberOfNotes = notes.length
  aliveCells.forEach(value => {
    if (typeof aliveCellsPerRow[value[0]] === "undefined") {
      aliveCellsPerRow[value[0]] = 0
    }
    aliveCellsPerRow[value[0]] += value[1]
  })
  console.log(aliveCellsPerRow)
  for (let i = 0; i < numberOfRows; i++) {
    if (typeof aliveCellsPerRow[i] !== "undefined") {
      const octave = Math.floor((i / numberOfRows) * octaveRange) + lowestOctave
      const tone = notes[aliveCellsPerRow[i] % numberOfNotes]
      chord.push(`${tone}${octave}`)
    }
  }
  const chordNoDuplicates = [...new Set(chord)]

  const synth = new Tone.PolySynth(chordNoDuplicates.length, Tone.Synth, {
    volume: -20,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: time / 2,
      decay: time / 10,
      sustain: 0.9,
      release: time,
    },
  }).toMaster()

  synth.triggerAttackRelease(chordNoDuplicates, `${time}`)
}
