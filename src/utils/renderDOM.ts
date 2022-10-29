import Block from "./Block";

export default function renderDOM(query: string, block: Block) {
    const root = document.querySelector(query);
    if(root) {
        Object.values(root.children).forEach(item => item.remove())
        root.appendChild(block.getContent());
    }
    block.dispatchComponentDidMount();
    return root;
}
