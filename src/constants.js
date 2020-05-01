const GLOBAL_CONTEXT = globalThis || global || window

const ERROR_GENERIC = "حصل خطأ في التشغيل"
const ERROR_VARIABLE_UNDEFINED = "المتغير ده مش موجود"
const ERROR_COMPARISON_TYPES_NOT_IDENTICAL = "مينفعش تقارن متغيرين من نوعين مختلفين"
const ERROR_COMPARISON_NONEQUALITY_DIFFERENT_TYPES = "مينفعش تستخدم المعامل > او < في المقارنة بين انواع غير الارقام"
const DEPRECATED_ERROR_EMPTY_LINES_NOT_ALLOWED = "الاسطر الفاضية مش مسموح بيها"
const ERROR_PARSING_GENERIC = "خطأ في بناء الأمر"
const ERROR_MISTACHING_TYPES = "المفروض نوع القيمة دي يكون مختلف"
const ERROR_BIGGER_THAN_INFINITY = "مينفعش تستخدم متغير اكبر من انفينيتي"
const ERROR_TYPE_INFERENCE_FAILED = "مش فاهم المتغير ده"
const ERROR_CANNOT_PRINT_TYPE = "مقدرش اطبع المتغير ده, متأكد انه مش دالة؟"
const ERROR_ASSIGN_VARIABLE_TO_FUNC = "مقدرش اخزن متغير مكان دالة"
const ERROR_FUNC_ALREADY_DECLARED = "الدالة دي موجودة مسبقاً"
const ERROR_ASSIGN_FUNC_TO_VARIABLE = "مينفعش اخزن دالة في متغير"
const ERROR_CALL_TO_NONFUNC = "مينفعش تشغل حاجة بالشكل ده الا الدوال"



const RX_VALUE = `[\\u0600-\\u06FF]+|"[\\u0600-\\u06FF\\w ]+"|[0-9]+`
const RX_NUMBER = `[0-9]+`
const RX_VARIABLE = `[\\u0600-\\u06FF]+`
const RX_OPERATORS = `(!)?(>|<|==)`


const RX_CONSOLE_STATEMENT = new RegExp(`^اطبع +(${ RX_VALUE }) *\\.$`)
const RX_REPEAT_STATEMENT = new RegExp(`^كرر +(${ RX_NUMBER }) *:(.+\\.)$`)
const RX_FUNCTION_DECLARATION = new RegExp(`^دالة +(${ RX_VARIABLE }) *\\( *(${ RX_VARIABLE })? *\\) *= *(.+\\.)$`)
const RX_CALL_EXPRESSION = new RegExp(`^(${ RX_VARIABLE }) *\\( *(${ RX_VALUE }) *\\) *\\.$`)
const RX_IF_STATEMENT = new RegExp(`^لو *(${ RX_VALUE }) *${ RX_OPERATORS } *(${ RX_VALUE }) *:(.+\\.)$`)
const RX_VARIABLE_DECLARATION = new RegExp(`^حدد +(${ RX_VARIABLE }) *= *(${ RX_VALUE }) *\\.$`)
const RX_COMMENT = /^#/



const ERRORS = {
	Nabd0001: ERROR_GENERIC,
	Nabd0002: ERROR_VARIABLE_UNDEFINED,
	Nabd0003: ERROR_COMPARISON_TYPES_NOT_IDENTICAL,
	Nabd0004: ERROR_COMPARISON_NONEQUALITY_DIFFERENT_TYPES,
	Nabd0005: DEPRECATED_ERROR_EMPTY_LINES_NOT_ALLOWED,
	Nabd0006: ERROR_PARSING_GENERIC,
	Nabd0007: ERROR_MISTACHING_TYPES,
	Nabd0008: ERROR_BIGGER_THAN_INFINITY,
	Nabd0009: ERROR_TYPE_INFERENCE_FAILED,
	Nabd0010: ERROR_CANNOT_PRINT_TYPE,
	Nabd0011: ERROR_ASSIGN_VARIABLE_TO_FUNC,
	Nabd0012: ERROR_FUNC_ALREADY_DECLARED,
	Nabd0013: ERROR_ASSIGN_FUNC_TO_VARIABLE,
	Nabd0014: ERROR_CALL_TO_NONFUNC
}



const REGEX = {
	RX_CONSOLE_STATEMENT,
	RX_REPEAT_STATEMENT,
	RX_FUNCTION_DECLARATION,
	RX_CALL_EXPRESSION,
	RX_IF_STATEMENT,
	RX_VARIABLE_DECLARATION,
	RX_COMMENT
}

Object.assign(GLOBAL_CONTEXT, ERRORS)
Object.assign(GLOBAL_CONTEXT, REGEX)