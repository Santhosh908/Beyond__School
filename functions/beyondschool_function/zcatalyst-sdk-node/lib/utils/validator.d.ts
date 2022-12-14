import { CatalystAppError } from './error';
/**
 * Validates that a value is a byte buffer.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is byte buffer or not.
 */
export declare function isBuffer(value: unknown): boolean;
/**
 * Validates that a value is an array.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is an array or not.
 */
export declare function isArray(value: unknown): boolean;
/**
 * Validates that a value is a boolean.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is a boolean or not.
 */
export declare function isBoolean(value: unknown): boolean;
/**
 * Validates that a value is a number.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is a number or not.
 */
export declare function isNumber(value: unknown): boolean;
/**
 * Validates that a value is a string.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is a string or not.
 */
export declare function isString(value: unknown): boolean;
/**
 * Validates that a value is a nullable object.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is an object or not.
 */
export declare function isObject(value: unknown): boolean;
/**
 * Validates that a string is a valid email.
 *
 * @param {unknown} email The string to validate.
 * @return {boolean} Whether the string is valid email or not.
 */
export declare function isEmail(email: unknown): boolean;
/**
 * Validates that a string is a valid web URL.
 *
 * @param {unknown} urlStr The string to validate.
 * @return {boolean} Whether the string is valid web URL or not.
 */
export declare function isURL(urlStr: unknown): boolean;
/**
 * validates an object. Note : Only one level is supported
 * @param {Record<string, unknown>} obj Object to be validated
 * @param {Array<String>} properties properties to be tested for presence
 * @param {String} [objName] name of obj to be used while throwing an error
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @returns {Boolean} validity of the object
 */
export declare function ObjectHasProperties(obj: Record<string, unknown>, properties: Array<string>, objName?: string, throwErr?: boolean): boolean;
/**
 * Validates that a value is a non-empty string.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-empty string or not.
 */
export declare function isNonEmptyString(value: unknown, name?: string, throwErr?: boolean): boolean;
/**
 * Validates that a value is a non-null object.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-null object or not.
 */
export declare function isNonNullObject(value: unknown, name?: string, throwErr?: boolean): boolean;
/**
 * Validates that a value is a non-null object.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-null object or not.
 */
export declare function isNonEmptyObject(value: unknown, name?: string, throwErr?: boolean): boolean;
/**
 * Validates that a value is a non-null Array.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-null array or not.
 */
export declare function isNonEmptyArray(value: unknown, name?: string, throwErr?: boolean): boolean;
/**
 * Validates that a value is a non-null string or number.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-null object or not.
 */
export declare function isNonEmptyStringOrNumber(value: unknown, name?: string, throwErr?: boolean): boolean;
/**
 * Validates that a value is of particular type.
 *
 * @param {unknown} value The value to validate.
 * @param {string} type The type to be validated with.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if CatalystAppError needs to be thrown.
 * @return {Boolean} Whether the value is of proper type.
 */
export declare function isValidType(value: unknown, type: string, name?: string, throwErr?: boolean): boolean;
/**
 * Validates that a value is a proper app instance.
 *
 * @param {unknown} app The value to validate.
 * @param {Boolean} throwErr Boolean to determine if CatalystAppError needs to be thrown.
 * @return {Boolean} Whether the value is a proper app instance.
 */
export declare function isValidApp(app: unknown, throwErr: boolean): boolean;
/**
 * Wraps the validators in a promise so that the promise chain wont fail.
 *
 * @param {function} targetFunction The function that will be executed.
 * @param {CatalystAppError} errorInstance Error that should be thrown.
 * @return {Promise} if the target functions doesnt throw error this will resolve else reject.
 */
export declare function wrapValidatorsWithPromise(targetFunction: () => void, errorInstance: typeof CatalystAppError): Promise<void>;
