import React from "react";
import styles from "./index.css";

export default class Location extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            overlay: true
        };

        this.onScrollWindow = this.onScrollWindow.bind(this);
    }

    onScrollWindow(e) {
        if (this.state.overlay === false) {
            this.setState({overlay: true});
        }
    }

    onClickOverlay(e) {
        this.setState({
            overlay: false
        });
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScrollWindow);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScrollWindow);
    }

    render() {
        return (
            <section className={styles.container}>
                {this.state.overlay ?
                    <div className={styles.overlay} onClick={this.onClickOverlay.bind(this)}></div> : null}
                <iframe
                    className={styles.map}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1409.8986434046376!2d38.97312859999998!3d45.029040400000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f04fbca262ea4d%3A0xa0834aed65272aec!2z0JrRg9Cx0LvQvtCz!5e0!3m2!1sru!2sru!4v1478433230539"
                    frameBorder="0"
                    allowFullScreen/>
            </section>
        )
    }
}