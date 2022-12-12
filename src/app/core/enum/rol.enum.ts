
export const ERol = {
    Client: { id: 1, name: 'Activo' },
    User: { id: 2, name: 'Inactivo' },
}

export interface Role {
    id: number;
    name: string;
}

export enum Roles {
    prueba = 0,
    prueba2 = 1,
}

export const estadoObjects: Role[] = [{
    id: ERol.Client.id,
    name: ERol.Client.name,
}, {
    id: ERol.User.id,
    name: ERol.User.name,
}];
