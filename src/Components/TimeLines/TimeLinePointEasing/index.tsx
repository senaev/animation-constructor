import * as cx from 'classnames';
import * as React from 'react';
import { AllEasingNames } from '../../../Easing/AllEasingNames';
import { Easing } from '../../../Easing/Easing';
import { getIconByEasing } from '../../../Easing/EasingSvgIcons';
import * as c from './index.pcss';

const pointerPreviewClassName = cx(c.TimeLinePointEasing__preview, c.TimeLinePointEasing__preview_pointer);

export type TimeLinePointEasingParams = {
    easing: Easing | undefined;
};
export type TimeLinePointEasingCalbacks = {
    onChange: (easing: Easing | undefined) => void;
};
export type TimeLinePointEasingProps =
    & TimeLinePointEasingParams
    & TimeLinePointEasingCalbacks;

export type TimeLinePointEasingState = {
    isHovered: boolean;
};

export class TimeLinePointEasing extends React.Component<TimeLinePointEasingProps, TimeLinePointEasingState> {
    constructor(props: TimeLinePointEasingProps) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    public render() {
        const {
            easing,
        } = this.props;

        const {
            isHovered,
        } = this.state;

        const CurrentEasingIcon = getIconByEasing(easing);

        return <div
            className={ c.TimeLinePointEasing }
            onMouseEnter={ this.onMouseOver }
            onMouseLeave={ this.onMouseOut }
        >
            Easing:
            <div className={ c.TimeLinePointEasing__previewsContainer }>
                <div className={ c.TimeLinePointEasing__preview }>
                    <CurrentEasingIcon/>
                </div>
                {
                    isHovered
                        ? <div className={ c.TimeLinePointEasing__otherPreviews }>
                            {
                                [...AllEasingNames, undefined]
                                    .filter((easingName) => easingName !== easing)
                                    .map((easingName, i) => {
                                        const Icon = getIconByEasing(easingName);

                                        return <div
                                            key={ i }
                                            className={ pointerPreviewClassName }
                                            onClick={ () => this.props.onChange(easingName) }
                                        >
                                            <Icon/>
                                        </div>;
                                    })
                            }
                        </div>
                        : null
                }
            </div>
        </div>;
    }

    private onMouseOver = () => {
        this.setState({
            isHovered: true,
        });
    }

    private onMouseOut = () => {
        this.setState({
            isHovered: false,
        });
    }
}
