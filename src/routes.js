import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CustomersList from './components/Customers/CustomersList';
function RouteLayout() {
    return (
        <Router>
            <Switch>
                <Route path="/customers" component={CustomersList} />
                <Redirect to='/customers' />
            </Switch>
        </Router>
    );
}

export default RouteLayout;