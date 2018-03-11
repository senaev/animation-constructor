import { Dialog, RaisedButton } from 'material-ui';
import { lightBlack } from 'material-ui/styles/colors';
import { ContentSave } from 'material-ui/svg-icons';
import * as React from 'react';
import { ALL_FIELDS } from '../../../Fields/ALL_FIELDS';
import { FieldClass } from '../../../Fields/Field';
import { Unit } from '../../../Unit/Unit';
import { UnitTypes } from '../../../Unit/UnitTypes';
import { TimeLinePointChangeableParams } from '../TimeLinePoint';

type TimeLinePointChangableProps<T extends Unit> =
    & TimeLinePointChangeableParams<T>
    & {
    isDialogOpen: boolean;
    requestDialogOpened: (opened: boolean) => void;
};

export class TimeLinePointChangable<T extends Unit> extends React.Component<TimeLinePointChangableProps<T>, {}> {
    public render() {
        const {
            unit,
            title,
            value,
            onChange,
            isDialogOpen,
        } = this.props;

        const UnitFieldClass: FieldClass<any> = ALL_FIELDS[unit];
        return <div onClick={ this.openDialog }>
            <UnitFieldClass.Preview value={ value }/>
            <Dialog
                title={ title }
                actions={ [
                    <RaisedButton
                        backgroundColor={ '#a4c639' }
                        icon={ <ContentSave color={ lightBlack }/> }
                        onClick={ this.closeDialog }
                    />,
                ] }
                modal={ false }
                open={ isDialogOpen }
                onRequestClose={ this.closeDialog }
            >
                <UnitFieldClass
                    value={value}
                    onChange={(nextValue: UnitTypes[T]) => {
                        onChange(nextValue);
                    }}
                />
            </Dialog>
        </div>;
    }

    private openDialog = () => {
        this.props.requestDialogOpened(true);
    }

    private closeDialog = () => {
        this.props.requestDialogOpened(false);
    }
}
