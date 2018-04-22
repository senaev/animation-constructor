import { getObjectKeys } from '../utils/getObjectKeys';
import { Easing } from './Easing';
import { EasingName } from './EasingName';

export const AllEasingNames: EasingName[] = getObjectKeys(Easing);
