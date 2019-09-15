import { IMetadata, IUploadFile, IHistory, IDetail } from "../types/serverTypes";
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

const getHistory = async (): Promise<Array<IHistory>> => {
    return (await axios.get(endpoints.history)).data as Array<IHistory>;
}

const getDetails = async (id: number): Promise<IDetail> => {
    return (await axios.get(endpoints.detail + "/" + id.toString())).data as IDetail;
}

export const experimentServices = {
    uploadExperimentMetadata: async (metadata: IMetadata): Promise<number> => await uploadExperimentMetadata(metadata),
    uploadExperimentConfigFile: async (file: IUploadFile): Promise<number> => await uploadExperimentConfigFile(file),
    uploadExperimentDataFile: async (file: File, id: number): Promise<number> => await uploadExperimentDataFile(file, id),
    beginProcessing: async (id : number) => await beginProcessing(id),
    getHistory: async () : Promise<Array<IHistory>> => await getHistory(),
    getDetails: async (id : number) : Promise<IDetail> => await getDetails(id),
}