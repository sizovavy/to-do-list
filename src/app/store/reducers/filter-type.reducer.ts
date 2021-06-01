import { createReducer, on } from '@ngrx/store';
import { changeFilterType } from '../actions/filter-type.action';
import { initialFilterTypeState } from '../state/filter-type.state';

export const filterTypeReducer = createReducer(
    initialFilterTypeState,
    on(changeFilterType, (_state, { filterType }) => ({ filterType })),
);
