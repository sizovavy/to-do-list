import { initialFilterType } from 'src/app/constants';
import { filterTypes } from 'src/app/filter-types.enum';

export interface FilterTypeState {
    filterType: filterTypes;
}

export const initialFilterTypeState: FilterTypeState = {
    filterType: initialFilterType,
}