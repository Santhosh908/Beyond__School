'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const constants_1 = __importDefault(require("../utils/constants"));
const error_1 = require("../utils/error");
const validator_1 = require("../utils/validator");
const { CREDENTIAL_USER, REQ_METHOD, COMPONENT } = constants_1.default;
class Table {
    constructor(datastoreInstance, tableDetails) {
        this._tableDetails = tableDetails;
        this.identifier = (tableDetails.table_id || tableDetails.table_name) + '';
        this.requester = datastoreInstance.requester;
    }
    getComponentName() {
        return COMPONENT.datastore;
    }
    getColumnDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyStringOrNumber)(id, 'column_id', true);
            }, error_1.CatalystDatastoreError);
            const request = {
                method: REQ_METHOD.get,
                path: `/table/${this.identifier}/column/${id}`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    getAllColumns() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                method: REQ_METHOD.get,
                path: `/table/${this.identifier}/column`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    insertRow(row) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyObject)(row, 'row', true);
            }, error_1.CatalystDatastoreError);
            const resp = yield this.insertRows([row]);
            return resp[0];
        });
    }
    insertRows(rowArr) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyArray)(rowArr, 'rows', true);
            }, error_1.CatalystDatastoreError);
            const request = {
                method: REQ_METHOD.post,
                path: `/table/${this.identifier}/row`,
                data: rowArr,
                type: "json" /* JSON */,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    /**
     * @deprecated This method doesn't support max row limit and defaults to 200.
     * This method will be removed in upcoming versions.
     *
     * Use {@link getPagedRows} or {@link getIterableRows} instead
     */
    getAllRows() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                method: REQ_METHOD.get,
                path: `/table/${this.identifier}/row`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    getPagedRows({ nextToken, maxRows } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                method: REQ_METHOD.get,
                path: `/table/${this.identifier}/row`,
                qs: {
                    next_token: nextToken,
                    max_rows: maxRows
                },
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data;
        });
    }
    getIterableRows() {
        return __asyncGenerator(this, arguments, function* getIterableRows_1() {
            let nextToken = undefined;
            do {
                const rowsOutput = yield __await(this.getPagedRows({ nextToken }));
                for (const row of rowsOutput.data) {
                    yield yield __await(row);
                }
                nextToken = rowsOutput.next_token;
            } while (nextToken);
        });
    }
    getRow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyStringOrNumber)(id, 'row_id', true);
            }, error_1.CatalystDatastoreError);
            const request = {
                method: REQ_METHOD.get,
                path: `/table/${this.identifier}/row/${id}`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    deleteRow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyStringOrNumber)(id, 'row_id', true);
            }, error_1.CatalystDatastoreError);
            const request = {
                method: REQ_METHOD.delete,
                path: `/table/${this.identifier}/row/${id}`,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            const json = resp.data;
            return json.data ? true : false;
        });
    }
    deleteRows(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyArray)(ids, 'row_ids', true);
            }, error_1.CatalystDatastoreError);
            const query = {
                ids: ids.join(',')
            };
            const request = {
                method: REQ_METHOD.delete,
                path: `/table/${this.identifier}/row`,
                qs: query,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            const json = resp.data;
            return json.data ? true : false;
        });
    }
    updateRows(rows) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyArray)(rows, 'row', true);
            }, error_1.CatalystDatastoreError);
            const request = {
                method: REQ_METHOD.patch,
                path: `/table/${this.identifier}/row`,
                data: rows,
                type: "json" /* JSON */,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.user
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
    updateRow(row) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyObject)(row, 'row', true);
            }, error_1.CatalystDatastoreError);
            const resp = yield this.updateRows([row]);
            return resp[0];
        });
    }
    toString() {
        return JSON.stringify(this._tableDetails);
    }
    toJSON() {
        return this._tableDetails;
    }
}
exports.Table = Table;
