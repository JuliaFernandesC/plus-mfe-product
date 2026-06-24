import { useState } from "react";
import { Box, Typography } from "@mui/material";

import { ProductGrid } from "../components/ProductGrid";
import { ProductCard, type Product } from "../components/ProductCard";
import { AddProductCard } from "../components/AddProductCard";
import { CreateProductModal, type ProductCreateRequest } from "../components/CreateProductModal";
import { EditProductModal, type ProductUpdateRequest } from "../components/EditProductModal";

interface CategoryOption { id: string; nome: string }
interface SupplierOption { id: string; nome: string }

interface ProductEditAdminPageProps {
  products:    Product[];
  loading?:    boolean;
  categories?: CategoryOption[];
  suppliers?:  SupplierOption[];
  onCreateProduct: (payload: ProductCreateRequest) => Promise<void> | void;
  /** Busca os dados completos do produto (incluindo cores/grades) ao abrir a edição */
  onLoadProduct:   (id: string) => Promise<ProductUpdateRequest>;
  onUpdateProduct: (payload: ProductUpdateRequest) => Promise<void> | void;
  onDeleteProduct?:(id: string) => Promise<void> | void;
}

/**
 * ProductEditAdminPage - listagem admin completa:
 * - AddProductCard fixo na primeira posição -> abre CreateProductModal
 * - clique em qualquer ProductCard -> carrega o produto e abre EditProductModal
 */
export function ProductEditAdminPage({
  products,
  loading = false,
  categories = [],
  suppliers = [],
  onCreateProduct,
  onLoadProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductEditAdminPageProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const [editingProduct, setEditingProduct] = useState<ProductUpdateRequest | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  const handleCreate = async (payload: ProductCreateRequest) => {
    setCreating(true);
    try {
      await onCreateProduct(payload);
      setCreateOpen(false);
    } finally {
      setCreating(false);
    }
  };

  const handleOpenEdit = async (id: string) => {
    setLoadingEdit(true);
    setEditOpen(true);
    try {
      const product = await onLoadProduct(id);
      setEditingProduct(product);
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleUpdate = async (payload: ProductUpdateRequest) => {
    setSavingEdit(true);
    try {
      await onUpdateProduct(payload);
      setEditOpen(false);
      setEditingProduct(null);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!onDeleteProduct) return;
    await onDeleteProduct(id);
    setEditOpen(false);
    setEditingProduct(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f6f5fb", py: { xs: 3, md: 5 }, px: { xs: 2, md: 5 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", color: "#2c2a3a" }}>
          Catálogo de produtos
        </Typography>
        <Typography sx={{ fontSize: "0.8125rem", color: "#9290a8" }}>
          Clique em um produto para editar, ou use o card de "Novo produto" para cadastrar
        </Typography>
      </Box>

      <ProductGrid columns={4} loading={loading}>
        <AddProductCard onClick={() => setCreateOpen(true)} />

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleOpenEdit}
          />
        ))}
      </ProductGrid>

      <CreateProductModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        categories={categories}
        suppliers={suppliers}
        submitting={creating}
      />

      <EditProductModal
        open={editOpen}
        product={loadingEdit ? null : editingProduct}
        onClose={() => {
          setEditOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleUpdate}
        onDelete={onDeleteProduct ? handleDelete : undefined}
        categories={categories}
        suppliers={suppliers}
        submitting={savingEdit}
      />
    </Box>
  );
}

export default ProductEditAdminPage;

/* Exemplo de uso:
<ProductEditAdminPage
  products={products}
  categories={[{ id: "a1b2c3d4-...", nome: "Calças" }]}
  suppliers={[{ id: "f1e2d3c4-...", nome: "PlusWear" }]}
  onCreateProduct={(payload) => api.post("/produtos", payload)}
  onLoadProduct={(id) => api.get(`/produtos/${id}`).then((r) => r.data)}
  onUpdateProduct={(payload) => api.put(`/produtos/${payload.id}`, payload)}
  onDeleteProduct={(id) => api.delete(`/produtos/${id}`)}
/>
*/