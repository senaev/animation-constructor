import * as React from 'react';
import { connect } from 'react-redux';
import { ConstructorState } from '../../Store/State';
import { TimeLines } from '../TimeLines';
import { BoardFields } from '../BoardFields';
import { BoardPalette } from '../BoardPalette';
import { BoardPreview } from '../BoardPreview';
import * as c from './index.pcss';

export type BoardProps = Pick<ConstructorState,
    | 'editParams'>;

class BoardComponent extends React.Component<BoardProps, {}> {
    public render() {
        const { editParams } = this.props;

        return <div>
            {
                editParams === undefined
                    ? <BoardPalette/>
                    : <BoardFields/>
            }
            <BoardPreview/>
            <div className={ c.Board__animationControlsContainer }>
                <div className={ c.Board__animationControlsContainerPadding }>
                    <TimeLines/>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = ({
                             editParams,
                             animationScript,
                         }: ConstructorState): BoardProps => {
    return {
        editParams,
    };
};

export const Board = connect(mapStateToProps)(BoardComponent);
