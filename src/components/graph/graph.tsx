import React from 'react';
import { IExperimentGeneral } from '../../types/experimentData';
import PlotlyChart from 'react-plotlyjs-ts';
import { IHistory, IDetail } from '../../types/serverTypes';



interface IAppProps {
    generalExperiment: IHistory | IDetail;
}

interface IAppState {
}

class Graph extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
        };
    }

    public render = () => {
        const data = [
        {
            marker: {
                color: 'rgb(16, 32, 77)'
            },
            name: 'bar chart example',
            type: 'scatter',
            x: this.props.generalExperiment.Data[0],
            y: this.props.generalExperiment.Data[1]
        },
    ];
    const layout = {
        title: this.props.generalExperiment.ExperimentName,
        xaxis: {
            title: 'time'
        },
        yaxis: {
            title: 'counts'
        }
    };
    return (
        <PlotlyChart data={data}
                     layout={layout}
                     onClick={() => {}}
                     onHover={() => {}}
        />
    );
    }
}

export default Graph;
