import React from 'react';
import Dropzone from 'react-dropzone'

interface IAppProps {
    label : string;
    onDrop: (s: File[]) => void;
    hasFile : boolean;
}

interface IAppState {
    isHovering : boolean;
}

class FileUpload extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            isHovering : false,
        };
    }

    public render = () => {
        return (
            <div className={'fdr p20'}>
                        <Dropzone onDrop={acceptedFiles => this.props.onDrop(acceptedFiles)} onDragEnter={() => {
                            this.setState({ isHovering : true });
                        }}
                            onDragLeave={() => {
                                this.setState({ isHovering : false });
                            }}
                            onDropAccepted={() => {
                                this.setState({ isHovering : false });
                            }}
                            onDropRejected={() => {
                                this.setState({ isHovering : false });
                            }}
                        >
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()} className={(this.state.isHovering ? " bgrLightBlue " : (this.props.hasFile ? " bgrLimeGreen " : " bgrLightGray ")) + " p20 br20"} >
                                <input {...getInputProps()} />
                                <p>{this.props.label}</p>
                            </div>
                            </section>
                        )}
                        </Dropzone>
            </div>
        );
    }
}

export default FileUpload;
