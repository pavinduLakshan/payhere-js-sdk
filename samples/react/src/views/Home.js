import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <ul>
            <li><NavLink to="/checkout">Checkout Demo</NavLink></li>
            <li><NavLink to="/subscription">Subscription Demo</NavLink></li>
            <li><NavLink to="/preapprove">Preapproval Demo</NavLink></li>
            </ul>

        </div>
    );
};

export default Home;