import React from 'react';
import { IExperimentGeneral } from '../../types/experimentData';
import PlotlyChart from 'react-plotlyjs-ts';



interface IAppProps {
    generalExperiment: IExperimentGeneral;
}

interface IAppState {
}

class Graph extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
        };
    }

    public plotData = () => {
        const x: Array<number> = [];
        for(let i : number = 0; i < this.props.generalExperiment.plotData.length; i++) {
            x.push(i);
        }
        return x;
    }

    public render = () => {
        const data = [
        {
            marker: {
                color: 'rgb(16, 32, 77)'
            },
            name: 'bar chart example',
            type: 'scatter',
            x: this.plotData(),
            y: this.props.generalExperiment.plotData
        },
    ];
    const layout = {
        title: this.props.generalExperiment.platName,
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
