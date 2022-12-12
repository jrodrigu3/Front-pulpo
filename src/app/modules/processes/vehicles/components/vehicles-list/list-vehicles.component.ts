import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { EIconType } from 'src/app/core/enum/iconType.enum';
import { EModalMessage } from 'src/app/core/enum/modalMessage.enum';
import { ObjPage, pageDefault } from 'src/app/core/interfaces/base/objPage.interface';
import { SwalAlert } from 'src/app/core/interfaces/generales/swalAltert.interface';
import { Vehicle } from 'src/app/core/interfaces/processes/vehicle.interface';
import { SwalUtils } from 'src/app/core/utils/swal-util';
import { homeActions } from 'src/app/state/actions';
import { HomePageState, selectVehicles } from 'src/app/state/reducers/home.reducers';
import { VehicleService } from '../../services/vehicles.service';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})
export class ListVehiclesComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['marca', 'modelo', 'fechaIngreso', 'estado', 'actions'];

  dataSource = new MatTableDataSource<Vehicle>([]);


  private _vehicleService = inject(VehicleService);
  private _router = inject(Router);
  private route = inject(ActivatedRoute);

  private unsubcribe$ = new Subject<void>();
  objPage: ObjPage = pageDefault;
  isLoading = false;

  form = new FormGroup({
    filtro: new FormControl('')
  });

  vehicles$: Observable<Vehicle[]> | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private store: Store<HomePageState>) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubcribe$)).subscribe((query) => {
      this.objPage.param = query['param'] || '';
      this.objPage.sizeTable = query['limit'] ? query['limit'] : this.objPage.sizeTable;
      this.objPage.pageNumber = query['page'] ? query['page'] : this.objPage.pageNumber;
      this.getAllVehicles();
    });
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  getAllVehicles(filtro: string = ""): void {
    this.isLoading = true;
    this.vehicles$ = this.store.select(selectVehicles).pipe(map(data => {
      this.dataSource = new MatTableDataSource<Vehicle>(data);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
      return data;
    }
    ));;
    this.store.dispatch(homeActions.vehicleRequested({ criteria: filtro }));
  }

  confirmSelectDelete(id: number) {
    const title = EModalMessage.deleteConfirmation;
    SwalUtils.getTemplateQuention(title).then((result: SwalAlert) => {
      if (result.value) {
        this.deleteVehicle(id);
      }
    });
  }

  deleteVehicle(id: number): void {
    this._vehicleService.deleteVehicle(id).pipe(takeUntil(this.unsubcribe$)).subscribe((data: Vehicle) => {
      if (!!data) {
        SwalUtils.timeModal(EModalMessage.deleted, EIconType.success);
        this.getAllVehicles();
      } else {
        SwalUtils.timeModal(EModalMessage.error, EIconType.error);
      }
    });;
  }

  editVehicle(id: number): void {
    this._router.navigate([`/home/vehicles/edit/${id}`], { queryParams: this.getQueryParams() });
  }

  pageEvent(pageIndex: PageEvent) {
    this.objPage.pageNumber = pageIndex.pageIndex;
    this.objPage.sizeTable = this.paginator.pageSize;
    this.getAllVehicles();
  }

  getQueryParams() {
    return {
      ...(this.objPage.param) && { param: this.objPage.param },
      ...(this.objPage.sizeTable) && { limit: this.objPage.sizeTable },
      ...(this.objPage.pageNumber) && { page: this.objPage.pageNumber },
    };
  }

  searchUsingFilter() {
    const { filtro } = this.form.value;
    this.getAllVehicles(filtro || "");
  }


}
