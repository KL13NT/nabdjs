// نبض

// define constants, must be loaded before everything. (globals)
import './constants.js'

import { formatValue } from './utils.js'
import { Parser } from './structures/Parser.js'
import { ExpressionEvaluator } from './structures/Evaluators.js'


export function evaluate(program, hook) {
	const scope = {}
	const result = []

	try {
		const syntaxTree = Parser.parse(program)

		syntaxTree.forEach(node => {
			result.push(ExpressionEvaluator.eval(scope, node))
		})

	}
	catch (err) {
		result.push(`${ err.toString() }`)
		console.log(err)
	}

	hook(result)
	return result
}