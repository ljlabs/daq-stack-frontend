import { Moment } from 'moment';

export interface IExperimentGeneral {
    id: number,
    plotData: Array<number>,
    platName: String,
    experimenterName: string,
    experimentDate: Moment,
    shortDescription: string,
    longDescription: string,
    configFileData: string,
    rootFileURL: string,
    ldfFileURL: string,
    configFileUrl: string,
}