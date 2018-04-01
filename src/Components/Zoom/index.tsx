import * as cx from 'classnames';
import { ActionZoomIn, ActionZoomOut } from 'material-ui/svg-icons';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Action } from 'redux-act';
import { zoomInAction, zoomOutAction } from '../../Store/actions';
import { ConstructorState } from '../../Store/State';
import * as c from './index.pcss';

export type ZoomOwnProps = {
    className?: string;
};

// TODO: rename to StoreProps
export type ZoomStateProps = {};

export type ZoomDispatchProps = {
    zoomIn: () => void;
    zoomOut: () => void;
};

export type ZoomProps =
    & ZoomOwnProps
    & ZoomStateProps
    & ZoomDispatchProps;

class ZoomComponent extends React.Component<ZoomProps, {}> {
    public render() {
        const {
            className,
            zoomIn,
            zoomOut,
        } = this.props;

        const containerClassName = cx(className, c.Zoom);

        return <div className={ containerClassName }>
            <ActionZoomIn
                className={ c.Zoom__button }
                onClick={ zoomIn }
            />
            <ActionZoomOut
                className={ cx(c.Zoom__button, c.Zoom__button_zoomOut) }
                onClick={ zoomOut }
            />
        </div>;
    }
}

const mapStateToProps = (state: ConstructorState, {}: ZoomOwnProps): ZoomStateProps => {
    return {};
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action<any>>): ZoomDispatchProps => ({
    zoomIn: () => {
        dispatch(zoomInAction());
    },
    zoomOut: () => {
        dispatch(zoomOutAction());
    },
});

export const Zoom = connect(mapStateToProps, mapDispatchToProps)(ZoomComponent);
