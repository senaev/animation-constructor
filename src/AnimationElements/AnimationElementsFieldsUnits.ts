export const AnimationElementsFieldsUnits = {
    Rectangle: {
        // cast types to have a particular type for each property
        backgroundColor: 'color',
        borderRadius: 'percent',
    },
} as const;
export type AnimationElementsFieldsUnits = typeof AnimationElementsFieldsUnits;
