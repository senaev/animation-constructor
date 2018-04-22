import { getObjectKeys } from '../utils/getObjectKeys';
import { Easing } from './Easing';

export const AllEasingNames: Easing[] = getObjectKeys(Easing) as Easing[];
