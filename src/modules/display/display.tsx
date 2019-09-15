import React from 'react';
import { withRouter, RouteComponentProps, StaticContext } from 'react-router';
import { IExperimentGeneral } from '../../types/experimentData';
import moment from 'moment';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import Graph from '../../components/graph/graph';
import { routeConsts } from '../../constants/routes';

interface IAppProps extends React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>> {
}

interface IAppState {
    experiment: IExperimentGeneral;
}

class Display extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            experiment: {
                id: 0,
                experimentDate: moment(),
                experimenterName: 'Kyle',
                platName: 'demo plot',
                plotData: [23, 1, 56, 123, 234, 345, 45, 2, 1, 21, 312, 2, 34, 325, 34, 23],
                shortDescription: 'just an experiment',
                longDescription: 'this is a long description about the co60 coincidence experiment',
                configFileData: '<xml>...stuff</xml>',
                configFileUrl: 'http://www.google.com',
                ldfFileURL: 'http://www.google.com',
                rootFileURL: 'http://www.google.com'
            },
        };
    }

    public navToRootFile = () => {
        window.location.href = this.state.experiment.rootFileURL;
    }

    public navToLdfFile = () => {
        window.location.href = this.state.experiment.ldfFileURL;
    }

    public navToConfigFile = () => {
        window.location.href = this.state.experiment.configFileUrl;
    }

    public render = () => {
        console.log(this.props.match.params.id);
        return (
            <div className={'fdc p20'}>
                <Card>
                    <Graph generalExperiment={this.state.experiment} />
                </Card>
                <div className={'p20'} />
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {this.state.experiment.experimenterName + " " + this.state.experiment.experimentDate.toISOString()}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.state.experiment.platName}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {this.state.experiment.longDescription}
                        </Typography>
                    </CardContent>
                    <div className={'fdr jcc'}>
                        <CardActions className={'jcc wfill pl20 pr10'}>
                            <Button size="small" onClick={this.navToRootFile}>Download Root File</Button>
                        </CardActions>
                        <CardActions className={'jcc wfill pl10 pr10'}>
                            <Button size="small" onClick={this.navToLdfFile}>Download Ldf File</Button>
                        </CardActions>
                        <CardActions className={'jcc wfill pl10 pr20'}>
                            <Button size="small" onClick={this.navToConfigFile}>Download Config File</Button>
                        </CardActions>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withRouter((props: IAppProps) => <Display {...props} />);
