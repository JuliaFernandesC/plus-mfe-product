import { useState, useCallback } from "react";
import type { Product } from "../../components/ProductCard";
import {
  searchProducts,
  PLACEHOLDER_IMAGE,
  type ProductSearchFilters,
} from "../../api/productApi";

export function useProductSearch(initialPageSize = 12) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFiltersState] = useState<ProductSearchFilters>({
    page: 1,
    pageSize: initialPageSize,
  });

  const setFilters = useCallback((patch: Partial<ProductSearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
  }, []);

  const search = useCallback(
    async (overrides?: Partial<ProductSearchFilters>) => {
      const merged = { ...filters, ...overrides };
      setLoading(true);
      try {
        const data = await searchProducts(merged);
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  const goToPage = useCallback(
    (newPage: number) => {
      setFilters({ page: newPage });
      search({ page: newPage });
    },
    [search, setFilters],
  );

  return { products, loading, page, totalPages, filters, setFilters, search, goToPage };
}
