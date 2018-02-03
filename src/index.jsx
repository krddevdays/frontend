import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import moment from "moment";
import "moment/locale/ru";
import App from "./components/App";
import {AppContainer} from "react-hot-loader";

moment.locale("ru");

if (typeof document !== "undefined") {
    const app = document.getElementById("app");

    if (module.hot) {
        module.hot.accept("./components/App", () => {
            ReactDOM.render(
                <AppContainer>
                    <App />
                </AppContainer>,
                app
            );
        });

        ReactDOM.render(
            <AppContainer>
                <App />
            </AppContainer>,
            app
        );
    } else {
        ReactDOM.render(
            <App />,
            app
        );
    }
}

export default function (locals) {
    let html = require("raw!./app.html");
    let yaMetrika = require("raw!./yandex-metrika.html");

    return html.replace('<div id="app"></div>', `<div id="app">${ReactDOMServer.renderToString(<App />)}</div>`)
        .replace('</head>', '<link rel="stylesheet" href="./style.css">\n</head>')
        .replace('</body>', `${yaMetrika}\n</body>`);
}