export interface Vehicle {
    id?: number;
    marca: string;
    modelo: number;
    color: string;
    fechaIngreso: Date;
    estado: string;
}

export interface VehiclesList {
    count: number;
    Vehicles: Vehicle[];
}