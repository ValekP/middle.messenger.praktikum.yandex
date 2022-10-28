import Block from "./Block";

export default function renderDOM(query: string, block: Block) {
    const root = document.querySelector(query);
    if(root) {
        root.appendChild(block.getContent());
    }
    block.dispatchComponentDidMount();
    return root;
}
