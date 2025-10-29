"use client";

import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import React from "react";

export default function AboutPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 position-relative py-5">
        {/* Fondo con imagen */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('/products/backgroundComic.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        {/* Contenido principal */}
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div
            className="card shadow-lg mx-auto"
            style={{ maxWidth: "900px", margin: "2rem auto" }}
          >
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center mb-4">
                Sobre Nosotros - ComiCommerce
              </h1>

              <div className="mb-4">
                <p>
                  En ComiCommerce creemos que cada historia merece ser contada,
                  compartida y disfrutada. Somos una tienda online dedicada a
                  los amantes de los mangas, cómics y novelas gráficas de todos
                  los géneros. Desde los clásicos que marcaron nuestra infancia
                  hasta las últimas publicaciones que están revolucionando el
                  mundo del entretenimiento, queremos que siempre encuentres
                  aquí esa historia que estabas buscando.
                </p>

                <p>
                  Sabemos lo que se siente esperar con ansias el próximo volumen
                  de tu serie favorita, descubrir una portada increíble o
                  perderse en páginas llenas de acción, aventuras y emociones.
                  Por eso, más que una tienda, ComiCommerce es un lugar hecho
                  por fans y para fans. Queremos que cada lector encuentre algo
                  que lo haga sonreír, emocionarse o incluso empezar una nueva
                  colección.
                </p>

                <p>
                  Nuestro catálogo es amplio y en constante crecimiento: tenemos
                  mangas shōnen, shōjo, seinen, cómics de superhéroes, ediciones
                  independientes, novelas gráficas y mucho más. Nos apasiona la
                  diversidad de estilos y relatos, porque estamos convencidos de
                  que hay una historia perfecta para cada persona.
                </p>

                <p>
                  Además, nos preocupamos de que tu experiencia sea cómoda,
                  rápida y segura. Queremos que disfrutes tanto del proceso de
                  comprar como del momento en que recibes ese tomo que estabas
                  esperando. Porque entendemos que, detrás de cada compra, no
                  hay solo un producto: hay ilusión, nostalgia y el deseo de
                  vivir nuevas aventuras en cada página.
                </p>

                <p>
                  En ComiCommerce, no solo vendemos cómics: compartimos contigo
                  la magia de leer. Aquí encontrarás tu próximo héroe, tu
                  próxima saga favorita o esa joya escondida que no sabías que
                  necesitabas.
                </p>

                <p>
                  Queremos darte la bienvenida a ComiCommerce, donde las páginas
                  cobran vida y las historias nunca terminan.
                </p>
              </div>
            </div>
          </div>

          {/* Sección de contacto */}
          <div className="text-center mt-4">
            <p className="mb-2">¿Buscas nuestros contactos?</p>
            <p className="mb-2">Da click aquí</p>
            <p className="mb-3">vvv</p>
            <Link href="/contact" className="btn btn-danger btn-lg px-4">
              CONTACTO
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
