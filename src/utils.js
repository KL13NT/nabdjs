import {
	GenericError
} from './structures/Errors.js'


export function inferType(value) {
	const stringRegex = /^"[\u0600-\u06FF\w+ +]+"$/
	const variableRegex = /^([\u0600-\u06FF]+)$/
	const number = Number(value)
	const nan = isNaN(number)

	if (nan && stringRegex.test(value)) return "string"
	else if (nan && variableRegex.test(value)) return "variable"
	else if (!nan) return "number"
	else throw new GenericError(Nabd0009, value)
}

export function formatValue(value) {
	const type = inferType(value)

	if (type === "string") return String(value)
	else if (type === "number") return Number(value)
	else return value
}

export function getVariable(scope, name) {
	const value = scope[name]

	if (!value) throw new GenericError(Nabd0002, name)

	return value
}