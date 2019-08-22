import { Action } from 'redux';

// Types
export default interface SetAction<A extends string,T extends any> extends Action<A> {
  readonly value: T
}

// Conditional types
type ExtractAction<As extends Action,A extends As['type']> = Extract<As,SetAction<A,any>>;

export type SetActionValue<As extends Action,A extends As['type']> = ExtractAction<As,A>['value'];
export type SetActionCreator<As extends Action,A extends As['type']> = (value: SetActionValue<As,A>) => SetAction<A,SetActionValue<As,A>>;

// Utils
export function setActionCreator<As extends Action,A extends As['type']>(type: A): SetActionCreator<As,A> {
  return (value: SetActionValue<As,A>) => ({ type, value });
}
