import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h4 className="m-0">ComiCommerce</h4>

          {/* Botones Login y Carrito */}
          <div className="d-flex align-items-center gap-2">
            <Link href="/login" className="btn btn-outline-danger px-3">
              Login
            </Link>
            <Link href="/shoppingCart" className="btn btn-danger px-3">
              Carrito
            </Link>
          </div>
        </div>

        {/* Barra de navegación */}
        <div className="d-flex justify-content-center align-items-center gap-3 bg-danger text-white py-2">
          <Link href="/" className="text-white text-decoration-none">
            Home
          </Link>
          <p className="m-0">___</p>
          <Link href="/catalog" className="text-white text-decoration-none">
            Productos
          </Link>
          <p className="m-0">___</p>
          <Link href="/about" className="text-white text-decoration-none">
            Nosotros
          </Link>
          <p className="m-0">___</p>
          <Link href="/blogs" className="text-white text-decoration-none">
            Blogs
          </Link>
          <p className="m-0">___</p>
          <Link href="/contact" className="text-white text-decoration-none">
            Contacto
          </Link>
        </div>
      </nav>
    </header>
  );
}
