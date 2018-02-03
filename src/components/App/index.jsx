import React from "react";
import WebFont from "webfontloader";

import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";

import "normalize.css";
import "./index.css";
import "./font/index.css";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

if (window && window.document) {
    WebFont.load({
        custom: {
            families: ["SF UI Display:n3,n4,n5,n6,n7"]
        }
    });
}