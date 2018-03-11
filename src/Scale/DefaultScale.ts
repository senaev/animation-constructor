import { Scale } from './Scale';

const DEFAULT_SCALE_SIZE = 96;
const DEFAULT_SCALE_MARGIN = (100 - DEFAULT_SCALE_SIZE) / 2;

export const DefaultScale: Scale = {
    x: DEFAULT_SCALE_MARGIN,
    y: DEFAULT_SCALE_MARGIN,
    width: DEFAULT_SCALE_SIZE,
    height: DEFAULT_SCALE_SIZE,
};
