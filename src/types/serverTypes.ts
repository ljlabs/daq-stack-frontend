import { Moment } from "moment";

export interface IMetadata {
    shortDescription: string,
    longDescription: string,
    experimentName: string,
    experimenterName: string,
    experimentXAxis: string,
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
    experimentXAxis: string;
    Data?: Array<Array<number>>;
    id: number;
}

export interface IDetail {
    ExperimenterName: string;
    ExperimentDate: Moment;
    ExperimentName: string;
    ExperimentLongDescription: string;
    experimentXAxis: string;
    Data?: Array<Array<number>>;
    id: number;
    ConfigFileUrl: string;
    LdfFileUrl: string;
    RootHistFile: string;
    RootTreeFile: string;
}