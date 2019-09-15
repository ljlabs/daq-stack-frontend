import React from 'react';
import { withRouter, RouteComponentProps, StaticContext } from 'react-router';
import { routeConsts } from '../../constants/routes';

interface IAppProps extends React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>>{
}

interface IAppState {
}

class Header extends React.Component<IAppProps, IAppState> {
    constructor(props : IAppProps) {
        super(props);
        this.state = {
        };
    }

    public render = () => {
        return(
            <div className={'fdr bgrDarkSlateGrey jcc'}>
                <div className={'p20 font20 fontBold cWhite'}>
                DAQ STACK -
                {'/' + this.props.location.pathname.split('/')[1] === routeConsts.displayRoute && " DISPLAY"}
                {this.props.location.pathname === routeConsts.historyRoute && " HISTORY"}
                {this.props.location.pathname === routeConsts.processRoute && " PROCESS"}
                </div>
            </div>
        );
    }
}

export default withRouter((props: React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>>) => <Header {...props}/>);
