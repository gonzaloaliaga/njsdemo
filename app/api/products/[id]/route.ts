import { NextResponse } from "next/server";
import { products } from "../data";

export async function GET(request: Request) {
  // Obtener el ID de la URL
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // extrae el último segmento

  if (!id) {
    return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
  }

  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
