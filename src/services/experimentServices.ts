import { IMetadata, IUploadFile } from "../types/serverTypes";
import axios from "axios";
import { endpoints } from "../constants/endpoints";

const uploadExperimentMetadata = async (metadata: IMetadata): Promise<number> => {
    const id: number = (await axios.post(endpoints.newExperiment, metadata)).data.id;
    return id;
};

const uploadExperimentConfigFile = async (file: IUploadFile): Promise<number> => {
    const id: number = (await axios.post(endpoints.uploadConfig, file)).data.id;
    return id;
};

const uploadExperimentDataFile = async (file: File, id: number): Promise<number> => {
    const formData = new FormData();
    formData.append('file', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return (await axios.post(endpoints.uploadExperimentData + "/" + id.toString(), formData, config)).data.id
}

const beginProcessing = async (id: number) => {
    console.log("Processing starting");
    await axios.get(endpoints.processExperiment + "/" + id.toString());
    console.log(endpoints.processExperiment + "/" + id.toString());
    console.log("Processing ending");
} 

export const experimentServices = {
    uploadExperimentMetadata: async (metadata: IMetadata): Promise<number> => await uploadExperimentMetadata(metadata),
    uploadExperimentConfigFile: async (file: IUploadFile): Promise<number> => await uploadExperimentConfigFile(file),
    uploadExperimentDataFile: async (file: File, id: number): Promise<number> => await uploadExperimentDataFile(file, id),
    beginProcessing: async (id : number) => await beginProcessing(id),
}