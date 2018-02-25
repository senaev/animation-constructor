export function prependChild (containerNode: Node, childNode: Node): void {
    if (containerNode.firstChild) {
        containerNode.insertBefore(childNode, containerNode.firstChild);
    } else {
        containerNode.appendChild(childNode);
    }
}
