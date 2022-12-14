export interface ICatalystError {
    code: string;
    message: string;
    value?: unknown;
}
export default class CatalystError extends Error {
    errorInfo: ICatalystError;
    constructor(errorInfo: ICatalystError);
    /** @return {string} The error code. */
    get code(): string;
    /** @return {string} The error message. */
    get message(): string;
    /** @return {any} The value that caused this error. */
    get value(): unknown;
    /** @return {ICatalystError} The object representation of the error. */
    toJSON(): ICatalystError;
    /** @return {string} The string representation of the error. */
    toString(): string;
}
export declare class PrefixedCatalystError extends CatalystError {
    codePrefix: string;
    constructor(codePrefix: string, code: string, message: string, value?: unknown);
}
export declare class CatalystApiError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystAppError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystAuthError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystCacheError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystCronError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystDatastoreError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystEmailError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystFilestoreError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystFunctionsError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystGQLError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystPushNotificationError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystQueueError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystSearchError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystUserManagementError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystZCQLError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystZiaError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystConnectorError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
export declare class CatalystCircuitError extends PrefixedCatalystError {
    constructor(code: string, message: string, value?: unknown);
}
