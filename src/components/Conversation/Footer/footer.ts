import "./footer.scss"
import Block from "../../../services/Block"
import MessageController from "../../../controllers/MessageController"

export class ConversationFooter extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "conversation__footer"
                }
            }
        )
    }

    getTextMsg() {
        const input = this._element.querySelector(".conversation-input input") as HTMLInputElement
        if (input) {
            const msg = input.value
            input.value = ""
            return msg
        } else {
            return null
        }
    }

    addEvents() {
        const btnSend = this._element?.querySelector(".conversation-send button") as HTMLButtonElement
        btnSend.onclick = () => {
            const msg = this.getTextMsg()
            if (msg) {
                MessageController.sendMsg(msg)
            }
        }
    }

    render() {
        return this.compile(`
            <div class="conversation-attach">
                <button class="conversation-attach__btn">
                    <svg width="23" height="24" viewBox="0 0 23 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.6195 9.78055L19.5623 10.7234C22.003 8.28259 22.0118 4.3341 19.5819 1.90417C17.152 -0.525759 13.2035 -0.516965 10.7627 1.92381L11.7055 2.86662C13.6233 0.948868 16.7257 0.941958 18.6349 2.85119C20.5441 4.76042 20.5372 7.8628 18.6195 9.78055ZM13.5574 19.8708L21.1335 12.2946L22.0763 13.2374L14.5002 20.8136L13.5574 19.8708ZM5.70067 12.0141L13.2768 4.43793L14.2196 5.38074L6.64348 12.9569L5.70067 12.0141ZM3.18662 9.50003L10.7628 1.92389L11.7056 2.8667L4.12943 10.4428L3.18662 9.50003ZM18.6195 9.78058L11.0433 17.3567L11.9861 18.2995L19.5623 10.7234L18.6195 9.78058ZM4.10831 19.8919C6.71181 22.4954 10.9423 22.486 13.5574 19.8709L14.5003 20.8137C11.3621 23.9519 6.28549 23.9632 3.16129 20.839C0.0370971 17.7148 0.048405 12.6381 3.18655 9.5L4.12936 10.4428C1.51424 13.0579 1.50482 17.2884 4.10831 19.8919ZM5.68689 18.3138C3.95123 16.5782 3.95751 13.7578 5.70092 12.0144L6.64373 12.9572C5.42334 14.1776 5.41894 16.1518 6.63391 17.3668C7.84887 18.5818 9.82312 18.5774 11.0435 17.357L11.9863 18.2998C10.2429 20.0432 7.42255 20.0495 5.68689 18.3138Z" />
                    </svg>
                </button>
            </div>
            <div class="conversation-input">
                <input type="text" placeholder="Сообщение">
            </div>
            <div class="conversation-send">
                <button class="btn-circle">
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.33554 6.79995H0V5.19995H9.33546L6.37531 1.49976L7.62469 0.500244L11.6247 5.50024L12.0245 6L11.6247 6.49976L7.62469 11.4998L6.37531 10.5002L9.33554 6.79995Z"/>
                    </svg>
                </button>
            </div>
        `)
    }
}
