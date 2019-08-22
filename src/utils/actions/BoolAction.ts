import { Action } from 'redux';

// Actions
interface TrueAction<A> extends Action<A> {
  kind: 'true'
}

interface FalseAction<A> extends Action<A> {
  kind: 'false'
}

interface ToggleAction<A> extends Action<A> {
  kind: 'toggle'
}

export type BoolAction<A = any> = TrueAction<A> | FalseAction<A> | ToggleAction<A>;
type Kind = BoolAction['kind']

// Creators
type Names = { [name in Kind]: string };
const defaultNames: Names = { true: 'true', false: 'false', toggle: 'toggle' };

export function boolActionCreator<A>(type: A, names: Partial<Names> = {}) {
  const n = { ...defaultNames, ...names };

  return {
    [n.true]:   (): TrueAction<typeof type> => ({ type, kind: 'true' }),
    [n.false]:  (): FalseAction<typeof type> => ({ type, kind: 'false' }),
    [n.toggle]: (): ToggleAction<typeof type> => ({ type, kind: 'toggle' })
  }
}

// Reducer
export function boolReducer(state: boolean, action: BoolAction): boolean {
  switch (action.kind) {
    case 'true': return true;
    case 'false': return false;
    case 'toggle': return !state;
    default: return state;
  }
}
