import Tone from "tone"

export default function sound(aliveCells, rows, cols, interval) {
  const numberOfAliveCells = aliveCells.length
  let chord = []

  for (let i = 0; i < numberOfAliveCells; i++) {
    const freq = (aliveCells[i][0] + 1) * 100 + (aliveCells[i][1] / cols) * 100
    chord.push(freq)
  }
  // console.log(chord)
  const synth = new Tone.PolySynth(6, Tone.Synth, {
    oscillator: {
      type: "sine",
    },
  }).toMaster()

  synth.triggerAttackRelease(chord, `${interval / 1000}`)
  // if (interal !== 0) {
  //   synth.triggerAttackRelease(chord, `${interval / 1000}`)
  // } else {
  //   synth.triggerAttackRelease(chord, `${interval / 1000}`)
  // }
}
