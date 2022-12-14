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
exports.WebNotification = void 0;
const validator_1 = require("../utils/validator");
const error_1 = require("../utils/error");
const constants_1 = __importDefault(require("../utils/constants"));
const { REQ_METHOD, CREDENTIAL_USER } = constants_1.default;
class WebNotification {
    constructor(notificationInstance) {
        this.requester = notificationInstance.requester;
    }
    sendNotification(message, recipients) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, validator_1.wrapValidatorsWithPromise)(() => {
                (0, validator_1.isNonEmptyString)(message, 'message', true);
                (0, validator_1.isNonEmptyArray)(recipients, 'recipients', true);
            }, error_1.CatalystPushNotificationError);
            const request = {
                method: REQ_METHOD.post,
                path: `/project-user/notify`,
                data: {
                    message,
                    recipients
                },
                type: "json" /* JSON */,
                catalyst: true,
                track: true,
                user: CREDENTIAL_USER.admin
            };
            const resp = yield this.requester.send(request);
            return resp.data.data;
        });
    }
}
exports.WebNotification = WebNotification;
