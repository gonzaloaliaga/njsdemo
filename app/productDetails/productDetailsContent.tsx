"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "../components/types";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";

interface User {
  username: string;
  carrito: {
    productId: number;
    quantity: number;
  }[];
}

export default function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [producto, setProducto] = useState<Product | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState<User | null>(null);

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

  useEffect(() => {
    const userLoggedJSON = localStorage.getItem("usuarioLogueado");
    if (userLoggedJSON) setUsuario(JSON.parse(userLoggedJSON));
  }, []);

  const agregarAlCarrito = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      return;
    }

    const carritoActual = usuario.carrito || [];
    const index = carritoActual.findIndex(
      (item) => item.productId === producto?.id
    );

    if (index >= 0) carritoActual[index].quantity += 1;
    else carritoActual.push({ productId: producto!.id, quantity: 1 });

    const nuevoUsuario = { ...usuario, carrito: carritoActual };
    setUsuario(nuevoUsuario);
    localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));

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
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <Image
              src={producto.img}
              alt={producto.name}
              width={500}
              height={500}
              className="img-fluid rounded"
              style={{ objectFit: "contain" }}
            />
          </div>
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
