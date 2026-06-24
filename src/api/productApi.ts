export const API_BASE_URL =
  import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:3002";

export const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/300x400.png?text=Produto";

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Tipos de resposta da API ────────────────────────────────────────────────

export interface ProductResponse {
  id: string;
  nome: string;
  descricao: string | null;
  marca: string | null;
  preco: number;
  ativo: boolean;
  categoriaId: string | null;
  fornecedorId: string | null;
  criadoEm: string;
  atualizadoEm: string;
}

export interface PaginatedProductResponse {
  items: ProductResponse[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ProductCreatePayload {
  nome: string;
  descricao?: string;
  marca?: string;
  preco: number;
  categoriaId?: string;
  fornecedorId?: string;
}

export interface ProductUpdatePayload {
  nome?: string;
  descricao?: string;
  marca?: string;
  preco?: number;
  categoriaId?: string;
  fornecedorId?: string;
}

export interface ProductSearchFilters {
  nome?: string;
  categoriaId?: string;
  fornecedorId?: string;
  marca?: string;
  precoMin?: number;
  precoMax?: number;
  page?: number;
  pageSize?: number;
}

// ── Funções de API ──────────────────────────────────────────────────────────

export async function fetchProducts(
  page = 1,
  pageSize = 20,
  ativo = true,
): Promise<PaginatedProductResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ativo: String(ativo),
  });
  const res = await fetch(`${API_BASE_URL}/products?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function searchProducts(
  filters: ProductSearchFilters,
): Promise<PaginatedProductResponse> {
  const params = new URLSearchParams();
  if (filters.nome) params.set("nome", filters.nome);
  if (filters.categoriaId) params.set("categoriaId", filters.categoriaId);
  if (filters.fornecedorId) params.set("fornecedorId", filters.fornecedorId);
  if (filters.marca) params.set("marca", filters.marca);
  if (filters.precoMin != null) params.set("precoMin", String(filters.precoMin));
  if (filters.precoMax != null) params.set("precoMax", String(filters.precoMax));
  params.set("page", String(filters.page ?? 1));
  params.set("pageSize", String(filters.pageSize ?? 20));

  const res = await fetch(`${API_BASE_URL}/products/search?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function fetchProductById(
  id: string,
): Promise<ProductResponse> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar produto");
  return res.json();
}

export async function createProduct(
  payload: ProductCreatePayload,
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Erro ao criar produto");
  }
}

export async function updateProduct(
  id: string,
  body: ProductUpdatePayload,
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Erro ao atualizar produto");
  }
}

export async function disableProduct(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products/${id}/disable`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao desativar produto");
}
