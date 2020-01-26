import Tone from "tone"

export default function sound(aliveCells, rows, cols, interval) {
  const numberOfAliveCells = aliveCells.length
  const synth = new Tone.Synth().toMaster()
  // var part = new Tone.Part(
  //   function(time, note) {
  //     synth.triggerAttackRelease(note, "8n", time)
  //   },
  //   [
  //     [0, "C2"],
  //     ["0:2", "C3"],
  //     ["0:3:2", "G2"],
  //   ]
  // ).start(0)
  // console.log("Asd")
  for (let i = 0; i < numberOfAliveCells; i++) {
    const freq =
      (aliveCells[i][0] + 1) * 100 + 200 + ((aliveCells[i][1] + 1) / cols) * 100
    const sound = new Tone.Synth()
      .toMaster()
      .triggerAttackRelease(`${freq}`, `${interval / 1000}`)
  }
}
