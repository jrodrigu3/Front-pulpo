import { createAction, props } from "@ngrx/store";
import { Vehicle } from "src/app/core/interfaces/processes/vehicle.interface";

export const vehicleRequested = createAction("Vehicles Requested", props<{ criteria: string }>());
export const vehicleSucced = createAction("Vehicles Requested Succed", props<{ vehicle: Vehicle[] }>());
export const vehicleFailed = createAction("Vehicles Requested Failed", props<{ error: string }>());