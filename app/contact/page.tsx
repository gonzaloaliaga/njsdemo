import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto - ComiCommerce",
  description:
    "Formulario de contacto y datos para comunicarse con ComiCommerce",
};

export default function ContactPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 container my-5">
        <div className="row g-4">
          <div className="col-12">
            <h1 className="fw-bold">Contacto</h1>
            <p className="text-muted">
              Si tienes preguntas, sugerencias o quieres contactarnos, completa
              el formulario o usa los datos de contacto a la derecha.
            </p>
          </div>

          <div className="col-12 col-md-8">
            <div className="card shadow-sm p-4">
              <h5 className="mb-3">Envíanos un mensaje</h5>
              <ContactForm />
            </div>
          </div>

          <aside className="col-12 col-md-4">
            <div className="card shadow-sm p-4 bg-light">
              <h6>Información de contacto</h6>
              <ul className="list-unstyled mt-3">
                <li>
                  <strong>Correo:</strong>
                  <div>contacto@comiccommerce.cl</div>
                </li>
                <li className="mt-2">
                  <strong>Teléfono:</strong>
                  <div>+56 9 1234 5678</div>
                </li>
                <li className="mt-2">
                  <strong>Dirección:</strong>
                  <div>Av. Cómic 123, Santiago, Chile</div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
