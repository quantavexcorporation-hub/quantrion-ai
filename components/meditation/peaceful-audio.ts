"use client"

import type { SoundscapeId } from "./meditation-data"

type Nodes = {
  ctx: AudioContext
  master: GainNode
  stoppers: Array<() => void>
}

let active: Nodes | null = null

function ensureCtx(): AudioContext {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  return new AC()
}

function softNoiseBuffer(ctx: AudioContext, seconds = 2): AudioBuffer {
  const rate = ctx.sampleRate
  const buffer = ctx.createBuffer(1, rate * seconds, rate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02
    data[i] = last * 0.55
  }
  return buffer
}

function addPad(ctx: AudioContext, master: GainNode, freq: number, type: OscillatorType = "sine") {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  osc.type = type
  osc.frequency.value = freq
  filter.type = "lowpass"
  filter.frequency.value = 680
  gain.gain.value = 0.0001
  osc.connect(filter)
  filter.connect(gain)
  gain.connect(master)
  osc.start()
  gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 2.2)
  return () => {
    try {
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8)
      osc.stop(ctx.currentTime + 1)
    } catch {
      /* ignore */
    }
  }
}

function addNoiseBed(
  ctx: AudioContext,
  master: GainNode,
  opts: { volume: number; filterFreq: number; lfoHz?: number }
) {
  const src = ctx.createBufferSource()
  src.buffer = softNoiseBuffer(ctx, 3)
  src.loop = true
  const filter = ctx.createBiquadFilter()
  filter.type = "lowpass"
  filter.frequency.value = opts.filterFreq
  const gain = ctx.createGain()
  gain.gain.value = opts.volume
  src.connect(filter)
  filter.connect(gain)
  gain.connect(master)
  src.start()

  const stoppers: Array<() => void> = [
    () => {
      try {
        src.stop()
      } catch {
        /* ignore */
      }
    },
  ]

  if (opts.lfoHz) {
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = opts.lfoHz
    lfoGain.gain.value = opts.volume * 0.45
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    lfo.start()
    stoppers.push(() => {
      try {
        lfo.stop()
      } catch {
        /* ignore */
      }
    })
  }

  return () => stoppers.forEach((s) => s())
}

function addBowlPulse(ctx: AudioContext, master: GainNode) {
  const timers: number[] = []
  const strike = () => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.value = 220
    gain.gain.value = 0.0001
    osc.connect(gain)
    gain.connect(master)
    const now = ctx.currentTime
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5)
    osc.frequency.exponentialRampToValueAtTime(180, now + 4)
    osc.start(now)
    osc.stop(now + 5)
  }
  strike()
  timers.push(window.setInterval(strike, 7000))
  return () => timers.forEach((t) => window.clearInterval(t))
}

export async function startSoundscape(id: SoundscapeId, volume = 0.55): Promise<void> {
  stopSoundscape()
  const ctx = ensureCtx()
  if (ctx.state === "suspended") await ctx.resume()
  const master = ctx.createGain()
  master.gain.value = volume
  master.connect(ctx.destination)
  const stoppers: Array<() => void> = []

  switch (id) {
    case "soft-pads":
      stoppers.push(addPad(ctx, master, 110))
      stoppers.push(addPad(ctx, master, 164.8, "triangle"))
      stoppers.push(addPad(ctx, master, 220))
      break
    case "rain-garden":
      stoppers.push(addNoiseBed(ctx, master, { volume: 0.22, filterFreq: 1200 }))
      stoppers.push(addPad(ctx, master, 98))
      break
    case "ocean-breath":
      stoppers.push(addNoiseBed(ctx, master, { volume: 0.18, filterFreq: 700, lfoHz: 0.08 }))
      stoppers.push(addPad(ctx, master, 87, "triangle"))
      break
    case "forest-night":
      stoppers.push(addNoiseBed(ctx, master, { volume: 0.1, filterFreq: 500 }))
      stoppers.push(addPad(ctx, master, 123.5))
      stoppers.push(addPad(ctx, master, 185, "triangle"))
      break
    case "singing-bowl":
      stoppers.push(addPad(ctx, master, 130.8))
      stoppers.push(addBowlPulse(ctx, master))
      break
  }

  active = { ctx, master, stoppers }
}

export function setSoundscapeVolume(volume: number) {
  if (active) active.master.gain.value = Math.max(0, Math.min(1, volume))
}

export function stopSoundscape() {
  if (!active) return
  active.stoppers.forEach((s) => s())
  try {
    void active.ctx.close()
  } catch {
    /* ignore */
  }
  active = null
}
