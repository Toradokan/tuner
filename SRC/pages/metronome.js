import { Page } from './page.js'

export class Metronome extends Page {
	constructor(state) {
		super(state, 'metronome')
		this.interval = null
		this.inputInterval = null
		this.tempo = 60
	}

	async play(event) {
		if (!this.interval) {
			this.setParams()
			event.target.setAttribute('style', 'border-color:lightGreen')
			this.state.audio.loop(0)
			this.setInterval()
		} else {
			this.stop(true)
		}
	}

	random(event) {
		if (event.type === 'click' || event.type === 'touchstart') {
			this.setTempo(Math.floor(Math.random() * 160) + 40)
			this.updateInput(event.target)
		}
	}

	setInterval() {
		this.lastTempo = this.tempo
		this.interval = setInterval(
			function(audio, tempo) {
				audio.loop(tempo)
			},
			100,
			this.state.audio,
			this.tempo
		)
	}

	setParams() {
		this.getTempo()
		this.getFrequency()
		this.getNote()
		this.state.audio.setFrequency(this.frequency.getFrequency())
	}

	start(event) {
		if (event.type === 'click' || event.type === 'touchstart') {
			this.play(event)
		}
	}

	stop(end = true) {
		if (this.interval) {
			window.clearInterval(this.interval)
			this.interval = null
			if (end) {
				this.state.audio.stop()
			}
		}
	}
}