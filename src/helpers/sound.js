import Tone from "tone"

export default function sound(aliveCells, board, speed) {
  if (!numberOfAliveCells) {
    return
  }
  const cols = board[0].length
  const numberOfAliveCells = aliveCells.length
  const time = (speed / 1000) * 0.7
  // let chord = ["C4", "E4", "F#4", "B4", "E5"]
  // let chord = ["E4", "A4"]
  let chord = []

  for (let i = 0; i < numberOfAliveCells; i++) {
    const freq = aliveCells[i][0] * 100 + ((aliveCells[i][1] + 1) / cols) * 100
    chord.push(freq)
  }

  const synth = new Tone.PolySynth(numberOfAliveCells, Tone.Synth, {
    volume: -40,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: time / 3,
      decay: time / 10,
      sustain: 0.9,
      release: time / 2,
    },
  }).toMaster()
  // console.log(chord)

  // const synth = new Tone.Synth().toMaster()
  synth.triggerAttackRelease(chord, `${time}`)
  // if (interval !== 0) {
  //   synth.triggerAttackRelease(chord, `${interval / 1000}`)
  // } else {
  //   synth.triggerAttackRelease(chord, `${interval / 1000}`)
  // }
}
