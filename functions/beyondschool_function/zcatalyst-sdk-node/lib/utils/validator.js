'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapValidatorsWithPromise = exports.isValidApp = exports.isValidType = exports.isNonEmptyStringOrNumber = exports.isNonEmptyArray = exports.isNonEmptyObject = exports.isNonNullObject = exports.isNonEmptyString = exports.ObjectHasProperties = exports.isURL = exports.isEmail = exports.isObject = exports.isString = exports.isNumber = exports.isBoolean = exports.isArray = exports.isBuffer = void 0;
const url_1 = require("url");
const error_1 = __importStar(require("./error"));
/**
 * Validates that a value is a byte buffer.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is byte buffer or not.
 */
function isBuffer(value) {
    return value instanceof Buffer || Buffer.isBuffer(value);
}
exports.isBuffer = isBuffer;
/**
 * Validates that a value is an array.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is an array or not.
 */
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
/**
 * Validates that a value is a boolean.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is a boolean or not.
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
exports.isBoolean = isBoolean;
/**
 * Validates that a value is a number.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is a number or not.
 */
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
exports.isNumber = isNumber;
/**
 * Validates that a value is a string.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is a string or not.
 */
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
/**
 * Validates that a value is a nullable object.
 *
 * @param {unknown} value The value to validate.
 * @return {boolean} Whether the value is an object or not.
 */
function isObject(value) {
    return typeof value === 'object' && !isArray(value);
}
exports.isObject = isObject;
/**
 * Validates that a string is a valid email.
 *
 * @param {unknown} email The string to validate.
 * @return {boolean} Whether the string is valid email or not.
 */
function isEmail(email) {
    if (!isString(email)) {
        return false;
    }
    // There must at least one character before the @ symbol and another after.
    const re = /^[^@]+@[^@]+$/;
    return re.test(email);
}
exports.isEmail = isEmail;
/**
 * Validates that a string is a valid web URL.
 *
 * @param {unknown} urlStr The string to validate.
 * @return {boolean} Whether the string is valid web URL or not.
 */
