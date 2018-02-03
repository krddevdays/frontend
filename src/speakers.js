import moment from "moment";

const startMoment = moment("2016-12-10T12:00:00+0300");
const lectureDuration = [40, "m"];
let time = startMoment.clone();

export {
    startMoment,
    lectureDuration
}

export default [
    {
        photo: require("./photos/yurij.jpg"),
        name: "Юрий Михалевич",
        company: "Hola",
        time: time.clone(),
        lecture: "«Move fast and break things» или как создаётся самый лучший в мире видео&nbsp;CDN"
    },
    {
        photo: require("./photos/victor.jpg"),
        name: "Виктор Тыщенко",
        company: "3D4Medical",
        time: (time = time.add(...lectureDuration)).clone(),
        lecture: "Postgres. Начало."
    },
    {
        photo: require("./photos/misha.jpg"),
        name: "Михаил Скворцов",
        company: "3D4Medical",
        time: (time = time.add(...lectureDuration)).clone(),
        lecture: "Meteor как средство от головной боли"
    },
    {
        photo: require("./photos/aleks.jpg"),
        name: "Алексей Тактаров",
        company: "Code Hipsters",
        time: (time = time.add(...lectureDuration)).clone(),
        lecture: "Грязные анимации в мире состояний"
    },
    {
        photo: require("./photos/kolya.jpg"),
        name: "Николай Марченко",
        company: "Student Loan Hero",
        time: (time = time.add(...lectureDuration)).clone(),
        lecture: "a11y. Доступно о доступности"
    },
    {
        photo: require("./photos/pavel.jpg"),
        name: "Павел Орлов",
        company: "3D4Medical",
        time: (time = time.add(...lectureDuration)).clone(),
        lecture: "Фантастические технологии и где они обитают"
    },
    {
        photo: require("./photos/german.jpg"),
        name: "Герман Полянский",
        company: "Uscreen",
        time: (time = time.add(...lectureDuration)).clone(),
        lecture: "\"Swift\" или как программировать мышкой"
    },
    {
        photo: require("./photos/george.jpg"),
        name: "Георгий Кирий",
        company: "S Media Link",
        time: (time = time.add(...lectureDuration)).clone(),
        lecture: "Введение в архитектуру VIPER"
    },
    {
        photo: require("./photos/timofei.jpg"),
        name: "Тимофей Плотников",
        company: "S Media Link",
        time: (time = time.add(...lectureDuration)).clone(),
        lecture: "Введение в Reactive programming под Android"
    }
];