import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { FilterTypeState } from '../state/filter-type.state';

const filterTypeState = (state: AppState) => state.filterType;

export const selectFilterType = createSelector(filterTypeState,(state: FilterTypeState)=> state.filterType)