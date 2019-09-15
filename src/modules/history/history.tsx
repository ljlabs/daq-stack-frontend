import React from 'react';
import { IExperimentGeneral } from '../../types/experimentData';
import moment from 'moment';
import ExperimentCardSummary from './experimentSummaryCard';
import Graph from '../../components/graph/graph';
import { StaticContext, RouteComponentProps, withRouter } from 'react-router';

interface IAppProps extends React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>> {
}

interface IAppState {
    listOfExperiments: Array<IExperimentGeneral>;
}

class History extends React.Component<IAppProps, IAppState> {
    constructor(props : IAppProps) {
        super(props);
        this.state = {
            listOfExperiments: [{
                id: 0,
                experimentDate: moment(),
                experimenterName: 'Kyle',
                platName: 'demo plot',
                plotData: [23,1,56,123,234,345,45,2,1,21,312,2,34,325,34,23],
                shortDescription: 'just an experiment',
                longDescription: 'this is a long description about the co60 coincidence experiment',
                configFileData: '<xml>...stuff</xml>',
                configFileUrl: 'http://www.google.com',
                ldfFileURL: 'http://www.google.com',
                rootFileURL: 'http://www.google.com'
            },
            {
                id: 1,
                experimentDate: moment(),
                experimenterName: 'Kyle',
                platName: 'demo plot',
                plotData: [2,41,56,123,76,4,42,24,112,254,3,245,34,34,34,2],
                shortDescription: 'just an experiment',
                longDescription: 'this is a long description about the co60 coincidence experiment',
                configFileData: '<xml>...stuff</xml>',
                configFileUrl: 'http://www.google.com',
                ldfFileURL: 'http://www.google.com',
                rootFileURL: 'http://www.google.com'
            }],
        };
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