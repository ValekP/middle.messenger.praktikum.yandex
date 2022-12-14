import './buttonBack.scss'
import { router } from '../../index'
import Block from '../../services/Block'

type ButtonBackProps = {
    link: string
}

export class ButtonBack extends Block {
    constructor (props: ButtonBackProps) {
        const { link } = props
        super('div',
            {
                attr: {
                    class: 'back-sidebar'
                },
                events: {
                    click: (e: Event) => {
                        e.preventDefault()
                        router.go(link)
                    }
                }
            }
        )
    }

    render () {
        return this.compile(`
            <button class="btn-circle">
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.66446 5.20005L13 5.20005V6.80005L3.66454 6.80005L6.62469 10.5002L5.37531 11.4998L1.37531 6.49976L0.9755 6L1.37531 5.50024L5.37531 0.500244L6.62469 1.49976L3.66446 5.20005Z" />
                </svg>
            </button>
        `)
    }
}
