"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  img: string;
  name: string;
  price: string;
  categoria: string;
};

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("Todas");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const cats = Array.from(new Set(data.map((p) => p.categoria)));
        setCategorias(cats);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? products
      : products.filter((p) => p.categoria === categoriaSeleccionada);

  const categoriasMostrar =
    categoriaSeleccionada === "Todas" ? categorias : [categoriaSeleccionada];

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <main className="flex-grow-1 container mt-4">
        {/* Selector de categoría */}
        <div className="d-flex justify-content-center mb-4">
          <div className="col-12 col-md-6">
            <select
              className="form-select form-select-lg shadow-sm"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Catálogo */}
        {categoriasMostrar.map((categoria) => (
          <section key={categoria} className="mb-5">
            <h2 className="mb-4 border-bottom pb-2 text-center">{categoria}</h2>

            <div className="row g-4">
              {productosFiltrados
                .filter((p) => p.categoria === categoria)
                .map((product) => (
                  <div key={product.id} className="col-6 col-md-4 col-lg-3">
                    <div
                      className="card h-100 text-center shadow-sm border-0 d-flex flex-column"
                      style={{ height: "500px" }}
                    >
                      {/* CONTENEDOR FIJO 250x250 */}
                      <div
                        style={{
                          width: "100%", // full width column
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingTop: "1rem",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        {/* caja centrada de tamaño fijo (250x250) */}
                        <div
                          style={{
                            width: 250,
                            height: 250,
                            position: "relative", // necesario para next/image fill
                            overflow: "hidden",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxSizing: "border-box",
                          }}
                        >
                          <Link
                            href={`/productDetails?id=${product.id}`}
                            aria-label={product.name}
                          >
                            <Image
                              src={product.img}
                              alt={product.name}
                              fill // importante: ocupa el contenedor
                              style={{ objectFit: "contain" }} // contain -> no corta y mantiene proporción
                              priority
                            />
                          </Link>
                        </div>
                      </div>

                      {/* Información */}
                      <div className="card-body d-flex flex-column justify-content-between mt-auto">
                        <div>
                          <Link
                            href={`/productDetails?id=${product.id}`}
                            className="text-decoration-none fw-semibold d-block mb-1 text-dark"
                          >
                            {product.name}
                          </Link>
                        </div>
                        <div>
                          <p className="mb-2">{product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
