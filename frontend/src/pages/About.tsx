import React from 'react';
import {NavLink} from "react-router-dom";

export default function About() {
    return (
        <div>
            <p>In here you can administrate the Sidekick Horses.</p>
            <NavLink to="/members">Go to the Members page</NavLink><br />
        </div>
    );
}

