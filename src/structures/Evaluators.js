import { formatValue, getVariable } from '../utils.js'
import { EvaluationError, GenericError } from './Errors.js'
import { VariableDeclaration } from './Declarations.js'

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

		const evaluators = {
			VariableDeclarationEvaluator,
			ConsoleStatementEvaluator,
			IfStatementEvaluator,
			RepeatStatementEvaluator,
			FunctionDeclarationEvaluator,
			CallExpressionEvaluator
		}

		const evaluator = evaluators[`${ type }Evaluator`]

		if (evaluator) return evaluator.eval(scope, expr)
		else throw new GenericError(Nabd0001, expr)
	}
}


/**
 * @class
 */
class VariableDeclarationEvaluator {
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

			// Functions are stored in global scope as objects while variables are primitives
			if (typeof scope[value] == "object")
				throw new EvaluationError(Nabd0011, expr)

			scope[name] = scope[value]
		}
		else new GenericError(Nabd0001, expr)
	}
}

/**
 * @class
 */
class ConsoleStatementEvaluator {
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
			if (typeof scope[value] == "object") throw new EvaluationError(Nabd0010, expr)

			return scope[value]
		}
		else new GenericError(Nabd0001, expr)
	}
}

/**
 * @class
 */
class IfStatementEvaluator {
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
		if ((operator === "<" || operator === ">") && type !== "number")
			throw new EvaluationError(
				Nabd0004,
				`${ rightValue }${ operator }${ leftValue }`
			)

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

		const rightValue = right.type === "variable"
			? getVariable(scope, right.name)
			: right.value

		const leftValue = left.type === "variable"
			? getVariable(scope, left.name)
			: left.value

		if (typeof rightValue !== typeof leftValue)
			throw new EvaluationError(Nabd0003, expr)

		// passing right.type only since both are gonna be same type anyway
		const result = this.compare({
			rightValue,
			leftValue,
			type: right.type,
			operator
		})

		return isNegated ? !result : result
	}
}

/**
 * @class
 */
class RepeatStatementEvaluator {
	/**
	 * Evaluatues if statements
	 * @param {object} scope
	 * @param {object} expr
	 */
	static eval(scope, expr) {
		const { count, consequent } = expr

		return this.repeat(scope, count, consequent)
	}

	/**
	 * Compares the two given values using the respective operator
	 * @param {object} expr
	 */
	static repeat(scope, count, consequent) {
		const result = []

		if (count >= Infinity) throw new EvaluationError(Nabd0008, consequent)

		for (let i = 0; i < count; i++) {
			result.push(ExpressionEvaluator.eval(scope, consequent))
		}

		return result
	}
}

/**
 * @class
 */
class FunctionDeclarationEvaluator {
	/**
	 * Evaluatues variable declarations
	 * @param {object} globalScope scope, but global
	 * @param {object} expr
	 */
	static eval(globalScope, expr) {
		const { raw, declaration } = expr
		const { name, param, body } = declaration
		const extant = globalScope[name]

		if (extant) {
			if (typeof extant == "object") throw new EvaluationError(Nabd0012, expr)
			else throw new EvaluationError(Nabd0013, expr)
		}
		else {
			globalScope[name] = expr
		}
	}
}

/**
 * @class
 */
class CallExpressionEvaluator {
	/**
	 * Evaluatues variable declarations
	 * @param {object} globalScope scope, but global
	 * @param {object} expr
	 */

	static prepareParams({ globalScope, functionScope, func, param, raw }) {
		const paramObject = globalScope[param.value] || new VariableDeclaration(func.declaration.param, param.value, raw)

		if (!globalScope[param.value]) VariableDeclarationEvaluator.eval(functionScope, paramObject)
		else functionScope[func.declaration.param] = paramObject
	}

	static eval(globalScope, expr) {
		const { name, param, raw } = expr
		const func = globalScope[name]

		if (!func) throw new EvaluationError(Nabd0002, expr)
		else {
			if (typeof func !== "object") throw new EvaluationError(Nabd0014, expr)
			else {
				// Create local function scope and add param value to it, then pass that scope to the function body expr.
				const functionScope = {}

				if (param) this.prepareParams({
					globalScope,
					functionScope,
					func,
					param,
					raw
				})

				return ExpressionEvaluator.eval(functionScope, func.declaration.body)
			}
		}
	}
}