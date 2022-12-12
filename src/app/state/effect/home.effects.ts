import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, Observable, of } from "rxjs";
import { Vehicle } from "src/app/core/interfaces/processes/vehicle.interface";
import { VehicleService } from "src/app/modules/processes/vehicles/services/vehicles.service";
import { homeActions } from "../actions";
import { RootState } from "../reducers";

@Injectable()
export class HomeEffects {

  public constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private service: VehicleService
  ) { }

  public vehicleRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.vehicleRequested),
      exhaustMap(action => {
        const obSer: Observable<Vehicle[]> = this.service.getVehicles(action.criteria);
        return obSer.pipe(
          map(vehicle => {
            return homeActions.vehicleSucced({ vehicle });
          }),
          catchError((error: { message: string }) => of(homeActions.vehicleFailed({ error: error.message })))
        );
      })
    )
  );
}
