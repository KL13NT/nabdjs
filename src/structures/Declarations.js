import { inferType, formatValue } from '../utils.js'

class Node {
	/**
	 * Creates ST Nodes, extended for each type
	 * @param {string} type
	 */
	constructor(type) {
		this.type = type
	}

	/**
	 * Converts node to textual representation for output, overridden in children nodes
	 * @virtual
	 */
	toString() { }
}

/**
 * @augments Node
 */
export class VariableDeclaration extends Node {
	/**
	 * Creates VariableDeclaration SyntaxTree Node
	 * @param {string} name
	 * @param {string} value
	 * @param {string} raw
	 */
	constructor(name, value, raw) {
		super("VariableDeclaration")

		this.declaration = {
			name,
			value: formatValue(value),
			type: inferType(value),
		}

		this.raw = raw
	}

	/**
	 * @override
	 */
	toString() {
		return `تحديد متغير: ${ this.raw }`
	}
}

/**
 * @augments Node
 */
export class IfStatement extends Node {
	/**
	 * Creates IfStatement SyntaxTree Node
	 * @param {object} expr
	 */
	constructor({ right, left, operator, isNegated, consequent, raw }) {
		super("IfStatement")

		this.right = {
			name: right,
			value: formatValue(right),
			type: inferType(right)
		}
		this.left = {
			name: left,
			value: formatValue(left),
			type: inferType(left)
		}
		this.operator = operator
		this.consequent = consequent
		this.isNegated = isNegated ? true : false
		this.raw = raw
	}

	/**
	 * @override
	 */
	toString() {
		return `لو شرطية: ${ this.raw }`
	}
}

/**
 * @augments Node
 */
export class ConsoleStatement extends Node {
	/**
	 * Creates ConsoleStatement SyntaxTree Node
	 * @param {string} param
	 * @param {string} raw
	 */
	constructor(param, raw) {
		super("ConsoleStatement")

		this.argument = {
			value: param,
			type: inferType(param)
		}
		this.raw = raw
	}

	/**
	 * @override
	 */
	toString() {
		return `أمر طباعة: ${ this.raw }`
	}
}