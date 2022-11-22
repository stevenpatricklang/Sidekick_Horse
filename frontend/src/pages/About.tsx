import React from "react";
import {Link} from "react-router-dom";

export interface IAboutPageProps {}
const Homepage: React.FunctionComponent<IAboutPageProps> = () => {
    return <div>
        <p>This is the about page.</p>
        <Link> to="/">Home</Link><br />
        <Link> to="/members">Go to the Members page</Link><br />
    </div>
};
export default Homepage;
