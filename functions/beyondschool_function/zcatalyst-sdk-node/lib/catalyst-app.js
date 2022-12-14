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
exports.CatalystApp = void 0;
const validator_1 = require("./utils/validator");
const error_1 = __importStar(require("./utils/error"));
const credential_1 = require("./utils/credential");
const constants_1 = __importDefault(require("./utils/constants"));
const helper_1 = require("./utils/helper");
const { AUTH_HEADER, COOKIE_HEADER, CREDENTIAL_HEADER, DEFAULT_ENV } = constants_1.default;
const requireModule = require;
class CatalystAppInternals {
    constructor(credential) {
        this.credential = (0, helper_1.copyInstance)(credential);
    }
    setOauthHeader(headers, token) {
        headers[AUTH_HEADER] = 'Zoho-oauthtoken ' + token;
    }
    setTicketHeader(headers, token) {
        headers[AUTH_HEADER] = 'Zoho-ticket ' + token;
    }
    authenticateRequest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // create the request headers if not already present
            req.headers = Object.assign({}, req.headers);
            // assign credentials headers
            if (this.credential instanceof credential_1.AccessTokenCredential ||
                this.credential instanceof credential_1.RefreshTokenCredential) {
                const token = yield this.credential.getToken();
                this.setOauthHeader(req.headers, token.access_token);
                return;
            }
            if (this.credential instanceof credential_1.TicketCredential) {
                const token = yield this.credential.getToken();
                this.setTicketHeader(req.headers, token.ticket);
                return;
            }
            if (this.credential instanceof credential_1.CatalystCredential) {
                const token = yield this.credential.getToken();
                if ((0, validator_1.isNonEmptyString)(token.access_token)) {
                    this.setOauthHeader(req.headers, token.access_token);
                }
                else if ((0, validator_1.isNonEmptyString)(token.ticket)) {
                    this.setTicketHeader(req.headers, token.ticket);
                }
                else if ((0, validator_1.isNonEmptyString)(token.cookie)) {
                    req.headers[COOKIE_HEADER] = token.cookie;
                    req.headers[CREDENTIAL_HEADER.zcsrf] = token.zcrf_header;
                }
            }
        });
    }
}
class CatalystApp extends CatalystAppInternals {
    constructor(options) {
        try {
            (0, validator_1.isNonNullObject)(options, 'options', true);
            (0, validator_1.ObjectHasProperties)(options, ['credential'], 'options', true);
            (0, validator_1.isNonNullObject)(options.credential, 'options.credential', true);
            (0, validator_1.isValidType)(options.credential.getToken, 'function', 'options.credential', true);
            (0, validator_1.isNonEmptyStringOrNumber)(options.project_id || options.projectId, 'projectId', true);
        }
        catch (e) {
            if (e instanceof error_1.default) {
                throw new error_1.CatalystAppError(e.code, e.message, e);
            }
            throw e;
        }
        super(options.credential);
        this.config = {
            projectId: (options.project_id || options.projectId) + '',
            projectKey: (options.project_key || options.projectKey),
            projectDomain: (options.project_domain || options.projectDomain),
            environment: options.environment || DEFAULT_ENV,
            projectSecretKey: (options.project_secret_key || options.projectSecretKey)
        };
        this.services = {};
    }
    cache() {
        return this.ensureService('cache', () => {
            const cacheService = requireModule('./cache/cache').Cache;
            return new cacheService(this);
        });
    }
    // queue() {
    // 	return this.ensureService('queue', () => {
    // 		const queueService = require('./queue/queue').Queue;
    // 		return new queueService(this);
    // 	});
    // }
    cron() {
        return this.ensureService('cron', () => {
            const cronService = requireModule('./cron/cron').Cron;
            return new cronService(this);
        });
    }
    datastore() {
        return this.ensureService('datastore', () => {
            const dataService = requireModule('./datastore/datastore')
                .Datastore;
            return new dataService(this);
        });
    }
    filestore() {
        return this.ensureService('file', () => {
            const fileService = requireModule('./file/filestore').Filestore;
            return new fileService(this);
        });
    }
    zcql() {
        return this.ensureService('zcql', () => {
            const zcqlService = requireModule('./zcql/zcql').ZCQL;
            return new zcqlService(this);
        });
    }
    email() {
        return this.ensureService('mail', () => {
            const mailService = requireModule('./email/email').Email;
            return new mailService(this);
        });
    }
    search() {
        return this.ensureService('search', () => {
            const searchService = requireModule('./search/search').Search;
            return new searchService(this);
        });
    }
    // gql(): unknown {
    // 	return this.ensureService('gql', () => {
    //
    // 		const gqlService = requireModule('./gql/gql').GQL;
    // 		return new gqlService(this);
    // 	});
    // }
    functions() {
        return this.ensureService('functions', () => {
            const funcService = requireModule('./functions/functions')
                .Functions;
            return new funcService(this);
        });
    }
    userManagement() {
        return this.ensureService('userManagement', () => {
            const authService = requireModule('./user-management/user-management')
                .UserManagement;
            return new authService(this);
        });
    }
    pushNotification() {
        return this.ensureService('pushNotification', () => {
            const pushService = requireModule('./push-notification/push-notification')
                .PushNotification;
            return new pushService(this);
        });
    }
    zia() {
        return this.ensureService('zia', () => {
            const ziaService = requireModule('./zia/zia').Zia;
            return new ziaService(this);
        });
    }
    circuit() {
        return this.ensureService('circuit', () => {
            const circuitService = requireModule('./circuit/circuit').Circuit;
            return new circuitService(this);
        });
    }
    connection(prop) {
        return this.ensureService('connection', () => {
            const connectorService = requireModule('./connector/connection')
                .Connection;
            return new connectorService(this, prop);
        }, true);
    }
    ensureService(serviceName, initializer, override = false) {
        let service;
        if (serviceName in this.services && !override) {
            service = this.services[serviceName];
        }
        else {
            service = initializer();
            this.services[serviceName] = service;
        }
        return service;
    }
}
exports.CatalystApp = CatalystApp;
