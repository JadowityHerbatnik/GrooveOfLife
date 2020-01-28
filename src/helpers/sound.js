import Tone from "tone"

export default function sound(aliveCells, board, speed) {
  const cols = board[0].length
  const numberOfAliveCells = aliveCells.length
  let chord = []

  for (let i = 0; i < numberOfAliveCells; i++) {
    const freq =
      (aliveCells[i][0] + 1) * 100 + ((aliveCells[i][1] + 1) / cols) * 100
    chord.push(freq)
  }
  const synth = new Tone.PolySynth(5, Tone.Synth, {
    oscillator: {
      type: "sine",
    },
  }).toMaster()
  // console.log(chord)

  // const synth = new Tone.Synth().toMaster()
  const time = (speed / 1000) * 0.5
  synth.triggerAttackRelease(chord, `${time}`)
  // if (interval !== 0) {
  //   synth.triggerAttackRelease(chord, `${interval / 1000}`)
  // } else {
  //   synth.triggerAttackRelease(chord, `${interval / 1000}`)
  // }
}
