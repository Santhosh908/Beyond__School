/// <reference types="node" />
import fs from 'fs';
export interface Component {
    getComponentName(): string;
}
export interface ParsableComponent<T> extends Component {
    toString(): string;
    toJSON(): T;
}
export interface ICatalystJSON {
    [x: string]: any;
}
export interface ICatalystSysUser {
    userId: string;
    email_id: string;
    first_name: string;
    last_name: string;
    zuid?: string;
    is_confirmed?: boolean;
}
export interface ICatalystProject {
    id: string;
    project_name: string;
}
export interface ICatalystGResponse {
    created_time?: string;
    created_by?: ICatalystSysUser;
    modified_time?: string;
    modified_by?: ICatalystSysUser;
    project_details?: ICatalystProject;
}
export interface ICatalystSegment {
    id: string;
    segment_name: string;
}
export interface ICatalystCache {
    cache_name: string;
    cache_value: string;
    expires_in: string;
    expiry_in_hours: string;
    segment_details: ICatalystSegment;
}
export interface ICatalystCronUrl {
    url: string;
    headers?: {
        [x: string]: string;
    };
    params?: {
        [x: string]: string;
    };
    request_method: string;
    request_body?: string;
}
export interface ICatalystCronJob {
    time_of_execution?: string | number;
    repetition_type?: string;
    hour?: number;
    minute?: number;
    second?: number;
    days?: Array<number>;
    weeks_of_month?: Array<number>;
    week_day?: Array<number>;
    months?: Array<number>;
    timezone?: string;
}
export interface ICatalystCron {
    id: string | number;
    cron_name: string;
    description?: string;
    cron_type: string;
    status: boolean;
    cron_url_details: ICatalystCronUrl;
    job_detail: ICatalystCronJob;
    success_count: number;
    failure_count: number;
}
export interface ICatalystMail {
    from_email: string;
    to_email: string | Array<string>;
    subject: string;
    content?: string;
    cc?: Array<string>;
    bcc?: Array<string>;
    reply_to?: Array<string>;
    html_mode?: boolean;
    display_name?: string;
    attachments?: Array<fs.ReadStream>;
}
export interface ICatalystPushDetails {
    message: string;
    additional_info?: {
        [x: string]: any;
    };
    badge_count?: number;
    reference_id?: string;
    expiry_time?: number;
}
export interface ICatalystMobileNotification {
    recipients: Array<string>;
    push_details: ICatalystPushDetails;
}
export interface ICatalystSearch extends ICatalystJSON {
    search: string;
    search_table_columns: {
        [tableName: string]: Array<string>;
    };
    select_table_columns?: {
        [tableName: string]: Array<string>;
    };
    order_by?: {
        [x: string]: any;
    };
    start?: number;
    end?: number;
}
export interface ICatalystUser {
    zuid: string;
    zaaid: string;
    status: string;
    user_id: string;
    is_confirmed: boolean;
    email_id: string;
    first_name: string;
    last_name: string;
    created_time: string;
    modified_time: string;
    invited_time: string;
    role_details: {
        role_id: string;
        role_name: string;
    };
}
export interface ICatalystSignupConfig extends ICatalystJSON {
    zaid?: string;
    platform_type: string;
    redirect_url?: string;
}
export interface ICatalystSignupUserConfig extends ICatalystJSON {
    first_name?: string;
    last_name: string;
    email_id: string;
    zaaid: string;
}
export interface ICatalystFolder {
    id: string;
    folder_name?: string;
}
export interface ICatalystFile {
    id: string;
    file_location?: string;
    file_name: string;
    file_size: number;
    folder_details: string;
}
export interface ICatalystColumn {
    table_id: string;
    column_sequence: string;
    column_id: string;
    column_name: string;
    category: number;
    data_type: string;
    max_length: string;
    is_mandatory: boolean;
    default_value?: any;
    decimal_digits?: string;
    is_unique: boolean;
    search_index_enabled: boolean;
}
export interface ICatalystRow {
    CREATORID: string;
    CREATEDTIME: string;
    MODIFIEDTIME: string;
    ROWID: string;
    [columnName: string]: any;
}
export interface ICatalystTable {
    table_id?: string;
    table_name?: string;
    table_scope?: string;
    project_id?: ICatalystProject;
    modified_time?: string;
    modified_by?: ICatalystSysUser;
}