function isURL(urlStr) {
    if (typeof urlStr !== 'string') {
        return false;
    }
    // Lookup illegal characters.
    const re = /[^a-z0-9-._~:/?#[\]@!$&'()*+,;=]/i;
    if (re.test(urlStr)) {
        return false;
    }
    try {
        const schemeTest = /^(http|https):/;
        const uri = new url_1.URL(urlStr);
        const scheme = uri.protocol;
        const slashes = uri.pathname.startsWith('/');
        const hostname = uri.hostname;
        const pathname = uri.pathname;
        if ((scheme !== null && !schemeTest.test(scheme)) || !slashes) {
            return false;
        }
        // Validate hostname: Can contain letters, numbers, underscore and dashes separated by a dot.
        // Each zone must not start with a hyphen or underscore.
        if (hostname !== null && !/^[a-zA-Z0-9]+[w-]*([.]?[a-zA-Z0-9]+[w-]*)*$/.test(hostname)) {
            return false;
        }
        // Allow for pathnames: (/chars+)*/?
        // Where chars can be a combination of: a-z A-Z 0-9 - _ . ~ ! $ & ' ( ) * + , ; = : @ %
        const pathnameRe = /(\/[0-9].*\?|$)/;
        // Validate pathname.
        if (pathname && !pathnameRe.test(pathname)) {
            return false;
        }
        // Allow any query string and hash as long as no invalid character is used.
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isURL = isURL;
/**
 * validates an object. Note : Only one level is supported
 * @param {Record<string, unknown>} obj Object to be validated
 * @param {Array<String>} properties properties to be tested for presence
 * @param {String} [objName] name of obj to be used while throwing an error
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @returns {Boolean} validity of the object
 */
function ObjectHasProperties(obj, properties, objName, throwErr) {
    const undefinedElement = properties.find((prop) => typeof obj[prop] === 'undefined' || obj[prop] === null);
    if (undefinedElement !== undefined) {
        if (throwErr) {
            throw new error_1.default({
                code: 'invalid-argument',
                message: `Value for property ${undefinedElement} cannot be null or undefined in ${objName} object`,
                value: obj
            });
        }
        return false;
    }
    return true;
}
exports.ObjectHasProperties = ObjectHasProperties;
/**
 * Validates that a value is a non-empty string.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-empty string or not.
 */
function isNonEmptyString(value, name, throwErr) {
    if (isString(value) && value !== '') {
        return true;
    }
    if (throwErr) {
        throw new error_1.default({
            code: 'invalid-argument',
            message: `Value provided for ${name} is expected to be a non-empty and non-null string.`,
            value
        });
    }
    return false;
}
exports.isNonEmptyString = isNonEmptyString;
/**
 * Validates that a value is a non-null object.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-null object or not.
 */
function isNonNullObject(value, name, throwErr) {
    if (isObject(value) && value !== null) {
        return true;
    }
    if (throwErr) {
        throw new error_1.default({
            code: 'invalid-argument',
            message: `Value provided for ${name} is expected to be a non-null json object.`,
            value
        });
    }
    return false;
}
exports.isNonNullObject = isNonNullObject;
/**
 * Validates that a value is a non-null object.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-null object or not.
 */
function isNonEmptyObject(value, name, throwErr) {
    if (isNonNullObject(value, name, throwErr) &&
        Object.keys(value).length !== 0) {
        return true;
    }
    if (throwErr) {
        throw new error_1.default({
            code: 'invalid-argument',
            message: `Value provided for ${name} is expected to be a non-empty and non-null json object.`,
            value
        });
    }
    return false;
}
exports.isNonEmptyObject = isNonEmptyObject;
/**
 * Validates that a value is a non-null Array.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-null array or not.
 */
function isNonEmptyArray(value, name, throwErr) {
    if (isArray(value) && value.length !== 0) {
        return true;
    }
    if (throwErr) {
        throw new error_1.default({
            code: 'invalid-argument',
            message: `Value provided for ${name} is expected to be a non-empty Array.`,
            value
        });
    }
    return false;
}
exports.isNonEmptyArray = isNonEmptyArray;
/**
 * Validates that a value is a non-null string or number.
 *
 * @param {unknown} value The value to validate.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if error needs to be thrown.
 * @return {boolean} Whether the value is a non-null object or not.
 */
function isNonEmptyStringOrNumber(value, name, throwErr) {
    if (isNonEmptyString(value) || isNumber(value)) {
        return true;
    }
    if (throwErr) {
        throw new error_1.default({
            code: 'invalid-argument',
            message: `Value provided for ${name} is expected to be a non-null and non-empty String/Number.`,
            value
        });
    }
    return false;
}
exports.isNonEmptyStringOrNumber = isNonEmptyStringOrNumber;
/**
 * Validates that a value is of particular type.
 *
 * @param {unknown} value The value to validate.
 * @param {string} type The type to be validated with.
 * @param {String} [name] The name of the value to use in error.
 * @param {Boolean} [throwErr] Boolean to determine if CatalystAppError needs to be thrown.
 * @return {Boolean} Whether the value is of proper type.
 */
function isValidType(value, type, name, throwErr) {
    if (typeof value === type) {
        return true;
    }
    if (throwErr) {
        throw new error_1.default({
            code: 'invalid-argument-type',
            message: `Value provided for ${name} must be of type ${type}`,
            value
        });
    }
    return false;
}
exports.isValidType = isValidType;
/**
 * Validates that a value is a proper app instance.
 *
 * @param {unknown} app The value to validate.
 * @param {Boolean} throwErr Boolean to determine if CatalystAppError needs to be thrown.
 * @return {Boolean} Whether the value is a proper app instance.
 */
function isValidApp(app, throwErr) {
    // todo: change this to app instance once that is converted to TS
    if (!isNonNullObject(app) ||
        !('config' in app) ||
        !('credential' in app) ||
        !isNonEmptyStringOrNumber(app.config.projectId)) {
        if (throwErr) {
            throw new error_1.CatalystAppError('INVALID_APP_INSTANCE', 'Project instance is not valid', app);
        }
        return false;
    }
    return true;
}
exports.isValidApp = isValidApp;
/**
 * Wraps the validators in a promise so that the promise chain wont fail.
 *
 * @param {function} targetFunction The function that will be executed.
 * @param {CatalystAppError} errorInstance Error that should be thrown.
 * @return {Promise} if the target functions doesnt throw error this will resolve else reject.
 */
function wrapValidatorsWithPromise(targetFunction, errorInstance) {
    return new Promise((resolve, reject) => {
        try {
            targetFunction();
        }
        catch (e) {
            // error is assumed to be a ValidationError Instance
            if (e instanceof error_1.default) {
                reject(new errorInstance(e.code, e.message));
            }
            reject(e);
        }
        resolve();
    });
}
exports.wrapValidatorsWithPromise = wrapValidatorsWithPromise;
