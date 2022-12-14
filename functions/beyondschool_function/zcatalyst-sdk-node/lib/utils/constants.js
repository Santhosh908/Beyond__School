'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
exports.default = Object.freeze({
    ACCOUNTS_ORIGIN: (0, helper_1.envOverride)('X_ZOHO_CATALYST_ACCOUNTS_URL', 'https://accounts.zoho.com'),
    CATALYST_ORIGIN: (0, helper_1.envOverride)('X_ZOHO_CATALYST_CONSOLE_URL', 'https://api.catalyst.zoho.com'),
    IS_LOCAL: (0, helper_1.envOverride)('X_ZOHO_CATALYST_IS_LOCAL', 'false'),
    REQ_RETRY_THRESHOLD: (0, helper_1.envOverride)('X_ZOHO_CATALYST_REQ_RETRY', 2),
    APM_INSIGHT: {
        tracker_name: 'CATALYST_COMPONENT_CALL'
    },
    COMPONENT: {
        cache: 'Cache',
        circuit: 'Circuit',
        cron: 'Cron',
        datastore: 'DataStore',
        email: 'Mail',
        filestore: 'FileStore',
        functions: 'Function',
        notification: 'PushNotification',
        search: 'Search',
        user_management: 'UserManagement',
        zcql: 'ZCQL',
        zia: 'Zia'
    },
    PRODUCT_NAME: 'baas',
    API_VERSION: 'v1',
    CATALYST_AUTH_ENV_KEY: 'CATALYST_AUTH',
    CREDENTIAL_SUFFIX: 'catalyst/application_auth.json',
    AUTH_HEADER: 'Authorization',
    COOKIE_HEADER: 'Cookie',
    PROJECT_KEY_NAME: 'PROJECT_ID',
    CSRF_TOKEN_NAME: 'ZD_CSRF_TOKEN',
    DEFAULT_APP_NAME: '[DEFAULT]',
    CATALYST_CONFIG_ENV_KEY: 'CATALYST_CONFIG',
    CREDENTIAL_TYPE: {
        token: 'token',
        ticket: 'ticket'
    },
    CREDENTIAL_HEADER: {
        admin_cred_type: 'x-zc-admin-cred-type',
        user_cred_type: 'x-zc-user-cred-type',
        admin_token: 'x-zc-admin-cred-token',
        user_token: 'x-zc-user-cred-token',
        cookie: 'x-zc-cookie',
        zcsrf: 'X-ZCSRF-TOKEN',
        user: 'x-zc-user-type'
    },
    CREDENTIAL_USER: {
        admin: 'admin',
        user: 'user'
    },
    PROJECT_HEADER: {
        id: 'x-zc-projectid',
        domain: 'x-zc-project-domain',
        key: 'x-zc-project-key',
        environment: 'x-zc-environment',
        projectSecretKey: 'x-zc-project-secret-key'
    },
    ENVIRONMENT_KEY_NAME: 'X-Catalyst-Environment',
    USER_KEY_NAME: 'X-CATALYST-USER',
    INIT_TYPE: {
        advancedio: 'advancedio',
        basicio: 'basicio'
    },
    CLIENT_ID: 'client_id',
    CLIENT_SECRET: 'client_secret',
    EXPIRES_IN: 'expires_in',
    AUTH_URL: 'auth_url',
    REFRESH_URL: 'refresh_url',
    REDIRECT_URL: 'redirect_url',
    REFRESH_TOKEN: 'refresh_token',
    ACCESS_TOKEN: 'access_token',
    CONNECTOR_NAME: 'connector_name',
    GRANT_TYPE: 'grant_type',
    CODE: 'code',
    REQ_METHOD: {
        post: 'POST',
        get: 'GET',
        put: 'PUT',
        delete: 'DELETE',
        patch: 'PATCH'
    },
    DEFAULT_ENV: 'Development',
    USER_AGENT: {
        KEY: 'User-Agent',
        PREFIX: 'zcatalyst-node/'
    },
    ACCEPT_HEADER: {
        KEY: 'Accept',
        VALUE: 'application/vnd.catalyst.v2+json'
    },
    PROTOCOL: {
        HTTP: 'http:',
        HTTPS: 'https:'
    }
});
