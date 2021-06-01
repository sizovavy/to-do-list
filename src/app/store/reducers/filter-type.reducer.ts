import { createReducer, on } from '@ngrx/store';
import { ChangeFilterType } from '../actions/filter-type.action';
import { initialFilterTypeState } from '../state/filter-type.state';

export const filterTypeReducer = createReducer(
    initialFilterTypeState,
    on(ChangeFilterType, (_state, { filterType } ) => ({ filterType })),
);