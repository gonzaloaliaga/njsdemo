import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { blogs } from "../blogs/data";

export default function BlogDetailPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const blogId = parseInt(searchParams.id || "1", 10);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 container my-5">
          <div className="alert alert-danger">Blog no encontrado</div>
          <Link href="/blogs" className="btn btn-danger">
            Volver a blogs
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 container my-5">
        <article className="card shadow-sm">
          <div className="card-body">
            <h1 className="h2 mb-3">{blog.title}</h1>
            <p className="lead text-muted mb-4">{blog.excerpt}</p>

            <div className="mb-4">
              {blog.content.split("\n\n").map((paragraph, i) => (
                <p key={i}>
                  {paragraph.startsWith("•") ? (
                    <ul className="list-unstyled mb-0">
                      {paragraph.split("\n").map((item, j) => (
                        <li key={j} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>

            {blog.id === 1 && (
              <p>
                Visita nuestro{" "}
                <Link
                  href="/catalog"
                  className="text-primary text-decoration-none"
                >
                  catálogo
                </Link>{" "}
                para ver todos los productos disponibles.
              </p>
            )}

            <div className="mt-4">
              <Link href="/blogs" className="btn btn-danger">
                Volver a blogs
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
