'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalystCircuitError = exports.CatalystConnectorError = exports.CatalystZiaError = exports.CatalystZCQLError = exports.CatalystUserManagementError = exports.CatalystSearchError = exports.CatalystQueueError = exports.CatalystPushNotificationError = exports.CatalystGQLError = exports.CatalystFunctionsError = exports.CatalystFilestoreError = exports.CatalystEmailError = exports.CatalystDatastoreError = exports.CatalystCronError = exports.CatalystCacheError = exports.CatalystAuthError = exports.CatalystAppError = exports.CatalystApiError = exports.PrefixedCatalystError = void 0;
class CatalystError extends Error {
    constructor(errorInfo) {
        super(errorInfo.message);
        this.errorInfo = errorInfo;
    }
    /** @return {string} The error code. */
    get code() {
        return this.errorInfo.code;
    }
    /** @return {string} The error message. */
    get message() {
        return this.errorInfo.message;
    }
    /** @return {any} The value that caused this error. */
    get value() {
        return this.errorInfo.value;
    }
    /** @return {ICatalystError} The object representation of the error. */
    toJSON() {
        return {
            code: this.code,
            message: this.message,
            value: this.value
        };
    }
    /** @return {string} The string representation of the error. */
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
exports.default = CatalystError;
class PrefixedCatalystError extends CatalystError {
    constructor(codePrefix, code, message, value) {
        super({
            code: `${codePrefix}/${code}`,
            message,
            value
        });
        this.codePrefix = codePrefix;
    }
}
exports.PrefixedCatalystError = PrefixedCatalystError;
class CatalystApiError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('api', code, message, value);
    }
}
exports.CatalystApiError = CatalystApiError;
class CatalystAppError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('app', code, message, value);
    }
}
exports.CatalystAppError = CatalystAppError;
class CatalystAuthError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('auth', code, message, value);
    }
}
exports.CatalystAuthError = CatalystAuthError;
class CatalystCacheError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('cache', code, message, value);
    }
}
exports.CatalystCacheError = CatalystCacheError;
class CatalystCronError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('cron', code, message, value);
    }
}
exports.CatalystCronError = CatalystCronError;
class CatalystDatastoreError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('datastore', code, message, value);
    }
}
exports.CatalystDatastoreError = CatalystDatastoreError;
class CatalystEmailError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('email', code, message, value);
    }
}
exports.CatalystEmailError = CatalystEmailError;
class CatalystFilestoreError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('filestore', code, message, value);
    }
}
exports.CatalystFilestoreError = CatalystFilestoreError;
class CatalystFunctionsError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('functions', code, message, value);
    }
}
exports.CatalystFunctionsError = CatalystFunctionsError;
class CatalystGQLError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('gql', code, message, value);
    }
}
exports.CatalystGQLError = CatalystGQLError;
class CatalystPushNotificationError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('push-notification', code, message, value);
    }
}
exports.CatalystPushNotificationError = CatalystPushNotificationError;
class CatalystQueueError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('queue', code, message, value);
    }
}
exports.CatalystQueueError = CatalystQueueError;
class CatalystSearchError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('search', code, message, value);
    }
}
exports.CatalystSearchError = CatalystSearchError;
class CatalystUserManagementError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('user-management', code, message, value);
    }
}
exports.CatalystUserManagementError = CatalystUserManagementError;
class CatalystZCQLError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('zcql', code, message, value);
    }
}
exports.CatalystZCQLError = CatalystZCQLError;
class CatalystZiaError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('zia', code, message, value);
    }
}
exports.CatalystZiaError = CatalystZiaError;
class CatalystConnectorError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('connector', code, message, value);
    }
}
exports.CatalystConnectorError = CatalystConnectorError;
class CatalystCircuitError extends PrefixedCatalystError {
    constructor(code, message, value) {
        super('circuit', code, message, value);
    }
}
exports.CatalystCircuitError = CatalystCircuitError;
