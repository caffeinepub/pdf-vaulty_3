import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AnalyticsRecord {
    byTool: Array<[string, bigint]>;
    totalOperations: bigint;
    filesProcessed: bigint;
}
export interface FileRecord {
    id: string;
    blob: ExternalBlob;
    name: string;
    size: bigint;
    uploadedAt: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteFile(fileId: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFileById(fileId: string): Promise<FileRecord | null>;
    getFileIdsForUser(user: Principal): Promise<Array<string>>;
    getMyAnalytics(): Promise<AnalyticsRecord | null>;
    getMyFiles(): Promise<Array<FileRecord>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    renameFile(fileId: string, newName: string): Promise<void>;
    saveAnalytics(record: AnalyticsRecord): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveFile(name: string, size: bigint, blob: ExternalBlob): Promise<void>;
}
