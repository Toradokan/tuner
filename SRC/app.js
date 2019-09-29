import { BeatTaker } from './beatTaker.js'
import { Metronome } from './metronome.js'
import { Tuner } from './tuner.js'
import { About } from './about.js'

class App {
	constructor(state) {
		this.state = state
		this.setPage()
		this.handleEvent = function(event) {
			this.toggleHide()
		}
		this.setBurger()
	}

	toggleHide(event) {
		this.state.nav.card.toggleAttribute('hidden')
	}

	setBurger() {
		let burger = document.getElementById('burger')

		burger.addEventListener('mouseup', this, false)
		this.state.nav.card.addEventListener('mouseup', this, false)
	}

	setPage() {
		let beat = this.getBeat()

		if (this.page) {
			this.page.removeEvents()
		}
		while (this.state.main.children.length) {
			this.state.main.removeChild(this.state.main.children[0])
		}
		switch (window.location.hash) {
			case '#tuner':
				this.page = new Tuner(this.state)
				break
			case '#metronome':
				this.page = new Metronome(this.state)
				if (beat) {
					this.page.setTempo(beat)
				}
				break
			case '#about':
				this.page = new About(this.state)
				break
			default:
				this.page = new BeatTaker(state)
		}
	}

	getBeat() {
		if (this.page && this.page.beat) {
			return this.page.beat.lastBeat.innerText
		}

		return false
	}
}

window.customElements.define('tuner-page', Tuner)

const state = {
	audio: null,
	main: document.querySelector('main'),
	nav: {
		card: document.querySelector('nav'),
	},
}

const app = new App(state)

window.onhashchange = function() {
	app.setPage()
}