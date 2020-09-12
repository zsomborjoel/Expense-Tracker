import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Category from './Category';
import Home from './Home';
import Expense from './Expenses';

class App extends Component {
    state = { }
    render() {
        // Create a router consist these pages and switches between them
        return(
            <Router>
                <Switch>
                     <Route path='/' exact={true} component={Home}/>
                     <Route path='/categories' exact={true} component={Category}/>
                     <Route path='/expenses' exact={true} component={Expense}/>
                </Switch>
             </Router>
        );
    }
}

export default App;