import * as React from 'react';
import { AllEasingNames } from '../../../Easing/AllEasingNames';
import { Easing } from '../../../Easing/Easing';
import { EasingSvgIconsCreators } from '../../../Easing/EasingSvgIconsCreators';
import { mapObjectValues } from '../../../utils/mapObjectValues';
import * as c from './index.pcss';

type TimeLinePointEasingProps = {};

export class TimeLinePointEasing extends React.Component<TimeLinePointEasingProps, {}> {
    private containerElement?: HTMLDivElement | null;

    private readonly iconSet: Record<Easing, SVGSVGElement> = mapObjectValues(EasingSvgIconsCreators, (createSvg) => {
        return createSvg(document);
    });

    public render() {
        return <div className={ c.TimeLinePointEasing }>
            Easing:
            <div
                className={ c.TimeLinePointEasing__preview }
                ref={ (element) => {
                    this.containerElement = element;
                } }
            />
        </div>;
    }

    public componentDidMount() {
        const {
            containerElement,
        } = this;

        if (!containerElement) {
            throw new Error('containerElement is not set');
        }

        AllEasingNames.forEach((easingName) => {
            containerElement.appendChild(this.iconSet[easingName]);
        });
    }
}
