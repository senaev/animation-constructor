import { MenuItem, SelectField } from 'material-ui';
import * as React from 'react';
import { AVAILABLE_RELATIONS } from '../../Relation/AVAILABLE_RELATIONS';
import { Relation } from '../../Relation/Relation';

export type RelationInputProps = {
    relation: Relation;
    onChange: (relation: Relation) => void;
};

export class RelationInput extends React.Component<RelationInputProps, {}> {
    public render() {
        const { relation, onChange } = this.props;

        return <SelectField
            value={ relation }
            onChange={ (e, i, value) => {
                onChange(value);
            } }
        >
            {
                AVAILABLE_RELATIONS.map((relationArray, key) => {
                    return <MenuItem
                        value={ relationArray }
                        key={ key }
                        primaryText={ `${relationArray[0]} / ${relationArray[1]}` }
                    />;
                })
            }
        </SelectField>;
    }
}
