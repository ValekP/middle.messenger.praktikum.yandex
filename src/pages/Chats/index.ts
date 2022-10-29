import Page from "../../layouts/Page";
import ChatsList from "../../components/ChatsList";
import {Chat} from "../../components/Chat/chat";

const chatList = new ChatsList({
    chats: [
        {
            name: "Design Destroyer",
            date: "12 Окт 2022",
            text: "В 2008 году художник Jon Rafman начал собирать...",
            action: 4
        },
        {name: "Вадим", date: "10:49", text: "Изображение", action: false, active: true},
        {name: "Киноклуб", date: "12:00", text: "Вы: стикер", action: false},
        {
            name: "тет-а-теты",
            date: "Ср",
            text: "И Human Interface Guidelines и Material Design рекомендуют...",
            action: 17
        }
    ]
})

const chat = new Chat()

const ChatsPage = new Page({
    sidebar: chatList,
    content: chat
})

export default ChatsPage
