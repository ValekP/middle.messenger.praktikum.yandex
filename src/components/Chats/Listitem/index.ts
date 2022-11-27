export {ChatsListItem as default} from "./chatsListItem"

const getChat = (list: [], id: number) => {
    return list.find((chat: Indexed) => chat._props.id === id)
}

const removeChatActive = (list: []) => {
    list.forEach((chat: Indexed) => chat.removeActive())
}

export const clickChatItem = async (chatsList: [], chat: Indexed) => {
    removeChatActive(chatsList)
    const chatItem: any = getChat(chatsList, chat.id)
    if (chatItem) {
        chatItem.setActive()
    }
}
