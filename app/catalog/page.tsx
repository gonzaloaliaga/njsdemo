"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Elementos personalizados
import Header from "../components/header";
import Footer from "../components/footer";

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

  // Retorno del componente principal
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 container mt-4">
        {categorias.map((categoria) => (
          <section key={categoria} style={{ marginBottom: "2rem" }}>
            <h2>{categoria}</h2>
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              {products
                .filter((p) => p.categoria === categoria)
                .map((p) => (
                  <li
                    key={p.id}
                    style={{
                      listStyle: "none",
                      border: "1px solid #ccc",
                      padding: "1rem",
                    }}
                  >
                    {p.img && <img src={p.img} alt={p.name} width={100} />}
                    <h3>{p.name}</h3>
                    <p>{p.price}</p>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
