import { useState } from "react";
import { Box, Typography } from "@mui/material";

import { ProductGrid } from "../components/ProductGrid";
import { ProductCard } from "../components/ProductCard";
import { AddProductCard } from "../components/AddProductCard";
import { CreateProductModal, type ProductCreateRequest } from "../components/CreateProductModal";
import { useProductList } from "../hooks/products/useProductList";
import { useProductForm, MOCK_CATEGORIES, MOCK_SUPPLIERS } from "../hooks/products/useProductForm";

export function ProductListAdminPage() {
  const { products, loading, reload } = useProductList();
  const { createProduct } = useProductForm();

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (payload: ProductCreateRequest) => {
    setSubmitting(true);
    try {
      await createProduct(payload);
      reload();
      setModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f6f5fb", py: { xs: 3, md: 5 }, px: { xs: 2, md: 5 } }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#2c2a3a" }}>
            Catalogo de produtos
          </Typography>
          <Typography sx={{ fontSize: "0.8125rem", color: "#9290a8" }}>
            Gerencie os produtos cadastrados na loja
          </Typography>
        </Box>
      </Box>

      <ProductGrid columns={4} loading={loading}>
        <AddProductCard onClick={() => setModalOpen(true)} />

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </ProductGrid>

      <CreateProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        categories={MOCK_CATEGORIES}
        suppliers={MOCK_SUPPLIERS}
        submitting={submitting}
      />
    </Box>
  );
}

export default ProductListAdminPage;
