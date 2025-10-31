"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Elementos personalizados
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";

// USO DE API PROPIA
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

        // Sacar categorías únicas
        const cats = Array.from(new Set(data.map((p) => p.categoria)));
        setCategorias(cats);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filtrar productos según categoría seleccionada
  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? products
      : products.filter((p) => p.categoria === categoriaSeleccionada);

  // Categorías a mostrar (si es "Todas", muestra todas las secciones)
  const categoriasMostrar =
    categoriaSeleccionada === "Todas" ? categorias : [categoriaSeleccionada];

  return (
    <div className="d-flex flex-column min-vh-100">
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

        {/* Catálogo de productos */}
        {categoriasMostrar.map((categoria) => (
          <section key={categoria} className="mb-5">
            <h2 className="mb-4 border-bottom pb-2 text-center">{categoria}</h2>

            <div className="row g-4">
              {productosFiltrados
                .filter((p) => p.categoria === categoria)
                .map((product) => (
                  <div key={product.id} className="col-6 col-md-4 col-lg-3">
                    <div className="card h-100 text-center shadow-sm border-0">
                      <Link href={`/productDetails?id=${product.id}`}>
                        <Image
                          src={product.img}
                          alt={product.name}
                          width={200}
                          height={250}
                          className="card-img-top p-3 img-fluid"
                        />
                      </Link>
                      <div className="card-body">
                        <Link
                          href={`/productDetails?id=${product.id}`}
                          className="text-decoration-none fw-semibold d-block mb-2 text-dark"
                        >
                          {product.name}
                        </Link>
                        <p className="text-muted">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
