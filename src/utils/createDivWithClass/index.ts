export function createDivWithClass(parent: HTMLElement, className: string) {
    const div = parent.ownerDocument!.createElement('div');
    div.className = className;
    parent.appendChild(div);

    return div;
}
