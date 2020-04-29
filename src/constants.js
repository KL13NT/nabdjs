const GLOBAL_CONTEXT = globalThis || global || window

const ERROR_GENERIC = "حصل خطأ في التشغيل"
const ERROR_VARIABLE_NOT_DEFINED = "المتغير ده مش موجود"
const ERROR_COMPARISON_TYPES_NOT_IDENTICAL = "مينفعش تقارن متغيرين من نوعين مختلفين"
const ERROR_COMPARISON_NONEQUALITY_DIFFERENT_TYPES = "مينفعش تستخدم المعامل > او < في المقارنة بين انواع غير الارقام"
const ERROR_EMPTY_LINES_NOT_ALLOWED = "الاسطر الفاضية مش مسموح بيها"
const ERROR_PARSING_GENERIC = "خطأ في بناء الأمر"


const ERRORS = {
	Nabd0001: ERROR_GENERIC,
	Nabd0002: ERROR_VARIABLE_NOT_DEFINED,
	Nabd0003: ERROR_COMPARISON_TYPES_NOT_IDENTICAL,
	Nabd0004: ERROR_COMPARISON_NONEQUALITY_DIFFERENT_TYPES,
	Nabd0005: ERROR_EMPTY_LINES_NOT_ALLOWED,
	Nabd0006: ERROR_PARSING_GENERIC
}

Object.assign(GLOBAL_CONTEXT, ERRORS)