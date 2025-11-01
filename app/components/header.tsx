"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Usuario } from "./types";

export default function Header() {
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null);
  const [cantidadCarrito, setCantidadCarrito] = useState<number>(0);

  // Función para actualizar desde localStorage
  const updateFromStorage = () => {
    const userData = localStorage.getItem("usuarioLogueado");

    if (userData) {
      try {
        const usuario: Usuario = JSON.parse(userData);
        setUsuarioLogueado(usuario);

        // Calcular cantidad total de productos en el carrito
        const total = (usuario.carrito ?? []).reduce(
          (acc, item) => acc + (item.cantidad ?? 0),
          0
        );
        setCantidadCarrito(total);
      } catch {
        console.error("Error al parsear usuarioLogueado");
        setUsuarioLogueado(null);
        setCantidadCarrito(0);
      }
    } else {
      setUsuarioLogueado(null);
      setCantidadCarrito(0);
    }
  };

  useEffect(() => {
    updateFromStorage();

    // Escuchar cambios en localStorage o eventos personalizados
    const onStorage = (e: StorageEvent) => {
      if (e.key === "usuarioLogueado" || e.key === null) updateFromStorage();
    };

    const onCarritoUpdated = () => updateFromStorage();

    window.addEventListener("storage", onStorage);
    window.addEventListener("carritoUpdated", onCarritoUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("carritoUpdated", onCarritoUpdated);
    };
  }, []);

  const handleLogout = () => {
    if (!window.confirm("¿Estás seguro de que quieres cerrar sesión?")) return;

    localStorage.removeItem("usuarioLogueado");
    setUsuarioLogueado(null);
    setCantidadCarrito(0);
    alert("Has cerrado sesión.");
  };

  return (
    <header>
      <nav>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h4 className="m-0">ComiCommerce</h4>

          <div className="d-flex align-items-center gap-2">
            {usuarioLogueado ? (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger px-3"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link href="/login" className="btn btn-outline-danger px-3">
                Iniciar sesión
              </Link>
            )}

            <Link href="/shoppingCart" className="btn btn-danger px-3">
              {cantidadCarrito > 0 ? `Carrito (${cantidadCarrito})` : "Carrito"}
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 bg-danger text-white py-2">
          <Link href="/" className="text-white text-decoration-none">
            Home
          </Link>
          <p className="m-0">---</p>
          <Link href="/catalog" className="text-white text-decoration-none">
            Productos
          </Link>
          <p className="m-0">---</p>
          <Link href="/about" className="text-white text-decoration-none">
            Nosotros
          </Link>
          <p className="m-0">---</p>
          <Link href="/blogs" className="text-white text-decoration-none">
            Blogs
          </Link>
          <p className="m-0">---</p>
          <Link href="/contact" className="text-white text-decoration-none">
            Contacto
          </Link>
        </div>
      </nav>
    </header>
  );
}
