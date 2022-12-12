import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Vehicle } from "src/app/core/interfaces/processes/vehicle.interface";
import { vehicleSucced } from "../actions/home.actions";
export interface HomePageState {
    vehicle: Vehicle[]
}
export const initialState: HomePageState = {
    vehicle: []
};

const homePageReducers = createReducer(initialState, on(vehicleSucced, (state, { vehicle }) => ({
    ...state, vehicle
})));

export const reducer = (state: HomePageState | undefined, action: Action): HomePageState =>
    homePageReducers(state, action);

export const selectHomePageState = createFeatureSelector<HomePageState>("homePage");
export const selectVehicles = createSelector(selectHomePageState, (state) => state.vehicle);