import React from 'react';
import { withRouter, RouteComponentProps, StaticContext } from 'react-router';
import { routeConsts } from '../../constants/routes';
import { Button, Fab, Icon } from '@material-ui/core';

interface IAppProps extends React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>> {
}

interface IAppState {
}

class Header extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
        };
    }

    public navToProcessingPage = () => {
        this.props.history.push(routeConsts.processRoute);
    }

    public navToHome = () => {
        this.props.history.push(routeConsts.historyRoute);
    }

    public render = () => {
        return (
            <div className={'fdr bgrDarkSlateGrey jcc'}>
                <div className={"pt5"}>
                <Fab color="primary" aria-label="add" onClick={this.navToHome}>
                    <Icon>home</Icon>
                </Fab>
                </div>
                <div className={'p20 font20 fontBold cWhite'}>
                    DAQ STACK -
                {'/' + this.props.location.pathname.split('/')[1] === routeConsts.displayRoute && " DISPLAY"}
                    {this.props.location.pathname === routeConsts.historyRoute && " HISTORY"}
                    {this.props.location.pathname === routeConsts.processRoute && " PROCESS"}
                </div>
                <Button size="small" onClick={this.navToProcessingPage}><div className={"cLightGray"}>Process New Experiment</div></Button>
            </div>
        );
    }
}

export default withRouter((props: React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>>) => <Header {...props} />);
