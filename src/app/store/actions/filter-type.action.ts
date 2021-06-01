import { createAction, props } from '@ngrx/store';
import { filterTypes } from 'src/app/filter-types.enum';

export const ChangeFilterType = createAction(
    '[ToDoItemsFilterType] Change filter type',
    props<{filterType: filterTypes}>()
);