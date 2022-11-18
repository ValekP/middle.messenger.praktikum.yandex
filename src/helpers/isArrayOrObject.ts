import isObject from "./isObject"
import isArray from "./isArray"

export default function isArrayOrObject(value: unknown): value is ([] | Indexed) {
    return isObject(value) || isArray(value)
}
