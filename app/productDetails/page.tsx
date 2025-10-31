"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import { Product } from "../components/types";
import Image from "next/image";

interface User {
  username: string;
  carrito: {
    productId: number;
    quantity: number;
  }[];
}

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [producto, setProducto] = useState<Product | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState<User | null>(null);

  // --- Carga del producto ---
  useEffect(() => {
    if (!idParam || isNaN(Number(idParam))) {
      setError("ID de producto inválido");
      setCargando(false);
      return;
    }

    const id = Number(idParam);

    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const encontrado = data.find((p) => p.id === id);
        if (!encontrado) setError("Producto no encontrado");
        else setProducto(encontrado);

        setCargando(false);
      });
  }, [idParam]);

  // --- Carga del usuario logueado ---
  useEffect(() => {
    const userLoggedJSON = localStorage.getItem("usuarioLogueado");
    if (userLoggedJSON) {
      setUsuario(JSON.parse(userLoggedJSON));
    }
  }, []);

  // --- Función para agregar al carrito ---
  const agregarAlCarrito = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      return;
    }

    const carritoActual = usuario.carrito || [];
    const index = carritoActual.findIndex(
      (item) => item.productId === producto?.id
    );

    if (index >= 0) {
      // Si ya existe el producto, aumenta la cantidad
      carritoActual[index].quantity += 1;
    } else {
      // Si no existe, lo agrega
      carritoActual.push({ productId: producto!.id, quantity: 1 });
    }

    const nuevoUsuario = { ...usuario, carrito: carritoActual };
    setUsuario(nuevoUsuario);
    localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));

    // Actualiza la lista de usuarios en localStorage
    const usuariosJSON = localStorage.getItem("usuarios");
    let usuarios: User[] = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    usuarios = usuarios.map((u) =>
      u.username === nuevoUsuario.username ? nuevoUsuario : u
    );
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Producto agregado al carrito");
  };

  if (cargando) return <p className="text-center mt-4">Cargando producto...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;
  if (!producto)
    return <p className="text-center mt-4">Producto no encontrado</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 container mt-4">
        <div className="row">
          {/* Imagen centrada */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <Image
              src={producto.img}
              alt={producto.name}
              className="img-fluid object-fit-contain"
            />
          </div>

          {/* Datos del producto */}
          <div className="col-md-6">
            <h2>{producto.name}</h2>
            <p className="fw-bold">{producto.price}</p>
            <p>{producto.descripcion}</p>
            <p className="text-muted">Categoría: {producto.categoria}</p>
            <button className="btn btn-primary mt-3" onClick={agregarAlCarrito}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
