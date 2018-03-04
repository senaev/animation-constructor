import { getObjectKeys } from '../utils/getObjectKeys';
import { ColorPropertyName } from './ColorPropertyName';
import { DefaultColor } from './DefaultColor';

export const ALL_COLOR_PROPERTIES: ColorPropertyName[] = getObjectKeys(DefaultColor);
