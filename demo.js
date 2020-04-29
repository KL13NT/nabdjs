import { evaluate } from './src/index.js'

const area = document.querySelector('textarea')
const display = document.querySelector('span')

function modifyContent(returned) {
	display.textContent += '\n' + returned.toString().replace(/"/g, "").replace(/,/g, " ")
}

window.addEventListener('load', () => {
	area.addEventListener('keyup', e => {
		if (e.key === "Enter") {
			try {
				evaluate(area.value, modifyContent)
			}
			catch (err) {
				modifyContent(err.message)
				console.log(err)
			}
		}
		else if (e.key === "Backspace") {
			display.textContent = ""
		}
	})
})