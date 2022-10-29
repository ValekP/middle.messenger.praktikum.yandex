import Block from "../../utils/Block";
import './chat.scss'


export class Chat extends Block<{}> {
    constructor() {
        super('div',
            {
                attr: {
                    class: "chat"
                }
            }
        )
    }

    render() {
        return this.compile(`
            <div class="chat__header">
                <div class="chat__header-info">
                    <div class="chat__header-info_img">
                        <!--<img src="" alt="">-->
                    </div>
                    <div class="chat__header-info_name">Вадим</div>
                </div>
                <div class="chat__header-control">
                    <button class="chat__header-control_btn">
                        <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 2C3 2.82843 2.32843 3.5 1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5C2.32843 0.5 3 1.17157 3 2ZM3 8C3 8.82843 2.32843 9.5 1.5 9.5C0.671573 9.5 0 8.82843 0 8C0 7.17157 0.671573 6.5 1.5 6.5C2.32843 6.5 3 7.17157 3 8ZM1.5 15.5C2.32843 15.5 3 14.8284 3 14C3 13.1716 2.32843 12.5 1.5 12.5C0.671573 12.5 0 13.1716 0 14C0 14.8284 0.671573 15.5 1.5 15.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="chat__content">
                <div class="messages">
                    <div class="message">
                        <div class="message-inner">
                            <div class="message__media"></div>
                            <div class="message__text">
                                Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                            </div>
                            <div class="message__info">
                                <div class="message__info_time">11:56</div>
                            </div>
                        </div>
                    </div>
                    <div class="message message-my">
                        <div class="message-inner">
                            <div class="message__media"></div>
                            <div class="message__text">Круто!</div>
                            <div class="message__info">
                                <div class="message__info_time">12:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat__footer">
                <div class="chat-attach">
                    <button class="chat-attach__btn">
                        <svg width="23" height="24" viewBox="0 0 23 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6195 9.78055L19.5623 10.7234C22.003 8.28259 22.0118 4.3341 19.5819 1.90417C17.152 -0.525759 13.2035 -0.516965 10.7627 1.92381L11.7055 2.86662C13.6233 0.948868 16.7257 0.941958 18.6349 2.85119C20.5441 4.76042 20.5372 7.8628 18.6195 9.78055ZM13.5574 19.8708L21.1335 12.2946L22.0763 13.2374L14.5002 20.8136L13.5574 19.8708ZM5.70067 12.0141L13.2768 4.43793L14.2196 5.38074L6.64348 12.9569L5.70067 12.0141ZM3.18662 9.50003L10.7628 1.92389L11.7056 2.8667L4.12943 10.4428L3.18662 9.50003ZM18.6195 9.78058L11.0433 17.3567L11.9861 18.2995L19.5623 10.7234L18.6195 9.78058ZM4.10831 19.8919C6.71181 22.4954 10.9423 22.486 13.5574 19.8709L14.5003 20.8137C11.3621 23.9519 6.28549 23.9632 3.16129 20.839C0.0370971 17.7148 0.048405 12.6381 3.18655 9.5L4.12936 10.4428C1.51424 13.0579 1.50482 17.2884 4.10831 19.8919ZM5.68689 18.3138C3.95123 16.5782 3.95751 13.7578 5.70092 12.0144L6.64373 12.9572C5.42334 14.1776 5.41894 16.1518 6.63391 17.3668C7.84887 18.5818 9.82312 18.5774 11.0435 17.357L11.9863 18.2998C10.2429 20.0432 7.42255 20.0495 5.68689 18.3138Z" />
                        </svg>
                    </button>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Сообщение">
                </div>
                <div class="chat-send">
                    <button class="btn-circle">
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33554 6.79995H0V5.19995H9.33546L6.37531 1.49976L7.62469 0.500244L11.6247 5.50024L12.0245 6L11.6247 6.49976L7.62469 11.4998L6.37531 10.5002L9.33554 6.79995Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `)
    }
}
