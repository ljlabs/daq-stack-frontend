import React from 'react';
import { IExperimentGeneral } from '../../types/experimentData';
import moment from 'moment';
import ExperimentCardSummary from './experimentSummaryCard';
import Graph from '../../components/graph/graph';
import { StaticContext, RouteComponentProps, withRouter } from 'react-router';
import { experimentServices } from '../../services/experimentServices';
import { IHistory } from '../../types/serverTypes';

interface IAppProps extends React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>> {
}

interface IAppState {
    listOfExperiments: Array<IHistory>;
}

class History extends React.Component<IAppProps, IAppState> {
    constructor(props : IAppProps) {
        super(props);
        this.state = {
            listOfExperiments: [{
                id: 0,
                ExperimentDate: moment(),
                ExperimenterName: 'Kyle',
                ExperimentName: 'demo plot',
                Data: [[-2,1,3], [34,1,4]],
                ExperimentShortDescription: 'just an experiment',
                // longDescription: 'this is a long description about the co60 coincidence experiment',
                // configFileData: '<xml>...stuff</xml>',
                // configFileUrl: 'http://www.google.com',
                // ldfFileURL: 'http://www.google.com',
                // rootFileURL: 'http://www.google.com'
            },
            {
                id: 1,
                ExperimentDate: moment(),
                ExperimenterName: 'Kyle',
                ExperimentName: 'demo plot',
                Data: [[1,-2,3], [1,34,4]],
                ExperimentShortDescription: 'just an experiment',
            }],
        };
    }

    public componentDidMount = async () => {
        // get history
        const listOfExperiments = await experimentServices.getHistory();
        this.setState({ listOfExperiments });
    }

    public render = () => {
        return(
            <div className={'fdc'}>
                {this.state.listOfExperiments.map((experiment, i) => <div
                className={'p20'}
                        key={'ExperimentCardSummary' + i}>
                    <ExperimentCardSummary
                        generalExperiment={experiment}
                    />
                </div>)}
            </div>
        );
    }
}

export default withRouter((props: React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>>) => <History {...props}/>);