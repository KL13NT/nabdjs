const GLOBAL_CONTEXT = globalThis || global || window

const ERROR_GENERIC = "حصل خطأ في التشغيل"
const ERROR_VARIABLE_NOT_DEFINED = "المتغير ده مش موجود"
const ERROR_COMPARISON_TYPES_NOT_IDENTICAL = "مينفعش تقارن متغيرين من نوعين مختلفين"
const ERROR_COMPARISON_NONEQUALITY_DIFFERENT_TYPES = "مينفعش تستخدم المعامل > او < في المقارنة بين انواع غير الارقام"
const DEPRECATED_ERROR_EMPTY_LINES_NOT_ALLOWED = "الاسطر الفاضية مش مسموح بيها"
const ERROR_PARSING_GENERIC = "خطأ في بناء الأمر"
const ERROR_MISTACHING_TYPES = "المفروض نوع القيمة دي يكون مختلف"
const ERROR_BIGGER_THAN_INFINITY = "مينفعش تستخدم متغير اكبر من انفينيتي"
const ERROR_TYPE_INFERENCE_FAILED = "مش فاهم المتغير ده"


const ERRORS = {
	Nabd0001: ERROR_GENERIC,
	Nabd0002: ERROR_VARIABLE_NOT_DEFINED,
	Nabd0003: ERROR_COMPARISON_TYPES_NOT_IDENTICAL,
	Nabd0004: ERROR_COMPARISON_NONEQUALITY_DIFFERENT_TYPES,
	Nabd0005: DEPRECATED_ERROR_EMPTY_LINES_NOT_ALLOWED,
	Nabd0006: ERROR_PARSING_GENERIC,
	Nabd0007: ERROR_MISTACHING_TYPES,
	Nabd0008: ERROR_BIGGER_THAN_INFINITY,
	Nabd0009: ERROR_TYPE_INFERENCE_FAILED
}

Object.assign(GLOBAL_CONTEXT, ERRORS)