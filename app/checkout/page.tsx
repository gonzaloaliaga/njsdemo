"use client";

import { useEffect, useState } from "react";
import { Usuario, Product } from "../components/types";
import Header from "../components/header";
import Footer from "../components/footer";
import { parsePrice, formatPrice } from "../../lib/price";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    metodoPago: "tarjeta",
    cardNumber: "",
    expiry: "",
    cardName: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const userJSON = localStorage.getItem("usuarioLogueado");
    if (!userJSON) {
      alert("Debes iniciar sesión para acceder al checkout");
      router.push("/login");
      return;
    }
    setUsuario(JSON.parse(userJSON));

    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoadingProducts(false));
  }, [router]);

  const getCartDetails = () => {
    if (!usuario || !products.length) return [];
    return (usuario.carrito || []).map((ci: any) => {
      const id = ci.id ?? ci.productId;
      const cantidad = ci.cantidad ?? ci.quantity ?? 0;
      const prod = products.find((p) => p.id === id) || null;
      return { id, cantidad, product: prod };
    });
  };

  const cartDetails = getCartDetails();

  const computeSubtotal = () => {
    return cartDetails.reduce((acc, it) => {
      const price = it.product ? parsePrice(it.product.price) : 0;
      return acc + price * it.cantidad;
    }, 0);
  };

  const computeIVA = () => Math.round(computeSubtotal() * 0.19);
  const computeTotal = () => computeSubtotal() + computeIVA();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Limitar longitudes visibles en inputs donde corresponde
    let v = value;
    if (name === "telefono") v = v.replace(/[^0-9]/g, "").slice(0, 9);
    if (name === "cardNumber") v = v.replace(/[^0-9]/g, "").slice(0, 16);
    if (name === "cvv") v = v.replace(/[^0-9]/g, "").slice(0, 3);
    if (name === "expiry") v = v.replace(/[^0-9/]/g, "").slice(0, 7);

    setFormData((prev) => ({ ...prev, [name]: v }));

    // limpiar error del campo al editar
    setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario || !cartDetails.length) return;

    // Validaciones
    const newErrors: any = {};
    const telefonoOK = /^\d{9}$/.test(formData.telefono);
    if (!telefonoOK)
      newErrors.telefono =
        "Ingrese un teléfono válido de 9 dígitos (ej: 977827552)";

    if (formData.metodoPago === "tarjeta") {
      if (!/^\d{16}$/.test(formData.cardNumber))
        newErrors.cardNumber = "Ingrese 16 dígitos de la tarjeta";
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/.test(formData.expiry))
        newErrors.expiry = "Formato expiración MM/YY o MM/YYYY";
      if (!formData.cardName || formData.cardName.trim().length < 2)
        newErrors.cardName = "Ingrese el nombre del titular";
      if (!/^\d{3}$/.test(formData.cvv))
        newErrors.cvv = "Ingrese el CVV de 3 dígitos";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const orden = {
      id: Date.now(),
      user: usuario.correo,
      items: usuario.carrito,
      total: computeTotal(),
      detallesEnvio: formData,
      createdAt: new Date().toISOString(),
    };

    // Guardar la orden
    const ordenesJSON = localStorage.getItem("ordenes");
    const ordenes = ordenesJSON ? JSON.parse(ordenesJSON) : [];
    ordenes.push(orden);
    localStorage.setItem("ordenes", JSON.stringify(ordenes));

    // Limpiar carrito
    const nuevoUsuario: Usuario = { ...usuario, carrito: [] };
    setUsuario(nuevoUsuario);
    localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));

    // Actualizar usuarios
    const usuariosJSON = localStorage.getItem("usuarios");
    let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    usuarios = usuarios.map((u: any) =>
      u.correo === nuevoUsuario.correo ? nuevoUsuario : u
    );
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    window.dispatchEvent(new Event("carritoUpdated"));

    alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
    router.push("/");
  };

  if (loadingProducts) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 container my-4">
          <p>Cargando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container my-4">
        <h1 className="mb-4">Checkout</h1>

        <div className="row g-4">
          {/* Formulario de envío */}
          <div className="col-12 col-lg-8">
            <div className="card p-4">
              <h5 className="mb-3">Datos de envío</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección de envío</label>
                  <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Ciudad</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className={`form-control ${
                      errors.telefono ? "is-invalid" : ""
                    }`}
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ej: 977827552"
                    required
                  />
                  {errors.telefono && (
                    <div className="invalid-feedback">{errors.telefono}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label">Método de pago</label>
                  <select
                    className="form-select"
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="tarjeta">Tarjeta de crédito/débito</option>
                    <option value="transferencia">
                      Transferencia bancaria
                    </option>
                  </select>
                </div>

                {/* Campos condicionales para tarjeta */}
                {formData.metodoPago === "tarjeta" && (
                  <div className="mb-3 card p-3">
                    <h6>Datos de la tarjeta</h6>

                    <div className="mb-2">
                      <label className="form-label">Número de tarjeta</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.cardNumber ? "is-invalid" : ""
                        }`}
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        inputMode="numeric"
                        placeholder="1234123412341234"
                        required
                      />
                      {errors.cardNumber && (
                        <div className="invalid-feedback">
                          {errors.cardNumber}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 d-flex gap-2">
                      <div style={{ flex: 1 }}>
                        <label className="form-label">Vencimiento</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.expiry ? "is-invalid" : ""
                          }`}
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                        />
                        {errors.expiry && (
                          <div className="invalid-feedback">
                            {errors.expiry}
                          </div>
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.cvv ? "is-invalid" : ""
                          }`}
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          inputMode="numeric"
                          required
                        />
                        {errors.cvv && (
                          <div className="invalid-feedback">{errors.cvv}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="form-label">A nombre de</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.cardName ? "is-invalid" : ""
                        }`}
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="Nombre en la tarjeta"
                        required
                      />
                      {errors.cardName && (
                        <div className="invalid-feedback">
                          {errors.cardName}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Información para transferencia bancaria (si aplica) */}
                {formData.metodoPago === "transferencia" && (
                  <div className="mb-3 p-3 card">
                    <h6>Datos para Transferencia</h6>
                    <p className="mb-1">
                      <strong>Banco:</strong> Banco Ficticio
                    </p>
                    <p className="mb-1">
                      <strong>Tipo:</strong> Cuenta Vista
                    </p>
                    <p className="mb-1">
                      <strong>Nombre cuenta:</strong> ComiCommerce SPA
                    </p>
                    <p className="mb-1">
                      <strong>Cuenta:</strong> 12345678
                    </p>
                    <p className="mb-1">
                      <strong>RUT (empresa):</strong> 76.543.210-5
                    </p>
                    <small className="text-muted">
                      toma captura de la transferencia y enviala al correo para
                      confirmar tu pedido
                    </small>
                    <p className="mb-1">
                      <strong>Correo:</strong> contacto@comiccommerce.cl
                    </p>
                  </div>
                )}

                <button type="submit" className="btn btn-danger w-100">
                  Confirmar pedido
                </button>
              </form>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="col-12 col-lg-4">
            <div className="card p-3 shadow-sm">
              <h5>Resumen del pedido</h5>
              <hr />

              <div className="mb-3">
                {cartDetails.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <small>
                      {item.product?.name} (x{item.cantidad})
                    </small>
                    <small>
                      {formatPrice(
                        (item.product ? parsePrice(item.product.price) : 0) *
                          item.cantidad
                      )}
                    </small>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>{formatPrice(computeSubtotal())}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3 text-muted">
                <small>IVA (19%)</small>
                <small>{formatPrice(computeIVA())}</small>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Total</span>
                <strong>{formatPrice(computeTotal())}</strong>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
