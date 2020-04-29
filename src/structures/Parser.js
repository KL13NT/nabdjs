import {
	VariableDeclarationGenerator,
	IfStatementGenerator,
	ConsoleStatementGenerator,
	RepeatStatementGenerator
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

		if (line.startsWith("#")) return ""
		else if (line.startsWith("حدد")) return VariableDeclarationGenerator.generate(line)
		else if (line.startsWith("لو")) return IfStatementGenerator.generate(line)
		else if (line.startsWith("كرر")) return RepeatStatementGenerator.generate(line)
		else if (line.startsWith("اطبع")) return ConsoleStatementGenerator.generate(line)
		else if (line.trim() === "") return ""
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