import { useState, useEffect, useCallback } from "react";
import type { Product } from "../../components/ProductCard";
import { fetchProducts, PLACEHOLDER_IMAGE } from "../../api/productApi";

export function useProductList(initialPage = 1, initialPageSize = 12) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const reload = useCallback(
    (targetPage?: number) => {
      const p = targetPage ?? page;
      setLoading(true);
      fetchProducts(p, pageSize)
        .then((data) => {
          setProducts(
            data.items.map((item) => ({
              id: item.id,
              name: item.nome,
              image: PLACEHOLDER_IMAGE,
              price: item.preco,
            })),
          );
          setPage(data.page);
          setTotalPages(data.totalPages);
          setTotalItems(data.totalItems);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    },
    [page, pageSize],
  );

  useEffect(() => {
    reload();
  }, [reload]);

  const goToPage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      reload(newPage);
    },
    [reload],
  );

  return { products, loading, reload, page, totalPages, totalItems, goToPage };
}
