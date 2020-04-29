import {
	VariableDeclaration,
	IfStatement,
	ConsoleStatement
} from './Declarations.js'

import {
	ParsingError,
	EvaluationError
} from './Errors.js'

import { Parser } from './Parser.js'

/**
 * @class
 * @abstract
 */
class Generator {
	/**
	 * Generates respective ST nodes
	 * @param {string} line
	 * @static
	 * @override
	 */
	static generate(line) { }
}


/**
 * @class
 * @abstract
 * @extends Generator
 */
export class VariableDeclarationGenerator extends Generator {
	static generate(line) {
		const variableNameRegex = /^([\u0600-\u06FF]+)$/
		const match = line.match(/^(حدد)( +)([\u0600-\u06FF]+)( +)?=( +)?(.+\.)$/)

		if (match) {
			const name = match[3]
			const value = match[6].replace('.', '')

			return new VariableDeclaration(name, value, line)
		}
		else throw new ParsingError(`في حاجة غلط وانت بتعمل متغير`, line)
	}
}

/**
 * @class
 * @abstract
 * @extends Generator
 */
export class IfStatementGenerator extends Generator {
	static generate(line) {
		const match = line.match(/^(لو)( +)([\u0600-\u06FF]+|"[\u0600-\u06FF\w+ +]+"|[0-9]+)( +)?(!)?(>|<|==)( +)?([\u0600-\u06FF]+|"[\u0600-\u06FF\w+ +]+"|[0-9]+)( +)?(:.+\.)$/)

		if (match) {
			const left = match[3]
			const right = match[8]
			const isNegated = match[5]
			const operator = match[6]
			const expr = match[10]
			const consequent = Parser.parseLine(expr.replace(/:/g, '').trim())

			return new IfStatement({ right, left, operator, isNegated, consequent })
		}
		else throw new ParsingError(`في حاجة غلط وانت بتعمل الشرط`, line)
	}
}

/**
 * @class
 * @abstract
 * @extends Generator
 */
export class ConsoleStatementGenerator extends Generator {
	static generate(line) {
		const match = line.match(/^(اطبع)( +)([\u0600-\u06FF +]+|"[\u0600-\u06FF +]+")( +)?\.$/)

		console.log("print line", line, match)
		if (match) {
			const param = match[3]

			return new ConsoleStatement(param)
		}
		else throw new ParsingError(`في حاجة غلط في الطباعة`, line)
	}
}