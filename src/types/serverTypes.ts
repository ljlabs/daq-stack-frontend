import { Moment } from "moment";

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

export interface IHistory {
    ExperimenterName: string;
    ExperimentDate: Moment;
    ExperimentName: string;
    ExperimentShortDescription: string;
    Data: Array<Array<number>>;
    id: number;
}

export interface IDetail {
    ExperimenterName: string;
    ExperimentDate: Moment;
    ExperimentName: string;
    ExperimentLongDescription: string;
    Data: Array<Array<number>>;
    id: number;
}