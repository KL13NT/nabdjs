## NabdJS

NabdJS is an Arabic programming language created using JavaScript based on the principles of BASIC and the parsing of JavaScript itself.

### Demo

You can use the live REPL [here](nabdjs.netlify.app).

### How this works

Nabd code goes through 3 stages:

1.  Parse
2.  Generate syntax tree
3.  Evaluate tree

### Parsing

Parsing is done using `Parser` class. What it does is simple: take program input as string, split it up, and parse each line separately. If a line starts with a known keyword, a respective `NodeGenerator` will be used to create the respective Syntax Tree node, just like JS.

### Generating syntax tree

Generators are simple classes that parse each line using a simple `match` and determines what to do based on the result. If it's positive then the generator proceeds to creating the node by creating a new instance of the respective `Node` class available in `Declarations.js`.

### Evaluating the tree

Evaluation is the most cruicial step of the whole process. An `ExpressionEvaluator` is used to determine the type of node and the respective evaluator to use, after which the virtual `eval` method is called and passed a `scope` and the respective expression. If all is well, the scope will be modified respectivly and the evaluation will complete.

### Errors

There are multiple error types:

-   GenericError: The most generic type
-   ParsingError: Errors that happen when parsing the code
-   EvaluationError: Errors that occur during evaluation

### For more information

-   Documentation is available at [kl13nt.github.io/nabdjs/index.html](kl13nt.github.io/nabdjs/index.html) and the git repo.

### License

NabdJS is copyright (c) 2020-present Nabil Tharwat [nabil.tharwat@outlook.com](mailto:nabil.tharwat@outlook.com).

NabdJS is free software, licensed under the GNU GENERAL PUBLIC LICENSE v3 License. See the file `LICENSE` in this distribution for more details.
