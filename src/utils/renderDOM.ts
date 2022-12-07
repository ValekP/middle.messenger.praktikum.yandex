import Block from '../services/Block'

export default function renderDOM (query: string, block: Block) {
    const root = document.querySelector(query)
    if (root) {
        root.innerHTML = ''
        root.appendChild(block.getContent())
    }
    return root
}
