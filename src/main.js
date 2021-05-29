import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './context';

const Main = props => {
    const [custDetails, setCustDetails] = useState({});
    const value = {
        setCustDetails,
        custDetails
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

Main.propTypes = { children: PropTypes.node };

export default Main;
