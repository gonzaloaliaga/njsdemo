"use client";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/header";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  useEffect(() => {
    // @ts-expect-error: Bootstrap no tiene tipos, se importa solo para activar JS en cliente
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // Lista de productos
  const products = [
    {
      id: 1,
      img: "/products/dunmeshi.webp",
      name: "Dungeon Meshi [Vol. 1 - 14]",
      price: "$99.990",
    },
    {
      id: 2,
      img: "/products/spiderpunk.jpg",
      name: "Spider Punk (2022) [#1 - 5]",
      price: "$124.990",
    },
    {
      id: 3,
      img: "/products/absolutebatman.jpeg",
      name: "ABSOLUTE BATMAN VOL.1",
      price: "$28.500",
    },
    {
      id: 4,
      img: "/products/milesmorales.jpg",
      name: "Miles Morales: Spider-Man (2022) #1",
      price: "$37.430",
    },
    {
      id: 5,
      img: "/products/berserkmaximum.png",
      name: "Berserk Maximum #1",
      price: "$25.400",
    },
    {
      id: 6,
      img: "/products/jojodiamond.jpg",
      name: "Jojo's Bizarre Adventure - Diamond Is Unbreakable 01",
      price: "$17.990",
    },
    {
      id: 7,
      img: "/products/jojosteel.jpg",
      name: "Jojo's Bizarre Adventure - Steel Ball Run 01",
      price: "$23.990",
    },
    {
      id: 8,
      img: "/products/punpun.jpg",
      name: "Goodnight Punpun Vol.1",
      price: "$25.580",
    },
  ];

  // Retorno del componente principal
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 container mt-4">
        {/* Welcome Card */}
        <div className="card mb-5 border-0 shadow">
          <div className="row g-0 align-items-center">
            <div className="col-md-6 p-4">
              <h2 className="fw-bold" style={{ fontFamily: "Georgia, serif" }}>
                ¡Bienvenido a ComiCommerce!
              </h2>
              <p
                className="mt-3"
                style={{ fontFamily: "Georgia, serif", fontSize: "2.5dvh" }}
              >
                Tu tienda online especializada en cómics, donde la pasión por
                las historietas cobra vida. Aquí encontrarás desde los clásicos
                que marcaron época, hasta los lanzamientos más recientes,
                pasando por una gran variedad de mangas y ediciones exclusivas.
                Compra cómodamente desde casa y retira tu pedido en nuestras
                tiendas físicas, o déjate sorprender navegando nuestro amplio
                catálogo. ¡Descubre el universo ComiCommerce y lleva tus
                historias favoritas a casa!
              </p>
              <Link href="/catalog" className="btn btn-danger mt-3">
                VER CATÁLOGO
              </Link>
            </div>
            <div className="col-md-6 text-center bg-light">
              <Image
                src="/assets/homePage/images/welcomeCardImg.jpg"
                alt="Welcome to ComiCommerce"
                width={600}
                height={400}
                className="img-fluid object-fit-contain"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 text-center shadow-sm">
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
                    className="text-decoration-none fw-semibold d-block mb-2"
                  >
                    {product.name}
                  </Link>
                  <p className="text-muted">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-light text-center py-3 mt-auto border-top">
        <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <p className="mb-2 mb-sm-0 text-secondary">ComiCommerce, 2025</p>
          <div className="d-flex gap-3">
            <Link href="#" className="text-secondary text-decoration-none">
              Políticas de privacidad
            </Link>
            <Link href="#" className="text-secondary text-decoration-none">
              Políticas de cookies
            </Link>
            <Link href="#" className="text-secondary text-decoration-none">
              Información legal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
