import { formatValue, getVariable } from '../utils.js'
import { EvaluationError, GenericError } from './Errors.js'

/**
 * @class
 */
export class ExpressionEvaluator {
	/**
	 * Evaluates each line separately while providing scope
	 * @param {object} scope
	 * @param {object} expr
	 */
	static eval(scope, expr) {
		const { type } = expr

		if (type === "VariableDeclaration")
			return VariableDeclarationEvaluator.eval(scope, expr)
		else if (type === "ConsoleStatement")
			return ConsoleStatementEvaluator.eval(scope, expr)
		else if (type === "IfStatement")
			return IfStatementEvaluator.eval(scope, expr)
		else throw new GenericError(Nabd0001, expr)
	}
}


/**
 * @class
 */
export class VariableDeclarationEvaluator {
	/**
	 * Evaluatues variable declarations
	 * @param {object} scope
	 * @param {object} expr
	 */
	static eval(scope, expr) {
		const decl = expr.declaration
		const { type, value, name } = decl

		if (type === "string" || type === "number") scope[name] = value
		else if (type === "variable") {
			if (!scope[value]) throw new EvaluationError(Nabd0002, expr)

			scope[name] = scope[value]
		}
		else new GenericError(Nabd0001, expr)
	}
}

/**
 * @class
 */
export class ConsoleStatementEvaluator {
	/**
	 * Evaluatues console statements
	 * @param {object} scope
	 * @param {object} expr
	 */
	static eval(scope, expr) {
		const arg = expr.argument
		const { type, value } = arg

		if (type === "string" || type === "number") return value
		else if (type === "variable") {
			if (!scope[value]) throw new EvaluationError(Nabd0002, expr)

			return scope[value]
		}
		else GenericError(Nabd0001, expr)
	}
}

/**
 * @class
 */
export class IfStatementEvaluator {
	/**
	 * Evaluatues if statements
	 * @param {object} scope
	 * @param {object} expr
	 */
	static eval(scope, expr) {
		const { consequent } = expr

		if (this.isTrue(expr, scope)) return ExpressionEvaluator.eval(scope, consequent)
	}

	/**
	 * Compares the two given values using the respective operator
	 * @param {object} expr
	 */
	static compare({ rightValue, leftValue, type, operator }) {
		if ((operator === "<" || operator === ">") && type !== "number") throw new EvaluationError(Nabd0004, `${ rightValue }${ operator }${ leftValue }`)

		if (operator === "<") return leftValue < rightValue
		else if (operator === ">") return leftValue > rightValue
		else return leftValue === rightValue
	}

	/**
	 * Determines whether if statement condition is truthy
	 * @param {object} expr
	 * @param {object} scope
	 */
	static isTrue(expr, scope) {
		const { right, left, type, operator, isNegated } = expr

		const rightValue = right.type === "variable" ? getVariable(scope, right.name) : right.value
		const leftValue = left.type === "variable" ? getVariable(scope, left.name) : left.value

		if (typeof rightValue !== typeof leftValue) throw new EvaluationError(Nabd0003, expr)

		// passing right.type only since both are gonna be same type anyway
		const result = this.compare({ rightValue, leftValue, type: right.type, operator })
		return isNegated ? !result : result
	}
}