/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedHttpClient = exports.HttpClient = void 0;
const error_1 = require("./error");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
const util_1 = require("util");
const querystring_1 = require("querystring");
const apminsight_1 = __importDefault(require("../../lib/apminsight"));
const constants_1 = __importDefault(require("./constants"));
const request_agent_1 = __importDefault(require("./request-agent"));
const package_json_1 = require("../../package.json");
const helper_1 = require("./helper");
const validator_1 = require("./validator");
const { PROJECT_KEY_NAME, IS_LOCAL, ENVIRONMENT_KEY_NAME, USER_KEY_NAME, CREDENTIAL_USER, CATALYST_ORIGIN, PRODUCT_NAME, API_VERSION, USER_AGENT, APM_INSIGHT, ACCEPT_HEADER, REQ_RETRY_THRESHOLD, PROJECT_HEADER } = constants_1.default;
class DefaultHttpResponse {
    constructor(resp) {
        this.statusCode = resp.statusCode;
        this.headers = resp.headers;
        this.config = resp.config;
        this.resp = resp;
    }
    get data() {
        switch (this.config.expecting) {
            case "string" /* STRING */:
                if (this.resp.data === undefined) {
                    throw new error_1.CatalystApiError('unparsable_response', `Error while processing response data. Raw server ` +
                        `response: "${this.resp.data}". Status code: "${this.statusCode}".`);
                }
                return this.resp.data;
            case "buffer" /* BUFFER */:
                if (this.resp.buffer === undefined) {
                    throw new error_1.CatalystApiError('unparsable_response', `Error while processing response buffer. Raw server ` +
                        `response: "${this.resp.data}". Status code: "${this.statusCode}".`);
                }
                return this.resp.buffer;
            case "raw" /* RAW */:
                return this.resp.stream;
            default:
                try {
                    return JSON.parse(this.resp.data);
                }
                catch (e) {
                    throw new error_1.CatalystApiError('unparsable_response', `Error while parsing response data: "${(0, util_1.inspect)(e)}". Raw server ` +
                        `response: "${this.resp.data}". Status code: "${this.statusCode}".`);
                }
        }
    }
}
function rejectWithContext(reject, statusCode, data) {
    try {
        // considering data as catalyst error and trying to parse
        const catalystError = JSON.parse(data);
        reject('Request failed with status ' +
            statusCode +
            ' and code : ' +
            catalystError.data.error_code +
            ' , message : ' +
            catalystError.data.message);
        return;
    }
    catch (err) {
        // unknown error
        reject('Request failed with status ' + statusCode + ' and response data : ' + (0, util_1.inspect)(data));
    }
}
function streamToBuffer(stream) {
    return __awaiter(this, void 0, void 0, function* () {
        const chunks = [];
        return new Promise((resolve, reject) => {
            stream.destroyed && reject('Invalid response stream');
            stream.on('data', (chunk) => {
                chunks.push(chunk);
            });
            stream.on('error', reject);
            stream.on('end', () => resolve(Buffer.concat(chunks)));
        });
    });
}
function _finalizeRequest(resolve, reject, response) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (response.statusCode === undefined) {
            reject(new error_1.CatalystApiError('unknown_statusCode', 'unable to obtain status code from response', response));
            return;
        }
        if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(response);
            return;
        }
        if (((_a = response.stream) === null || _a === void 0 ? void 0 : _a.pipe) === undefined) {
            // response is of IAPIResponse type
            rejectWithContext(reject, response.statusCode, response.data);
            return;
        }
        try {
            rejectWithContext(reject, response.statusCode, response.data || 'Unknown response');
        }
        catch (e) {
            const errMsg = e instanceof Error ? e.message : (0, util_1.inspect)(e);
            rejectWithContext(reject, response.statusCode, errMsg);
        }
    });
}
function _appendQueryData(url, data) {
    if (data && Object.keys(data).length > 0) {
        url += url.includes('?') ? '&' : '?';
        url += (0, querystring_1.stringify)(data);
    }
    return url;
}
function _request(transport, options, config, data, retryCount = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        // Make a clone of data
        const clonedData = data === undefined
            ? undefined
            : config.type !== "file" /* FILE */
                ? // data is always `string` if it is not FILE
                    data
                : // data is a readable stream since it is a file
                    data.createClone();
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const retryRequest = (err) => __awaiter(this, void 0, void 0, function* () {
                // log the error and mention we are retying
                // eslint-disable-next-line no-console
                console.error('Request Error: ', err.stack || err.message);
                // eslint-disable-next-line no-console
                console.error('Retrying request.');
                if (retryCount++ === REQ_RETRY_THRESHOLD) {
                    // reject here along with retry error
                    reject(err);
                    return;
                }
                try {
                    options.agent = new request_agent_1.default((0, helper_1.isHttps)(config.url), options.hostname, true).agent;
                    const resp = yield _request(transport, options, config, clonedData, retryCount);
                    resolve(resp);
                }
                catch (e) {
                    reject(e);
                }
            });
            const req = transport.request(options, (res) => __awaiter(this, void 0, void 0, function* () {
                if (req.aborted) {
                    return;
                }
                // Uncompress the response body transparently if required.
                const response = {
                    headers: res.headers,
                    request: req,
                    stream: res,
                    statusCode: res.statusCode,
                    config
                };
                if (config.expecting === "raw" /* RAW */) {
                    return _finalizeRequest(resolve, reject, response);
                }
                try {
                    const responseBuffer = yield streamToBuffer(res);
                    response.data = responseBuffer.toString();
                    response.buffer = responseBuffer;
                }
                catch (err) {
                    if (req.aborted) {
                        return;
                    }
                    reject(err);
                }
                _finalizeRequest(resolve, reject, response);
            }));
            // Handle errors
            req.on('error', (err) => {
                if (req.aborted) {
                    return;
                }
                retryRequest(err);
            });
            if (data === undefined) {
                return req.end();
            }
            // Append data and send the request
            if (config.type !== "file" /* FILE */) {
                req.write(data);
                return req.end();
            }
            data.pipe(req).on('finish', req.end);
        }));
    });
}
function sendRequest(config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        let headers = Object.assign({
            [USER_AGENT.KEY]: USER_AGENT.PREFIX + package_json_1.version
        }, config.headers);
        if (config.data !== undefined) {
            switch (config.type) {
                case "json" /* JSON */:
                    data = JSON.stringify(config.data);
                    headers['Content-Type'] = 'application/json';
                    break;
                case "file" /* FILE */:
                    data = config.data;
                    headers = data.getHeaders(headers);
                    break;
                default:
                    data = (0, querystring_1.stringify)(config.data);
                    headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    headers['Content-Length'] = Buffer.byteLength(data) + '';
            }
        }
        const origin = config.origin || CATALYST_ORIGIN;
        config.url = config.url || new url_1.URL(config.path || '', origin).href;
        if (config.qs !== undefined) {
            config.url = _appendQueryData(config.url, config.qs);
        }
        const parsedUrl = new url_1.URL(config.url);
        if (parsedUrl.hostname === null) {
            throw new error_1.CatalystApiError('unparsable_config', 'Hostname cannot be null', config.path);
        }
        const isHttpsProtocol = (0, helper_1.isHttps)(parsedUrl);
        const requestAgent = new request_agent_1.default(isHttpsProtocol, parsedUrl.hostname, false);
        (_a = parsedUrl.searchParams) === null || _a === void 0 ? void 0 : _a.sort();
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + parsedUrl.search,
            method: config.method,
            headers,
            agent: requestAgent.agent
        };
        const transport = isHttpsProtocol ? https_1.default : http_1.default;
        return _request(transport, options, config, data);
    });
}
class HttpClient {
    /**
     * @param {CatalystApp} app The app used to fetch access tokens to sign API requests.
     * @constructor
     */
    constructor(app) {
        this.app = app;
        this.user = CREDENTIAL_USER.admin;
    }
    send(req, apmTrackerName) {
        return __awaiter(this, void 0, void 0, function* () {
            req.headers = Object.assign({}, req.headers);
            if (this.app !== undefined) {
                req.headers[PROJECT_KEY_NAME] = this.app.config.projectKey;
                req.headers[ENVIRONMENT_KEY_NAME] = this.app.config.environment;
                if ((0, validator_1.isNonEmptyString)(this.app.config.projectSecretKey)) {
                    req.headers[PROJECT_HEADER.projectSecretKey] = this.app.config
                        .projectSecretKey;
                }
                // assign user headers
                req.headers[USER_KEY_NAME] = this.app.credential.getCurrentUserType();
                this.user = this.app.credential.getCurrentUser();
                // spcl handling for CLI
                if (IS_LOCAL === 'true') {
                    switch (this.user) {
                        case CREDENTIAL_USER.admin:
                            req.origin =
                                'https://' +
                                    CATALYST_ORIGIN.replace('https://', '').replace('http://', '');
                            break;
                        case CREDENTIAL_USER.user:
                            req.origin = 'https://' + this.app.config.projectDomain;
                            break;
                    }
                }
                // format the path if needed (not undefined and true)
                if (req.catalyst) {
                    req.path =
                        `/${PRODUCT_NAME}/${API_VERSION}/project/${this.app.config.projectId}` +
                            req.path;
                    req.headers[ACCEPT_HEADER.KEY] = ACCEPT_HEADER.VALUE;
                }
            }
            try {
                let resp;
                if (req.track && apmTrackerName) {
                    resp = yield apminsight_1.default.startTracker(APM_INSIGHT.tracker_name, apmTrackerName, () => sendRequest(req));
                }
                else {
                    resp = yield sendRequest(req);
                }
                return new DefaultHttpResponse(resp);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new error_1.CatalystApiError('request_failure', err.message, err);
                }
                throw err;
            }
        });
    }
}
exports.HttpClient = HttpClient;
class AuthorizedHttpClient extends HttpClient {
    /**
     * @param {any} app The app used to fetch access tokens to sign API requests.
     * @constructor
     */
    constructor(app, component) {
        super(app);
        if (component) {
            this.componentName = component.getComponentName();
        }
    }
    send(request) {
        const _super = Object.create(null, {
            send: { get: () => super.send }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const requestCopy = Object.assign({ user: CREDENTIAL_USER.user }, request);
            requestCopy.headers = Object.assign({}, request.headers);
            (_a = this.app) === null || _a === void 0 ? void 0 : _a.credential.switchUser(requestCopy.user);
            yield ((_b = this.app) === null || _b === void 0 ? void 0 : _b.authenticateRequest(requestCopy));
            return _super.send.call(this, requestCopy, this.componentName);
        });
    }
}
exports.AuthorizedHttpClient = AuthorizedHttpClient;
