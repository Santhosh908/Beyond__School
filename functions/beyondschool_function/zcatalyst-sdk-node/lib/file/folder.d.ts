/// <reference types="node" />
import http from 'http';
import { Filestore } from './filestore';
import { ICatalystFolder, ICatalystGResponse, ICatalystFile, ParsableComponent } from '../utils/pojo/common';
import { AuthorizedHttpClient } from '../utils/api-request';
import fs from 'fs';
export declare type ICatalystFolderDetails = ICatalystFolder & Omit<ICatalystGResponse, 'modified_time' | 'modified_by'>;
declare type ICatalystFileDetails = ICatalystFile & ICatalystGResponse;
export declare class Folder implements ParsableComponent<ICatalystFolderDetails> {
    _folderDetails: ICatalystFolderDetails;
    requester: AuthorizedHttpClient;
    constructor(fileInstance: Filestore, folderDetails: ICatalystFolderDetails);
    getComponentName(): string;
    update(folderDetails: Omit<ICatalystFolder, 'id'>): Promise<ICatalystFolderDetails>;
    delete(): Promise<boolean>;
    getFileDetails(id: string | number): Promise<ICatalystFileDetails>;
    deleteFile(id: string | number): Promise<boolean>;
    uploadFile(fileDetails: {
        code: fs.ReadStream;
        name: string;
    }): Promise<Omit<ICatalystFileDetails, 'modified_time' | 'modified_by'>>;
    private getDownloadRequest;
    downloadFile(id: string | number): Promise<Buffer>;
    getFileStream(id: string | number): Promise<http.IncomingMessage>;
    toString(): string;
    toJSON(): ICatalystFolderDetails;
}
export {};
