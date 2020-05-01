import { Parser } from './Parser.js'
import {
	VariableDeclaration,
	IfStatement,
	ConsoleStatement,
	RepeatStatement,
	FunctionDeclaration,
	CallExpression
} from './Declarations.js'

import {
	ParsingError,
	EvaluationError
} from './Errors.js'


/**
 * @class
 * @abstract
 */
class Generator {
	/**
	 * Generates respective ST nodes
	 * @param {string} raw
	 * @static
	 * @override
	 */
	static generate(raw) { }
}


/**
 * @class
 * @abstract
 * @extends Generator
 */
export class VariableDeclarationGenerator extends Generator {
	static generate(raw) {
		const match = raw.match(RX_VARIABLE_DECLARATION)

		if (match) {
			const name = match[1]
			const value = match[2]

			return new VariableDeclaration(name, value, raw)
		}
		else throw new ParsingError(`في حاجة غلط وانت بتعمل متغير`, raw)
	}
}

/**
 * @class
 * @abstract
 * @extends Generator
 */
export class IfStatementGenerator extends Generator {
	static generate(raw) {
		const match = raw.match(RX_IF_STATEMENT)

		if (match) {
			const left = match[1]
			const right = match[4]
			const isNegated = match[2]
			const operator = match[3]
			const expr = match[5]
			const consequent = Parser.parseLine(expr.trim())

			return new IfStatement({
				right,
				left,
				operator,
				isNegated,
				consequent,
				raw: raw
			})
		}
		else throw new ParsingError(`في حاجة غلط وانت بتعمل الشرط`, raw)
	}
}

/**
 * @class
 * @abstract
 * @extends Generator
 */
export class ConsoleStatementGenerator extends Generator {
	static generate(raw) {
		const match = raw.match(RX_CONSOLE_STATEMENT)

		if (match) {
			const param = match[1]

			return new ConsoleStatement(param, raw)
		}
		else throw new ParsingError(`في حاجة غلط في الطباعة`, raw)
	}
}


/**
 * @class
 * @abstract
 * @extends Generator
 */
export class RepeatStatementGenerator extends Generator {
	static generate(raw) {
		const match = raw.match(RX_REPEAT_STATEMENT)

		if (match) {
			const count = Number(match[1])
			const expr = match[2]
			const consequent = Parser.parseLine(
				unescape(
					expr
						.trim()
				)
			)

			if (isNaN(count)) throw new ParsingError(Nabd, expr)

			return new RepeatStatement({ count, consequent, raw })
		}
		else throw new ParsingError(`في حاجة غلط وانت بتعمل الشرط`, raw)
	}
}

/**
 * @class
 * @abstract
 * @extends Generator
 */
export class FunctionDeclarationGenerator extends Generator {
	static generate(raw) {
		const match = raw.match(RX_FUNCTION_DECLARATION)

		if (match) {
			const name = match[1]
			const param = match[2]
			const expr = match[3]
			const body = Parser.parseLine(expr.trim())

			return new FunctionDeclaration({
				name,
				param,
				body,
				raw
			})
		}
		else throw new ParsingError(`في حاجة غلط وانت بتعمل الدالة`, raw)
	}
}
/**
 * @class
 * @abstract
 * @extends Generator
 */
export class CallExpressionGenerator extends Generator {
	static generate(raw) {
		const match = raw.match(RX_CALL_EXPRESSION)

		if (match) {

			const name = match[1]
			const param = match[2]
			return new CallExpression(name, param, raw)
		}
		else throw new ParsingError(`في حاجة غلط وانت بتعمل الدالة`, raw)
	}
}