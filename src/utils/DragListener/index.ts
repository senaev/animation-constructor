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

export type DragListenerParams = {
    draggingOnStart: boolean;
};

export class DragListener {
    private readonly callbacks: DragListenerCallbacks;

    private draggingStartRelativePosition: RelativePosition | undefined;
    private readonly onDestroyFunctions: Array<() => void> = [];

    constructor(// Для корректной работы на элементе должен быть установлен стиль
        // user-select: none;
        element: HTMLElement,
        {
            onStart = noop,
            onMove = noop,
            onEnd = noop,
        }: Partial<DragListenerCallbacks>,
        {
            draggingOnStart = false,
        }: Partial<DragListenerParams> = {}) {
        const { documentElement } = element.ownerDocument;

        this.callbacks = {
            onStart,
            onMove,
            onEnd,
        };

        if (draggingOnStart) {
            const unsubscribeFirstMouseMove = addElementEventListener(
                documentElement,
                'mousemove',
                this.startDragging,
                {
                    once: true,
                },
            );

            const unsubscribeFirstMouseUp = addElementEventListener(
                documentElement,
                'mouseup',
                unsubscribeFirstMouseMove,
                {
                    once: true,
                },
            );

            this.onDestroyFunctions.push(
                unsubscribeFirstMouseMove,
                unsubscribeFirstMouseUp,
            );
        }

        const unsubscribeMouseDown = addElementEventListener(
            element,
            'mousedown',
            this.startDragging
        );
        const unsubscribeMouseMove = addElementEventListener(
            documentElement,
            'mousemove',
            this.moveDragging
        );
        const unsubscribeMouseUp = addElementEventListener(
            documentElement,
            'mouseup',
            this.endDragging
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

    private startDragging = (mouseDownEvent: MouseEvent) => {
        if (this.draggingStartRelativePosition !== undefined) {
            return;
        }

        removeSelection();

        this.draggingStartRelativePosition = {
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

    private moveDragging = (mouseMoveEvent: MouseEvent) => {
        if (this.draggingStartRelativePosition === undefined) {
            return;
        }

        removeSelection();

        const {
            relativeX: startX,
            relativeY: startY,
        } = this.draggingStartRelativePosition;

        this.callbacks.onMove({
            x: mouseMoveEvent.clientX,
            y: mouseMoveEvent.clientY,
            startX,
            startY,
            relativeX: mouseMoveEvent.clientX - startX,
            relativeY: mouseMoveEvent.clientY - startY,
        });
    }

    private endDragging = (mouseUpEvent: MouseEvent) => {
        if (this.draggingStartRelativePosition === undefined) {
            return;
        }

        removeSelection();

        const {
            relativeX: startX,
            relativeY: startY,
        } = this.draggingStartRelativePosition;

        this.callbacks.onEnd({
            x: mouseUpEvent.clientX,
            y: mouseUpEvent.clientY,
            startX,
            startY,
            relativeX: mouseUpEvent.clientX - startX,
            relativeY: mouseUpEvent.clientY - startY,
        });

        this.draggingStartRelativePosition = undefined;
    }
}
