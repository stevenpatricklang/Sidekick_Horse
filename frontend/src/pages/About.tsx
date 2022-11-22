import React from 'react';
import {NavLink} from "react-router-dom";

export default function About() {
    return (
        <div>
            <p>This is the about page.</p>
            <NavLink to="/">Home</NavLink><br />
            <NavLink to="/members">Go to the Members page</NavLink><br />
        </div>
    );
}


