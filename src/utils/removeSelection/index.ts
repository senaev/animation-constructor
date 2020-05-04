export function removeSelection(): void {
    const selection = window.document.getSelection();

    if (!selection) {
        return;
    }

    // check range before calling removeAllRanges to prevent cryptic errors in ie
    if (selection.rangeCount > 0 && selection.getRangeAt(0).getClientRects().length > 0) {
        selection.removeAllRanges();
    }
}
