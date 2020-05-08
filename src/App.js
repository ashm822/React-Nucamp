import React, { Component } from 'react';
import Main from './components/MainComponent';
import { CAMPSITES } from './shared/campsites'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';

const store = ConfigureStore();

class App extends Component {
    constructor(props){
        super(props);
         this.state = {
            campsites: CAMPSITES
        };
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Main />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;