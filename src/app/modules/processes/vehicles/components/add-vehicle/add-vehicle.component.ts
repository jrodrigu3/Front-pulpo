import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EIconType } from 'src/app/core/enum/iconType.enum';
import { EModalMessage } from 'src/app/core/enum/modalMessage.enum';
import { ERoutes } from 'src/app/core/enum/operationType';
import { estadoObjects } from 'src/app/core/enum/rol.enum';
import { IQueryParam } from 'src/app/core/interfaces/generales/query.interface';
import { SwalAlert } from 'src/app/core/interfaces/generales/swalAltert.interface';
import { Vehicle } from 'src/app/core/interfaces/processes/vehicle.interface';
import { SwalUtils } from 'src/app/core/utils/swal-util';
import { VehicleService } from '../../services/vehicles.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit, OnDestroy {

  private _route = inject(ActivatedRoute);
  private _vehicleService = inject(VehicleService);
  private _router = inject(Router);
  isEditActivate: boolean = false;
  private route = inject(ActivatedRoute);
  private unsubcribe$ = new Subject<void>();

  params!: IQueryParam;
  isAdd: boolean = false;
  isEdit: boolean = false;
  idVehicle: number = 0;
  bottonName: string = 'BOTTON.SAVE';
  titleName: string = 'TITLE.CREATE_VEHICLE';
  arrayEstado = estadoObjects;
  isLoading = false;

  form = new FormGroup({
    marca: new FormControl('', Validators.required),
    modelo: new FormControl(0, Validators.required),
    color: new FormControl('', Validators.compose([
      Validators.required
    ])),
    fechaIngreso: new FormControl(new Date(), Validators.required),
    estado: new FormControl("", Validators.min(1)),
  });

  constructor() {
    this.isAdd = this._route.snapshot?.url[0]?.path === ERoutes.add;
    this.isEdit = this._route.snapshot?.url[0]?.path === ERoutes.edit;
    this.idVehicle = +this._route.snapshot?.url[1]?.path || 0;
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubcribe$)).subscribe((params) => {
      this.params = params;
    });
    if (this.isEdit) {
      this.bottonName = 'BOTTON.EDIT'
      this.titleName = 'TITLE.EDIT_VEHICLE';
      this.isEditActivate = true;
      this.form.disable();
      this.searchVehicleId(this.idVehicle);
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  confirmOption(confirm: boolean): void {
    let title = '';
    title = confirm ? EModalMessage.saveConfirmation : EModalMessage.cancelConfirmation;
    SwalUtils.getTemplateQuention(title).then((result: SwalAlert) => {
      if (result.value) {
        confirm ? this.saveEditVehicle() : this.cancel();
      }
    });
  }

  saveEditVehicle() {
    const { marca, modelo, color, fechaIngreso, estado } = this.form.value;
    const forSave: Vehicle = {
      modelo: +modelo!,
      marca: marca!,
      color: color!,
      fechaIngreso: fechaIngreso!,
      estado: estado!,
    }
    if (this.isAdd) {
      this._vehicleService.saveVehicle(forSave).pipe(takeUntil(this.unsubcribe$)).subscribe((data: Vehicle) => {
        if (!!data) {
          SwalUtils.timeModal(EModalMessage.saved, EIconType.success);
          this._router.navigate([`/home/vehicles`]);
        } else {
          SwalUtils.timeModal(EModalMessage.error, EIconType.error);
        }
      });;
    } else if (this.isEdit) {
      this._vehicleService.editVehicle(forSave, this.idVehicle).pipe(takeUntil(this.unsubcribe$)).subscribe((data: Vehicle) => {
        if (!!data) {
          SwalUtils.timeModal(EModalMessage.edited, EIconType.success);
          this._router.navigate([`/home/vehicles`]);
        } else {
          SwalUtils.timeModal(EModalMessage.error, EIconType.error);
        }
      });;
    }
  }

  searchVehicleId(id: number): void {
    this._vehicleService.getOneVehicle(id).pipe(takeUntil(this.unsubcribe$)).subscribe((data: Vehicle) => {
      if (!!data) this.form.patchValue(data);
    });
  }

  cancel(): void {
    this._router.navigate([`/home/vehicles`], { queryParams: this.params });
  }

  editActivate(): void {
    this.isEditActivate = !this.isEditActivate;
    this.form.enable();
  }

}
