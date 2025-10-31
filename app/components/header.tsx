"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [usuarioLogueado, setUsuarioLogueado] = useState<any>(null);
  const [cantidadCarrito, setCantidadCarrito] = useState<number>(0);

  // Cargar usuario logueado y calcular cantidad del carrito
  useEffect(() => {
    const user = localStorage.getItem("usuarioLogueado");
    if (user) {
      const usuario = JSON.parse(user);
      setUsuarioLogueado(usuario);

      // Sumar cantidades del carrito
      const total = usuario.carrito?.reduce(
        (acc: number, item: any) => acc + item.cantidad,
        0
      );
      setCantidadCarrito(total || 0);
    } else {
      setUsuarioLogueado(null);
      setCantidadCarrito(0);
    }
  }, []);

  const handleLogout = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (!confirmar) return;

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
