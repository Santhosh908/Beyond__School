import { PushNotification } from './push-notification';
import { AuthorizedHttpClient } from '../utils/api-request';
import { ICatalystMobileNotification, ICatalystPushDetails } from '../utils/pojo/common';
export declare class MobileNotification {
    _appId: string;
    requester: AuthorizedHttpClient;
    constructor(notificationInstance: PushNotification, id: string);
    sendNotification(notifyObj: ICatalystPushDetails, recipient: Array<string>): Promise<ICatalystMobileNotification>;
}
