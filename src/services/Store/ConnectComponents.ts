import {connect} from "./Connect"

export const connectProfile = connect(state => ({
    profile: state.profile
}))

export const connectMessenger = connect(state => ({
    chatList: state.chatList,
    activeChat: state.activeChat,
    token: state.token,
    msg: state.msg,
}))
