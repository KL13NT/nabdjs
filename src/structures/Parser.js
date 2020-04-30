import {
	VariableDeclarationGenerator,
	IfStatementGenerator,
	ConsoleStatementGenerator,
	RepeatStatementGenerator,
	FunctionDeclarationGenerator,
	CallExpressionGenerator
} from "./Generators.js"
import { ParsingError } from "./Errors.js"

/**
 * @class
 */
export class Parser {
	/**
	 * Parses each line separately
	 * @param {string} input
	 */
	static parseLine(input) {
		const line = input.trim()

		if (RX_COMMENT.test(line) || line.trim() === "") return ""
		else if (RX_VARIABLE_DECLARATION.test(line))
			return VariableDeclarationGenerator.generate(line)
		else if (RX_IF_STATEMENT.test(line))
			return IfStatementGenerator.generate(line)
		else if (RX_REPEAT_STATEMENT.test(line))
			return RepeatStatementGenerator.generate(line)
		else if (RX_CONSOLE_STATEMENT.test(line))
			return ConsoleStatementGenerator.generate(line)
		else if (RX_FUNCTION_DECLARATION.test(line))
			return FunctionDeclarationGenerator.generate(line)
		else if (RX_CALL_EXPRESSION.test(line))
			return CallExpressionGenerator.generate(line)
		else throw new ParsingError(Nabd0006, line)
	}

	/**
	 * Parses whole program using parseLine
	 * @param {string} input
	 */
	static parse(input) {
		const program = input.replace(/ +/g, ' ').trim().split('\n')
		const nodes = []

		program.forEach((line, index) => {
			const parsed = Parser.parseLine(line)

			if (parsed !== "") nodes.push(parsed)
		})

		return nodes
	}
}