
export const BlockFieldUnits = {
    x: 'percent',
    y: 'percent',
    height: 'percentZeroToInfinity',
    width: 'percentZeroToInfinity',
    rotation: 'degree',
    existence: 'boolean',
} as const;
export type BlockFieldUnits = typeof BlockFieldUnits;
