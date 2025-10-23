import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
