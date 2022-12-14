import { Credential } from './utils/credential';
import { IRequestConfig } from './utils/api-request';
import type { Cache } from './cache/cache';
import type { Cron } from './cron/cron';
import type { Datastore } from './datastore/datastore';
import type { Filestore } from './file/filestore';
import type { Email } from './email/email';
import type { Search } from './search/search';
import type { Functions } from './functions/functions';
import type { UserManagement } from './user-management/user-management';
import type { PushNotification } from './push-notification/push-notification';
import type { Zia } from './zia/zia';
import type { Circuit } from './circuit/circuit';
import type { Connection } from './connector/connection';
import type { ZCQL } from './zcql/zcql';
export interface ICatalystAppConfig {
    projectId: string;
    projectKey: string;
    projectDomain: string;
    environment: string;
    projectSecretKey: string | undefined;
}
declare class CatalystAppInternals {
    credential: Credential;
    constructor(credential: Credential);
    private setOauthHeader;
    private setTicketHeader;
    authenticateRequest(req: IRequestConfig): Promise<void>;
}
export declare class CatalystApp extends CatalystAppInternals {
    private services;
    config: ICatalystAppConfig;
    constructor(options: {
        [x: string]: string | number | Credential;
    });
    cache(): Cache;
    cron(): Cron;
    datastore(): Datastore;
    filestore(): Filestore;
    zcql(): ZCQL;
    email(): Email;
    search(): Search;
    functions(): Functions;
    userManagement(): UserManagement;
    pushNotification(): PushNotification;
    zia(): Zia;
    circuit(): Circuit;
    connection(prop: string | {
        [x: string]: {
            [x: string]: string;
        };
    }): Connection;
    private ensureService;
}
export {};
