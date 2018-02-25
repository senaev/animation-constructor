import { Unit } from './Unit';
import { UnitName } from './UNIT_NAMES';

export const UnitTitles: Record<UnitName, string> = {
    [Unit.degree]: 'градусы',
    [Unit.percent]: 'проценты',
    [Unit.pixel]: 'пиксели',
    [Unit.color]: 'цвета',
};
