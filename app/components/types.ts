export interface CarritoItem {
  id: number;
  cantidad: number;
}

export interface Usuario {
  nombre: string;
  correo: string;
  password: string;
  telefono?: string;
  region: string;
  comuna: string;
  carrito: CarritoItem[];
}

export interface Product {
  id: number;
  img: string;
  name: string;
  price: string;
  categoria: string;
  descripcion: string;
}
