export function removeNodeFromParent (node: Node): void {
    const { parentElement } = node;
    if (parentElement !== null) {
        parentElement.removeChild(node);
    }
}
