"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import { comunasPorRegion } from "../components/comunas";
import { Usuario } from "../components/types";

export default function RegisterPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [correoConfirm, setCorreoConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [listaComunas, setListaComunas] = useState<string[]>([]);
  const [error, setError] = useState("");

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const datos = localStorage.getItem("usuarios");
    if (datos) {
      setUsuarios(JSON.parse(datos));
    }
  }, []);

  // actualizar comunas al cambiar la región
  useEffect(() => {
    if (region && comunasPorRegion[region]) {
      setListaComunas(comunasPorRegion[region]);
    } else {
      setListaComunas([]);
    }
    setComuna(""); // resetear comuna al cambiar región
  }, [region]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // validaciones
    if (nombre.length < 3)
      return setError("El nombre debe tener al menos 3 caracteres.");
    if (!correo || !correoConfirm)
      return setError("Debes ingresar y confirmar el correo.");
    if (correo !== correoConfirm)
      return setError("Los correos deben coincidir.");
    if (usuarios.some((u) => u.correo === correo))
      return setError("El correo ya está registrado.");
    const dominiosPermitidos = ["@gmail.com", "@duoc.cl", "@profesor.duoc.cl"];
    if (!dominiosPermitidos.some((d) => correo.endsWith(d)))
      return setError("Dominio de correo inválido.");
    if (password.length < 5 || password.length > 10)
      return setError("La contraseña debe tener entre 5 y 10 caracteres.");
    if (password !== passwordConfirm)
      return setError("Las contraseñas deben coincidir.");
    if (!region || !comuna)
      return setError("Debes seleccionar región y comuna.");

    const nuevoUsuario: Usuario = {
      nombre,
      correo,
      password,
      telefono,
      region,
      comuna,
      carrito: [],
    };

    const nuevosUsuarios = [...usuarios, nuevoUsuario];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));

    alert("Registro exitoso. Gracias por crear tu cuenta.");
    router.push("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 container mt-4 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h2 className="mb-4 fw-bold" style={{ fontFamily: "Georgia, serif" }}>
            Registro
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label>Nombre completo</label>
              <input
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Correo</label>
              <input
                className="form-control"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Confirmar correo</label>
              <input
                className="form-control"
                type="email"
                value={correoConfirm}
                onChange={(e) => setCorreoConfirm(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Confirmar contraseña</label>
              <input
                className="form-control"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Teléfono (opcional)</label>
              <input
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex gap-2">
              <div className="flex-grow-1">
                <label>Región</label>
                <select
                  className="form-select"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -- Selecciona una región --
                  </option>
                  {Object.keys(comunasPorRegion).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-grow-1">
                <label>Comuna</label>
                <select
                  className="form-select"
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  required
                  disabled={!listaComunas.length}
                >
                  <option value="" disabled>
                    -- Selecciona una comuna --
                  </option>
                  {listaComunas.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-danger mt-2">{error}</p>}

            <button type="submit" className="btn btn-primary w-100 mt-3">
              REGISTRAR
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
