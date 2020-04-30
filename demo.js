import { evaluate } from './src/index.js'

const area = document.querySelector('textarea')
const display = document.querySelector('span')

function modifyContent(returned) {
	display.innerHTML = returned.join('<br>').replace(/"/g, "")
}

window.addEventListener('load', () => {
	area.value = `
# اهلاً بيكم
# انا نبيل ثروت, كاتب لغة "نبض" البرمجية
# اللغة دي انا عملتها في ليلة وضحاها, كنت عايز تحدي صغير بعيد عن عك الشغل و الecosystem الكبير اللي غالباً بشتغل بيه

# اللغة زي مانتوا شايفين بتدعم التعليقات (code comments), بجانب شوية اوامر اساسية و هما:

# حدد: لعمل المتغيرات (variables) و دول global دايماً. مثال ليها:
حدد اسمي = "نبيل".
حدد اللغة = "نبض".
# لو: لعمل الشروط و الاكواد الشرطية (if conditionals). مثال ليها:
لو اسمي == "نبيل": اطبع اسمي.

# كرر: لتكرار الاوامر. مثال ليها:
كرر 3: اطبع "نبض".

# اطبع: طبعاً من اسمها, لطباعة متغيرات او قيم. مثال ليها:
اطبع "مرحباً بكم".

# الاوامر (كرر, لو) تقدروا تعملوهم جوا بعض (nested) و تقدروا تسجلوا قيم متغيرات في متغيرات تانية.
كرر 3: لو اسمي == "نبيل": لو اللغة == "نبض": اطبع "اهلاً وسهلاً".

# الكود بيتم تشغيلة بشكل تلقائي لما تعدلوا عليه
# الدوال ملهمش وصول للمتغيرات الخارجية الا عن طريق البراميتر
`
	area.addEventListener('keyup', e => {
		evaluate(area.value, modifyContent)
	})
})