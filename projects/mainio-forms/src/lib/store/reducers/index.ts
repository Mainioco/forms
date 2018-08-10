import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  MemoizedSelector
} from "@ngrx/store";
import * as lifecycle from "./form-livecycle-reducers";
import * as library from "./library-reducers";

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);

    return reducer(state, action);
  };
}

export interface State {
  library: library.State;
  lifecycle: lifecycle.State;
}

export const reducers: ActionReducerMap<State> = {
  library: library.reducer,
  lifecycle: lifecycle.reducer
};

/**
   * Layout Reducers
   *   /**
   * By default, @ngrx/store uses combineReducers with the reducer map to compose
   * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
   * that will be composed to form the root meta-reducer.
   
  export const metaReducers: MetaReducer<State>[] = !state.production
  ? [logger, storeFreeze]
  : [];
   
export const getLibraryState = createFeatureSelector<library.State>("library"):MemoizedSelector<object,State>;
export const getLifecycleState = createFeatureSelector<lifecycle.State>(
  "lifecycle"
);

export const rootState = createFeatureSelector<State>("mainioForms");

export const selectLibraryState = createSelector(
  rootState,
  (state: State) => state.library
);
export const selectLifecycleStatusState = createSelector(
  rootState,
  (state: State) => state.lifecycle
);

export const getForm = createSelector(
  selectLifecycleStatusState,
  lifecycle.getForm
);
export const getForms = createSelector(
  selectLifecycleStatusState,
  lifecycle.getForms
);
export const getDebugMode = createSelector(
  selectLibraryState,
  library.debugMode
);
*/
