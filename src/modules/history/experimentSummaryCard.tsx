import React from 'react';
import { IExperimentGeneral } from '../../types/experimentData';
import { withRouter, RouteComponentProps, StaticContext } from 'react-router';
import { routeConsts } from '../../constants/routes';
import { Card, CardContent, Typography, CardActions, Button, CardHeader } from '@material-ui/core';
import Graph from '../../components/graph/graph';

interface IAppProps extends React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>> {
    generalExperiment: IExperimentGeneral;
}

interface IAppState {
}

class ExperimentCardSummary extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
        };
    }

    public navToDetails = () => {
        this.props.history.push(routeConsts.displayRoute + '/' + this.props.generalExperiment.id.toString());
    }

    public render = () => {
        console.log(this.props.generalExperiment.experimentDate.toISOString());
        return (
            <Card className={'fdr'}>
                {/* generalExperiment={this.props.generalExperiment} */}
                <div
                    className={'hfill wfill'}>
                    <Graph generalExperiment={this.props.generalExperiment} />
                </div>
                <div className={'p20 jcstretch'}>
                    <div className={'aic fdc jcc'}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {this.props.generalExperiment.experimenterName}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {this.props.generalExperiment.platName}
                            </Typography>
                            <Typography color='textSecondary'>
                            </Typography>
                            <Typography variant="body2" component="p">
                                {this.props.generalExperiment.shortDescription}
                            </Typography>
                        </CardContent>
                        <CardActions className={'jcc wfill'}>
                            <Button size="small" onClick={this.navToDetails}>Details</Button>
                        </CardActions>
                        </div>
                </div>
            </Card>
        );
    }
}

export default withRouter((props: IAppProps) => <ExperimentCardSummary {...props}/>);
