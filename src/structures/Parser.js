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

		if (line.startsWith("#")) return ""
		else if (line.startsWith("حدد")) return VariableDeclarationGenerator.generate(line)
		else if (line.startsWith("لو")) return IfStatementGenerator.generate(line)
		else if (line.startsWith("كرر")) return RepeatStatementGenerator.generate(line)
		else if (/^(اطبع)( +)([\u0600-\u06FF\w+ +]+|"[\u0600-\u06FF\w+ +]+")( +)?\.$/.test(line)) return ConsoleStatementGenerator.generate(line)
		else if (line.startsWith("دالة")) return FunctionDeclarationGenerator.generate(line)
		else if (/^([\u0600-\u06FF]+) *?\( *?([\u0600-\u06FF]+|"[\u0600-\u06FF\w+ +]+"|[0-9]+) *?\)\.$/.test(line)) return CallExpressionGenerator.generate(line)
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