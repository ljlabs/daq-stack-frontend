import React from 'react';
import { withRouter, RouteComponentProps, StaticContext } from 'react-router';
import { IExperimentGeneral } from '../../types/experimentData';
import moment from 'moment';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import Graph from '../../components/graph/graph';
import { routeConsts } from '../../constants/routes';
import { IDetail } from '../../types/serverTypes';

interface IAppProps extends React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>> {
}

interface IAppState {
    experiment: IDetail;
}

class Display extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            experiment: {
                id: 0,
                ExperimentDate: moment(),
                ExperimenterName: 'Kyle',
                ExperimentName: 'demo plot',
                Data: [[1,2,3], [1,34,4]],
                ExperimentLongDescription: 'just an experiment',
            },
        };
    }

    public navToRootFile = () => {
        window.location.href = 'http://www.google.com';
    }

    public navToLdfFile = () => {
        window.location.href = 'http://www.google.com';
    }

    public navToConfigFile = () => {
        window.location.href = 'http://www.google.com';
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
                            {this.state.experiment.ExperimenterName + " " + this.state.experiment.ExperimentDate.toISOString()}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.state.experiment.ExperimentName}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {this.state.experiment.ExperimentLongDescription}
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
