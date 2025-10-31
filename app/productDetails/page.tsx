import { Suspense } from "react";
import ProductDetailsContent from "../productDetails/productDetailsContent";

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={<p className="text-center mt-4">Cargando producto...</p>}
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
