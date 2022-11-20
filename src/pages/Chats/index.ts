import Page from "../../layouts/Page"
import Chats from "../../components/Chats"
import ChatsListHeader from "../../components/Chats/Header"
import ChatsListItem from "../../components/Chats/Listitem"
import Conversation from "../../components/Conversation"
import ConversationMessage from "../../components/Conversation/Message"
import ConversationHeader from "../../components/Conversation/Header"
import ConversationFooter from "../../components/Conversation/Footer"

const chatsListHeader = new ChatsListHeader({})

const chatsList = [
    new ChatsListItem({
        name: "Design Destroyer",
        date: "12 Окт 2022",
        text: "В 2008 году художник Jon Rafman начал собирать...",
        action: 4
    }),
    new ChatsListItem({
        name: "Вадим",
        date: "10:49",
        text: "Изображение",
        active: true
    }),
    new ChatsListItem({
        name: "Киноклуб",
        date: "12:00",
        text: "Вы: стикер"
    }),
    new ChatsListItem({
        name: "тет-а-теты",
        date: "Ср",
        text: "И Human Interface Guidelines и Material Design рекомендуют...",
        action: 17
    }),
]

const chatsSidebar = new Chats({
    chatsListHeader,
    chatsList
})

const chat = new Conversation({
    header: new ConversationHeader({
        name: "Вадим"
    }),
    messages: [
        new ConversationMessage({
            text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
            time: "11:56"
        }),
        new ConversationMessage({
            text: "Круто!",
            time: "12:00",
            myMessage: true
        })
    ],
    footer: new ConversationFooter({})
})


const ChatsPage = {
    pathname: "/messenger",
    view: Page,
    props: {
        sidebar: chatsSidebar,
        content: chat
    },
    isAuthFn: () => {
        console.log("auth chatp")
    },
    isNotAuthFn: () => {
        console.log('not auth chatp')
    }
}

export default ChatsPage
