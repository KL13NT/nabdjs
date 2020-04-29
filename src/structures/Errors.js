export class GenericError extends Error {
	/**
	 *
	 * @param {string} code
	 * @param {string} expr
	 */
	constructor(code, expr) {
		super(code)

		this.name = "خطأ عام"
		this.expr = expr
	}

	/**
	 * @virtual
	 */
	toString() {
		if (typeof this.expr === "object") return `${ this.name } ${ this.expr.toString() }`
		else return `خطأ: ${ this.message } على سطر ${ this.expr }`
	}
}

export class ParsingError extends GenericError {
	/**
	 *
	 * @param {string} code
	 * @param {string} expr
	 */
	constructor(code, expr) {
		super(code, expr)

		this.name = "خطأ في بناء الجملة"
	}
}

export class EvaluationError extends GenericError {
	/**
	 *
	 * @param {string} code
	 * @param {string} expr
	 */
	constructor(code, expr) {
		super(code, expr)

		this.name = "خطأ في التشغيل"
	}
}