import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';



interface IAppRootProps {}

class AppRoot extends React.Component<IAppRootProps> {
    protected store : any;

    constructor(props : IAppRootProps) {
        super(props);
    }

    public render = () => {
        return (
            <BrowserRouter>
                        <App />
            </BrowserRouter>
        );
    }
}

const rootDomElement = document.getElementById('root');

if (rootDomElement) {
    ReactDOM.render(<AppRoot />, rootDomElement);
}
