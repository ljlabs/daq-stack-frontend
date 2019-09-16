import React from 'react';
import { withRouter, RouteComponentProps, StaticContext } from 'react-router';
import { IExperimentGeneral } from '../../types/experimentData';
import moment from 'moment';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import Graph from '../../components/graph/graph';
import { routeConsts } from '../../constants/routes';
import { IDetail } from '../../types/serverTypes';
import { experimentServices } from '../../services/experimentServices';
import { apiUrl } from '../../constants/endpoints';

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
                experimentXAxis: 'time',
                ConfigFileUrl: 'http://www.google.com',
                LdfFileUrl: 'http://www.google.com',
                RootHistFile: 'http://www.google.com',
                RootTreeFile: 'http://www.google.com',
            },
        };
    }

    public componentDidMount = async () => {
        // get history
        const experiment = await experimentServices.getDetails(this.props.match.params.id);
        this.setState({ experiment });
    }

    public navToRootHistFile = () => {
        window.location.href = apiUrl + "/" + this.state.experiment.RootHistFile;
    }

    public navToRootTreeFile = () => {
        window.location.href = apiUrl + "/" + this.state.experiment.RootTreeFile;
    }

    public navToLdfFile = () => {
        window.location.href = apiUrl + "/" + this.state.experiment.LdfFileUrl;
    }

    public navToConfigFile = () => {
        window.location.href = apiUrl + "/" + this.state.experiment.ConfigFileUrl;
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
                            {this.state.experiment.ExperimenterName + " " + this.state.experiment.ExperimentDate.toISOString}
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
                            <Button size="small" onClick={this.navToRootHistFile}>Download Root Histogram File</Button>
                        </CardActions>
                        <CardActions className={'jcc wfill pl20 pr10'}>
                            <Button size="small" onClick={this.navToRootTreeFile}>Download Root Tree File</Button>
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
