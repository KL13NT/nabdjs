import { evaluate } from './src/index.js'

const area = document.querySelector('textarea')
const display = document.querySelector('span')

function modifyContent(returned) {
	display.textContent = returned.toString().replace(/"/g, "").replace(/,/g, " ")
}

window.addEventListener('load', () => {
	area.value = `
حدد اللغة = "نبض".
حدد الكاتب = "نبيل ثروت".
اطبع "لغتي البرمجية هي".
اطبع اللغة.
اطبع "ومبرمجي وكاتبي هو ".
اطبع الكاتب.
لو "هاها" == "هاها": اطبع "هاها".
كرر 2: اطبع "جوا اللووب".
`
	area.addEventListener('keyup', e => {
		evaluate(area.value, modifyContent)
	})
})