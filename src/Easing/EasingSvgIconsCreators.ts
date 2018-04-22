import { mapObjectValues } from '../utils/mapObjectValues';
import { AllEasings } from './AllEasings';
import { Easing } from './Easing';

const SVG_SIZE = 16;
const SVG_PADDING = 1;
const svgLineSize = SVG_SIZE - SVG_PADDING * 2;

const svgSizeString = String(SVG_SIZE);

function valueToYPosition(value: number): string {
    return String((SVG_SIZE - value * SVG_SIZE) * (svgLineSize / SVG_SIZE) + SVG_PADDING);
}

export const EasingSvgIconsCreators: Record<Easing, (document: Document) => SVGSVGElement>
    = mapObjectValues(AllEasings, (easingFunction) => {
    return (document: Document) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        svg.setAttribute('width', svgSizeString);
        svg.setAttribute('height', svgSizeString);
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');

        let previousValue = 0;
        for (let i = 0; i < SVG_SIZE; i++) {
            const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');

            const progress = (i + 1) / SVG_SIZE;
            const value = easingFunction(progress);

            lineElement.setAttribute('x1', String(i));
            lineElement.setAttribute('y1', String(valueToYPosition(previousValue)));
            lineElement.setAttribute('x2', String(i + 1));
            lineElement.setAttribute('y2', String(valueToYPosition(value)));
            lineElement.setAttribute('stroke', 'black');

            svg.appendChild(lineElement);

            previousValue = value;
        }

        return svg;
    };
});
