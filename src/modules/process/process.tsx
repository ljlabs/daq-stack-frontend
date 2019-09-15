import React from 'react';
import Card from '@material-ui/core/Card';
import Dropzone from 'react-dropzone'
import FileUpload from '../../components/fileUpload/fileupload';
import { TextField, Fab, Icon, Avatar } from '@material-ui/core';
import { fabTheme } from '../../theme/fabTheme';
import { ThemeProvider } from '@material-ui/styles';
import { experimentServices } from '../../services/experimentServices';
import moment from 'moment';

interface IAppProps {
}

interface IAppState {
    configXmlFileContent: string;
    experimentDataIsReady: boolean;
    ConfigDataIsReady: boolean;
    experimentShortDescription: string;
    experimentLongDescription: string;
    experimenterName: string;
    experimentName: string;
    isLoading: boolean;
    experimentFile?: File;
}

class Process extends React.Component<IAppProps, IAppState> {

    public readerXmlCode = new FileReader();
    public readerExperimentData = new FileReader();
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            configXmlFileContent: '',
            experimentDataIsReady: false,
            ConfigDataIsReady: false,
            experimentLongDescription: '',
            experimentShortDescription: '',
            experimenterName: '',
            experimentName: '',
            isLoading: false,
            experimentFile: undefined,
        };

        // this.readerExperimentData.onabort = () => console.log('file reading was aborted');
        // this.readerExperimentData.onerror = () => console.log('file reading has failed');
        // this.readerExperimentData.onload = () => {
        //     // Do whatever you want with the file contents
        //     const experimentData = new Uint8Array(this.readerExperimentData.result as ArrayBuffer);
        //     console.log(experimentData);
        //     this.setState({
        //         experimentDataIsReady: true
        //     });
        // }

        this.readerXmlCode.onabort = () => console.log('file reading was aborted');
        this.readerXmlCode.onerror = () => console.log('file reading has failed');
        this.readerXmlCode.onload = () => {
            // Do whatever you want with the file contents
            const configData = this.readerXmlCode.result;
            if (configData != null) {
                this.setState({
                    configXmlFileContent: configData.toString(),
                    ConfigDataIsReady: true
                });
            }
            console.log(configData)
        }
    }

    public experimentPannelIsComplete= () => {
        return (this.state.experimentDataIsReady && this.state.experimentShortDescription != '' && this.state.experimentLongDescription != '')
    }

    public canProcess = () => {
        return (this.experimentPannelIsComplete() && this.state.ConfigDataIsReady);
    }


    public onDropXml = (fileList: File[]) => {
        for (const file of fileList) {
            this.readerXmlCode.readAsText(file);
        }
    }

    public onDropExperimentData = (fileList: File[]) => {
        if (fileList.length > 0) {
            this.setState({
                experimentFile: fileList[0],
                experimentDataIsReady: true
            });
        }
    }

    public updateConfigFile = (e: any) => {
        this.setState({
            configXmlFileContent: e.target.value
        });
    }


    public updateLongDescription = (e: any) => {
        this.setState({
            experimentLongDescription: e.target.value
        });
    }


    public updateShortDescription = (e: any) => {
        this.setState({
            experimentShortDescription: e.target.value
        });
    }
    public updateExperimenterName = (e: any) => {
        this.setState({
            experimenterName: e.target.value
        });
    }


    public updateExperimentName = (e: any) => {
        this.setState({
            experimentName: e.target.value
        });
    }

    public processExperiment = async () => {
        console.log('sending');
        this.setState({isLoading: true});
        // create a new experiment instance in db
        const experimentId = await experimentServices.uploadExperimentMetadata({
            experimentName: this.state.experimentName,
            experimenterName: this.state.experimenterName,
            longDescription: this.state.experimentLongDescription,
            shortDescription: this.state.experimentShortDescription,
        });
        console.log('created experiment');
        // upload configuration file
        await experimentServices.uploadExperimentConfigFile({
            fileData: this.state.configXmlFileContent,
            fileName: this.state.experimentName + experimentId.toString() + ".xml",
            id: experimentId
        });
        console.log('uploaded experiment config');
        // upload experiment file 
        await experimentServices.uploadExperimentDataFile(
            (this.state.experimentFile as File),
            experimentId
        );
        console.log('uploaded experiment data');
        console.log(experimentId);
        console.log('complete');
    }

    public render = () => {
        return (
            <div className={'fdr p20 hfill'}>
                <Card className={'wfill ais'}>
                    <div className={'p20 aic fdc wfill'}>
                        <div className={'font18 fontBold jcc wfill fdr aic'}>
                            <p>Experiment Data</p>
                            <Icon className={'cBlack p20'}>
                                {
                                    this.experimentPannelIsComplete() ? 'check_circle' : 'cancel'
                                }
                            </Icon>
                        </div>
                        <FileUpload label={"Drag 'n' Drop Your Experiment Data Here"} onDrop={this.onDropExperimentData} hasFile={this.state.experimentDataIsReady}/>
                        <div className={'pb10 pt20 fdr wfill'}>
                            <TextField
                                id="filled-multiline-flexible"
                                label="Experiment Name"
                                className={'wfill'}
                                value={this.state.experimentName}
                                onChange={this.updateExperimentName}
                                variant="filled"
                            />
                        </div>
                        <div className={'pb20 pt10 fdr wfill'}>
                            <TextField
                                id="filled-multiline-flexible"
                                label="User Name"
                                className={'wfill'}
                                value={this.state.experimenterName}
                                onChange={this.updateExperimenterName}
                                variant="filled"
                            />
                        </div>
                        <div className={'pb10 pt20 fdr wfill'}>
                            <TextField
                                id="filled-multiline-flexible"
                                label="Short Description"
                                multiline
                                rowsMax="20"
                                className={'wfill'}
                                value={this.state.experimentShortDescription}
                                onChange={this.updateShortDescription}
                                variant="filled"
                            />
                        </div>
                        <div className={'pb20 pt10 fdr wfill'}>
                            <TextField
                                id="filled-multiline-flexible"
                                label="Long Description"
                                multiline
                                rowsMax="20"
                                className={'wfill'}
                                value={this.state.experimentLongDescription}
                                onChange={this.updateLongDescription}
                                variant="filled"
                            />
                        </div>
                        <div className={'br20 border1 jcsa aic Smoke wfill'}>
                            <ThemeProvider theme={fabTheme}>

                                <Fab variant="extended" aria-label="delete" className={'p20'} color={this.canProcess() ? 'primary' : 'secondary'} disabled={!this.canProcess()} onClick={this.processExperiment}>
                                    <Icon >play_arrow</Icon>
                                    Process
                            </Fab>
                            </ThemeProvider>
                            {this.canProcess() ? 'Please Click Process To Upload Documents And Begin Analysis' : 'Please Submit All Required Documents'}
                        </div>
                    </div>
                </Card>
                <div className={'p20'} />
                <Card className={'wfill ais'}>
                    <div className={'p20 aic fdc wfill'}>
                        <div className={'font18 fontBold jcc wfill fdr aic'}>
                            <p>XML Config</p>

                            <Icon className={'cBlack p20'}>
                                {
                                    this.state.ConfigDataIsReady ? 'check_circle' : 'cancel'
                                }
                            </Icon>
                        </div>
                        <FileUpload label={"Drag 'n' Drop Your Config File Here"} onDrop={this.onDropXml} hasFile={this.state.ConfigDataIsReady}/>
                        <div className={'p20'} />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Multiline"
                            multiline
                            rowsMax="20"
                            className={'wfill'}
                            value={this.state.configXmlFileContent}
                            onChange={this.updateConfigFile}
                            margin="normal"
                            variant="filled"
                        />
                    </div>
                </Card>
            </div>
        );
    }
}

export default Process;
