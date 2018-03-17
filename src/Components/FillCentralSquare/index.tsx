import * as cx from 'classnames';
import * as React from 'react';
import { getCentralSquareOfRectangle } from '../../utils/Trigonometry/getCentralSquareOfRectangle';
import * as c from './index.pcss';

export type FillCentralSquareProps = {
    width: number;
    height: number;
    className?: string;
};

export class FillCentralSquare extends React.Component<FillCentralSquareProps, {}> {
    public render() {
        const {
            width,
            height,
            className,
        } = this.props;

        const {
            size,
            x,
            y,
        } = getCentralSquareOfRectangle({
            x: 0,
            y: 0,
            width,
            height,
        });

        return <div
            className={ cx(c.FillCentralSquare, className) }
            style={ {
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}px`,
                top: `${y}px`,
            } }
        >
            { this.props.children }
        </div>;
    }
}
