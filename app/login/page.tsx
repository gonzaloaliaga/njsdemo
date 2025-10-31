"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

import { Usuario } from "../components/types";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!correo || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );
    // Buscar usuario por correo
    const usuarioPorCorreo = usuarios.find((u: Usuario) => u.correo === correo);
    if (!usuarioPorCorreo) {
      setError("El correo no existe. Por favor regístrate primero.");
      return;
    }
    // Validar contraseña
    if (usuarioPorCorreo.password !== password) {
      setError("Contraseña incorrecta. Intenta nuevamente.");
      return;
    }
    // Login exitoso
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioPorCorreo));
    setError(""); // limpiar errores
    router.push("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 container mt-4 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="mb-4 fw-bold" style={{ fontFamily: "Georgia, serif" }}>
            Iniciar sesión
          </h2>

          {/* Inputs */}
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />

          {/* Mensaje de error */}
          {error && <p className="text-danger mb-3">{error}</p>}

          {/* Botón de login */}
          <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
            Iniciar sesión
          </button>

          {/* Link a registro */}
          <div className="text-center">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="text-primary text-decoration-none"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
