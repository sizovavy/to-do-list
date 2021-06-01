import { AppState } from '../state/app.state';

export const filterTypeSelector = (state: AppState) => state.filterTypeState.filterType;
