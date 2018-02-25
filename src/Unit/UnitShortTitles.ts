import { Unit } from './Unit';
import { UnitName } from './UNIT_NAMES';

export const UnitShortTitles: Record<UnitName, string> = {
    [Unit.degree]:  '°',
    [Unit.percent]: '%',
    [Unit.pixel]: 'px',
    [Unit.color]:  '',
};
