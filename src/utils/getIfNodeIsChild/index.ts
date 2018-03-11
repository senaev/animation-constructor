export function getIfNodeIsChild(supposedParent: Node, supposedChild: Node): boolean {
    let { parentNode } = supposedChild;

    while (parentNode !== null) {
        if (parentNode === supposedParent) {
            return true;
        }

        parentNode = parentNode.parentNode;
    }

    return false;
}
