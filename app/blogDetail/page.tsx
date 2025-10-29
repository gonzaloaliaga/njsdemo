import { Suspense } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import BlogDetailClient from "./BlogDetailCliente";

export default function BlogDetailPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container my-5">
        <Suspense fallback={<div>Cargando blog...</div>}>
          <BlogDetailClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
