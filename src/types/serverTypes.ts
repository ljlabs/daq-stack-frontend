export interface IMetadata {
    shortDescription: string,
    longDescription: string,
    experimentName: string,
    experimenterName: string,
}

export interface IUploadFile {
    id: number,
    fileName: string,
    fileData: string | Uint8Array,
}