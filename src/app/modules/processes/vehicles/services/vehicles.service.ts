import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';
import { Vehicle, VehiclesList } from 'src/app/core/interfaces/processes/vehicle.interface';
import { HttpBaseService } from 'src/app/core/services/base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private _httpBase = inject(HttpBaseService);
  private _router = inject(Router);
  private http = inject(HttpClient);

  urlService: string = "http://localhost:3000/vehicles";

  private itemVehicle$: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  public dataVehicle$: Observable<Vehicle[]> = this.itemVehicle$.asObservable();

  constructor() { }

  getVehicles(filter: string = ""): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.urlService}?filter=${filter}`).pipe(take(1), map(response => {
      return response;
    }));
  }

  getOneVehicle(idVehicle: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.urlService}/${idVehicle}`);
  }

  saveVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.urlService}`, vehicle);
  }

  editVehicle(vehicle: Vehicle, idVehicle: number): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.urlService}/${idVehicle}`, vehicle);
  }

  deleteVehicle(idVehicle: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.urlService}/${idVehicle}`);
  }

  routerNavigate(ruta: string): void {
    this._router.navigate([ruta]);
  }
}

