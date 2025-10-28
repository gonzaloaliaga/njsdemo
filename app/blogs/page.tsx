import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { blogs } from "./data";

export default function BlogsPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 container my-5">
        <h1 className="text-center mb-5">Blog de ComiCommerce</h1>

        <div className="row g-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h4">{blog.title}</h2>
                  <p className="text-muted mb-3">{blog.excerpt}</p>
                  <Link
                    href={`/blogDetail?id=${blog.id}`}
                    className="btn btn-danger"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
