import * as React from 'react';
import { mapObjectValues } from '../utils/mapObjectValues';
import { AllEasings } from './AllEasings';
import { Easing } from './Easing';

const SVG_HEIGHT = 16;
const SVG_WIDTH = 24;
const SVG_VERTICAL_PADDING = 1;
const svgLineHeight = SVG_HEIGHT - SVG_VERTICAL_PADDING * 2;

function valueToYPosition(value: number): string {
    return String((SVG_HEIGHT - value * SVG_HEIGHT) * (svgLineHeight / SVG_HEIGHT) + SVG_VERTICAL_PADDING);
}

const noEasingCrossHalfSize = Math.min(SVG_HEIGHT, SVG_WIDTH) * 0.4;
const svgCenter = {
    x: SVG_WIDTH / 2,
    y: SVG_HEIGHT / 2,
};

const NoEasingIcon = () => {
    return <svg
        height={ SVG_HEIGHT }
        width={ SVG_WIDTH }
    >
        <line
            x1={ svgCenter.x - noEasingCrossHalfSize }
            y1={ svgCenter.y - noEasingCrossHalfSize }
            x2={ svgCenter.x + noEasingCrossHalfSize }
            y2={ svgCenter.y + noEasingCrossHalfSize }
            stroke={ 'black' }
        />
        <line
            x1={ svgCenter.x - noEasingCrossHalfSize }
            y1={ svgCenter.y + noEasingCrossHalfSize }
            x2={ svgCenter.x + noEasingCrossHalfSize }
            y2={ svgCenter.y - noEasingCrossHalfSize }
            stroke={ 'black' }
        />
    </svg>;
};

const EasingSvgIcons: Record<Easing, React.SFC>
    = mapObjectValues(AllEasings, (easingFunction) => {
    return () => {
        const yPositionValues: string[] = [String(SVG_HEIGHT - SVG_VERTICAL_PADDING)];

        for (let i = 0; i < SVG_WIDTH; i++) {
            const progress = (i + 1) / SVG_WIDTH;
            const value = easingFunction(progress);
            const yPosition = String(valueToYPosition(value));

            yPositionValues.push(yPosition);
        }

        return <svg
            height={ SVG_HEIGHT }
            width={ SVG_WIDTH }
        >
            {
                yPositionValues.map((yPositionValue, i) => {
                    return <line
                        key={ i }
                        x1={ i }
                        y1={
                            i === 0
                                ? String(SVG_HEIGHT - SVG_VERTICAL_PADDING)
                                : yPositionValues[i - 1]
                        }
                        x2={ i + 1 }
                        y2={ yPositionValues[i] }
                        stroke={ 'black' }
                    />;
                })
            }
        </svg>;
    };
});

export function getIconByEasing(easing: Easing | undefined): React.SFC {
    if (easing === undefined) {
        return NoEasingIcon;
    } else {
        return EasingSvgIcons[easing];
    }
}
