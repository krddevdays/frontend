import React from "react";
import Information from "../Information";
import Speakers from "../Speakers";
import Schedule from "../Schedule";
import Organizers from "../Organizers";
import Location from "../Location";

export default class Main extends React.Component {
    render() {
        return (
            <main role="main">
                <Information/>
                <Speakers/>
                <Schedule/>
                <Organizers/>
                <Location/>
            </main>
        )
    }
}