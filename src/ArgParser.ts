

class Argument {
	public name;
	public description;
	public defaultValue: (any | undefined)
	public isRequired:boolean;
	public customDescriptionString;
	public customValueConstraintsMessage;
	public customVariadicValuePlaceholder;


	constructor(name:string, description:string, defaultValue?:any, required:boolean = false) {
		this.name = name;
		this.description = description;
		this.isRequired = required;
		this.defaultValue = defaultValue

		this.customDescriptionString = "";
		this.customValueConstraintsMessage = "";
		this.customVariadicValuePlaceholder = "VALUE";
	}

	formatArgument() {

	}

	get isVariadic() {
		return false;
	}
}

class OptionArgument extends Argument {
	public shortOption?
	public longOption?
	public isBooleanFlag = false;
	public isNegatable = false;

	constructor(
		name:string,
		description:string,
		defaultValue:any,
		required:boolean,
		shortOption?:string,
		longOption?:string
	) {
		super(name, description, defaultValue, required);
		this.shortOption = shortOption;
		this.longOption = longOption;
	}
}

class VariadicOptionsArgument extends OptionArgument {
	public values: any[];

	constructor(
		name:string,
		description:string,
		defaultValue:any,
		required:boolean,
		shortOption?:string,
		longOption?:string
	) {
		super(name,
			description,
			defaultValue,
			required,
			shortOption,
			longOption);

		this.values = [];
	}

	get isVariadic() {
		return true;
	}
}

class ChoicesOptionArgument extends OptionArgument {
	public choices: string[];

	constructor(
		name:string,
		description:string,
		defaultValue:any,
		required:boolean,
		choices:string[],
		shortOption?:string,
		longOption?:string,
	) {
		super(name,
			description,
			defaultValue,
			required,
			shortOption,
			longOption);

		this.choices = choices;
	}

}

class PositionalArgument extends Argument {

}

class ArgParser {
	parse(args?:[string]) {
		let cmdArgs;
		if (!args) {
			// If there are no args passed in, then by default grab process.argv and
			// subtract the first two arguments, which are "node" and "jscodeshift"
			cmdArgs = process.argv.slice(2);
		} else {
			cmdArgs = args;
		}
	}

	printHelp() {

	}

	get helpHeader(): string {
		const headerText =
		`Usage: jscodeshift [OPTION]... PATH...
		or:  jscodeshift [OPTION]... -t TRANSFORM_PATH PATH...
		or:  jscodeshift [OPTION]... -t URL PATH...
		or:  jscodeshift [OPTION]... --stdin < file_list.txt

		Apply transform logic in TRANSFORM_PATH (recursively) to every PATH.
		If --stdin is set, each line of the standard input is used as a path.

		Options:
		"..." behind an option means that it can be supplied multiple times.
		All options are also passed to the transformer, which means you can supply custom options that are not listed here.`;

		return headerText
	  }
}

export { ArgParser, OptionArgument, PositionalArgument, VariadicOptionsArgument, ChoicesOptionArgument };
