import * as React from 'react';
import { connect } from 'react-redux';
import { scaleToStyles } from '../../Scale/utils/scaleToStyles';
import { ConstructorState } from '../../Store/State';
import { FillSizeBlock } from '../FillSizeBlock';
import * as c from './index.pcss';

export type ScaleViewProps = Pick<ConstructorState,
    | 'scale'>;

class ScaleViewComponent extends React.Component<ScaleViewProps, {}> {

    public render() {
        const {
            scale,
        } = this.props;

        return <FillSizeBlock
            relationX={ 1 }
            relationY={ 1 }
            className={ c.ScaleView__fillSizeBlock }
        >
            <div
                className={ c.ScaleView__scaleDiv }
                style={ scaleToStyles(scale) }
            >
                { this.props.children }
            </div>
        </FillSizeBlock>;
    }
}


const mapStateToProps = ({
                             scale,
                         }: ConstructorState): ScaleViewProps => ({
    scale,
});

export const ScaleView = connect(mapStateToProps)(ScaleViewComponent);
