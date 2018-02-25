import { addElementEventListener } from '../addElementEventListener';
import { noop } from '../noop';
import { removeSelection } from '../removeSelection';

type Position = {
    x: number;
    y: number;
};

type StartPosition = {
    startX: number;
    startY: number;
};

type RelativePosition = {
    relativeX: number;
    relativeY: number;
};

export type DragPosition =
    & Position
    & StartPosition
    & RelativePosition;

export type DragListenerCallbacks = {
    onStart: (dragPosition: DragPosition) => void;
    onMove: (dragPosition: DragPosition) => void;
    onEnd: (dragPosition: DragPosition) => void;
};

export class DragListener {
    private readonly callbacks: DragListenerCallbacks;

    private activityStartPosition: RelativePosition | undefined;
    private readonly onDestroyFunctions: Array<() => void> = [];

    constructor(element: HTMLElement,
                {
                    onStart = noop,
                    onMove = noop,
                    onEnd = noop,
                }: Partial<DragListenerCallbacks>) {
        const { documentElement } = element.ownerDocument;

        this.callbacks = {
            onStart,
            onMove,
            onEnd,
        };

        const unsubscribeMouseDown = addElementEventListener(element, 'mousedown', (mouseDownEvent) => {
            if (this.activityStartPosition === undefined) {
                removeSelection();

                this.activityStartPosition = {
                    relativeX: mouseDownEvent.clientX,
                    relativeY: mouseDownEvent.clientY,
                };

                this.callbacks.onStart({
                    x: mouseDownEvent.clientX,
                    y: mouseDownEvent.clientY,
                    startX: mouseDownEvent.clientX,
                    startY: mouseDownEvent.clientY,
                    relativeX: 0,
                    relativeY: 0,
                });
            }
        }, { passive: true });

        const unsubscribeMouseMove = addElementEventListener(documentElement, 'mousemove', (mouseMoveEvent) => {
            if (this.activityStartPosition !== undefined) {
                removeSelection();

                const {
                    relativeX: startX,
                    relativeY: startY,
                } = this.activityStartPosition;

                this.callbacks.onMove({
                    x: mouseMoveEvent.clientX,
                    y: mouseMoveEvent.clientY,
                    startX,
                    startY,
                    relativeX: mouseMoveEvent.clientX - startX,
                    relativeY: mouseMoveEvent.clientY - startY,
                });
            }
        }, { passive: true });

        // Для корректной работы на элементе должен быть навешан стиль
        // user-select: none;
        const unsubscribeMouseUp = addElementEventListener(documentElement, 'mouseup', (mouseUpEvent) => {
                if (this.activityStartPosition !== undefined) {
                    removeSelection();

                    const {
                        relativeX: startX,
                        relativeY: startY,
                    } = this.activityStartPosition;

                    this.callbacks.onEnd({
                        x: mouseUpEvent.clientX,
                        y: mouseUpEvent.clientY,
                        startX,
                        startY,
                        relativeX: mouseUpEvent.clientX - startX,
                        relativeY: mouseUpEvent.clientY - startY,
                    });

                    this.activityStartPosition = undefined;
                }
            },
            { passive: true }
        );

        this.onDestroyFunctions.push(
            unsubscribeMouseDown,
            unsubscribeMouseMove,
            unsubscribeMouseUp,
        );
    }

    public destroy(): void {
        this.onDestroyFunctions.forEach((fn) => fn());
    }
}
