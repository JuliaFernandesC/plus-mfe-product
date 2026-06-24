import {
  createProduct as apiCreate,
  updateProduct as apiUpdate,
  disableProduct as apiDisable,
  fetchProductById,
} from "../../api/productApi";

export const MOCK_CATEGORIES = [
  { id: "1", nome: "Calças" },
  { id: "2", nome: "Vestidos" },
  { id: "3", nome: "Blusas" },
  { id: "4", nome: "Saias" },
  { id: "5", nome: "Jaquetas" },
];

export const MOCK_SUPPLIERS = [
  { id: "f1e2d3c4-b5a6-7890-abcd-ef1234567890", nome: "PlusWear Confecções" },
  { id: "a9b8c7d6-e5f4-3210-fedc-ba0987654321", nome: "Bella Moda Plus" },
  { id: "11112222-3333-4444-5555-666677778888", nome: "Atelier Grandeza" },
];

export function useProductForm() {
  async function createProduct(payload: any) {
    await apiCreate(payload);
  }

  async function loadProduct(id: string) {
    const p = await fetchProductById(id);
    return {
      id: p.id,
      nome: p.nome,
      descricao: p.descricao ?? "",
      marca: p.marca ?? "",
      preco: p.preco,
      categoriaId: p.categoriaId ?? "",
      fornecedorId: p.fornecedorId ?? "",
      ativo: p.ativo,
      cores: [],
      grades: [],
    };
  }

  async function updateProduct(payload: any) {
    const { id, cores, grades, ativo, ...body } = payload;
    await apiUpdate(id, body);
    if (ativo === false) {
      await apiDisable(id);
    }
  }

  async function disableProduct(id: string) {
    await apiDisable(id);
  }

  return { createProduct, loadProduct, updateProduct, disableProduct };
}
