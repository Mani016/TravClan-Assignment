import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CustomerDetails from './components/Customers/CustomerDetail';
import CustomersList from './components/Customers/CustomersList';
function RouteLayout() {
    return (
        <Router>
            <Switch>
                <Route path="/customers" component={CustomersList} />
                <Route path="/customer-detail/:id" component={CustomerDetails} />
                <Redirect to='/customers' />
            </Switch>
        </Router>
    );
}

export default RouteLayout;