import { createAction, EmptyActionCreator, SimpleActionCreator } from 'redux-act';
import { mapObjectValues } from '../../../utils/mapObjectValues';

export function createActions<T extends Record<string, any>>(typesObject: T): {
    [key in keyof T]: T[key] extends void ? EmptyActionCreator : SimpleActionCreator<T[key]>
} {
    return mapObjectValues(typesObject, (u, actionName) => createAction(actionName) as any);
}
