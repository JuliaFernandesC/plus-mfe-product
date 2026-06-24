import { useState, useCallback } from "react";
import { fetchProductById, PLACEHOLDER_IMAGE } from "../../api/productApi";
import type { ProductDetail } from "../../pages/ProductDetail";

export function useProductDetail() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const p = await fetchProductById(id);
      setProduct({
        id: p.id,
        brand: p.marca ?? "",
        name: p.nome,
        rating: 0,
        reviewsCount: 0,
        price: p.preco,
        images: [PLACEHOLDER_IMAGE],
        colors: [],
        sizes: [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { product, loading, load };
}
