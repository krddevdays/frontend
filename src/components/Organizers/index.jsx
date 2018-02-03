import React from "react";
import Card from "../Card";
import styles from "./index.css";

export default class Organizers extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            organizers: [
                {
                    photo: require("../../photos/mark.jpg"),
                    name: "Марк Ланговой",
                    company: "Ведущий Front-end разработчик 3D4Medical",
                    email: "marklangovoi@gmail.com"
                }
            ]
        }
    }

    render() {
        return (
            <section className={styles.container}>
                <h3 className={styles.title}>Организаторы</h3>
                <div className={styles.cards}>
                    {this.state.organizers.map((organizer, i) => <Card key={i}
                                                                   className={styles.card}
                                                                   {...organizer}/>)}
                </div>
            </section>
        )
    }
}