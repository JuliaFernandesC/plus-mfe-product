Trabalho 1 de ES2, Grupo 7

Integrantes: Jasmine Vanzella, Julia Fernandes, Luiza Rosito, Murilo Souza e Rafael Madeira 

# UI Style Guide (Manual de UI) - Plus MFE Product

Este documento estabelece as diretrizes visuais e de interface para o micro-frontend de **Produtos** do sistema Plus Gestão. O objetivo é manter a consistência visual, acessibilidade e uma experiência de usuário moderna e limpa.

---

## 1. Identidade Visual

### 1.1 Paleta de Cores

A interface utiliza tons de roxo vibrante para ações principais e tons de cinza azulado para textos secundários e superfícies.

| Tipo | HEX / Valor | Uso |
| :--- | :--- | :--- |
| **Primary** | `#6C63FF` | Botões principais, foco, ícones de destaque. |
| **Primary Dark** | `#5A52E0` | Hover de botões contained. |
| **Primary Light** | `#EAE9FF` | Backgrounds suaves, hover de botões outlined. |
| **Primary Ghost** | `rgba(108, 99, 255, 0.08)` | Hover de IconButton e botões text. |
| **Gradient (botões)** | `linear-gradient(135deg, #9a8ff5, #4f44c9)` | Botões primary, seletores de tamanho ativos, ícone do carrinho. |
| **Gradient (fundo)** | `linear-gradient(135deg, #8b8cf0, #6f6ae8)` | Fundo da página de detalhe do produto. |
| **Background Page** | `#f6f5fb` | Fundo geral das páginas de listagem e admin. |
| **Background Paper** | `#ffffff` | Superfície de cards, sidebar, topbar. |
| **Text Primary** | `#2c2a3a` | Títulos, nomes, preços. |
| **Text Secondary** | `#9290a8` | Labels, placeholders, textos de ajuda. |
| **Text Heading (tema)** | `#4A42C8` | Títulos h1–h4 via MUI theme. |
| **Border** | `#e0e0f0` / `#e7e5f2` | Bordas de cards, inputs outlined e separadores. |
| **Error** | `#ef4f6e` | Mensagens de validação inline. |
| **Success** | `#22c55e` | Status ativo de produto. |
| **Warning** | `#f59e0b` | Status rascunho. |

### 1.2 Background Decorativo

Cards principais, modais e a grid de produtos utilizam **círculos decorativos translúcidos** (`background: #f1f0ff`) posicionados em absolute nos cantos (top-right e bottom-left) para criar profundidade visual. Esses elementos recebem `aria-hidden` e `zIndex: 0`.

---

## 2. Tipografia

- **Fonte Principal:** `"Nunito", "Inter", "Helvetica Neue", Arial, sans-serif`
- **Títulos de Página:** `fontWeight: 800`, `fontSize: 1.5rem`, cor `#2c2a3a`
- **Subtítulos:** `fontSize: 0.8125rem`, cor `#9290a8`
- **Labels de Input (UnderlineField):** `fontSize: 0.72rem`, `fontWeight: 600`, cor `#9290a8`
- **Corpo de Texto / Nomes:** `fontSize: 0.875rem`, `fontWeight: 600`, cor `#2c2a3a`
- **Preços:** `fontWeight: 700–800`, cor `#2c2a3a`
- **Preço antigo (riscado):** `fontSize: 0.75rem`, cor `#9290a8`, `textDecoration: line-through`

---

## 3. Componentes

### 3.1 Button (`src/components/Button.tsx`)

Componente customizado que envolve o `MuiButton`. Todas as variantes usam `borderRadius: 999px` (pill shape).

| Variante | Estilo |
| :--- | :--- |
| **primary** | `background: linear-gradient(135deg, #9a8ff5, #4f44c9)`, texto branco, `boxShadow` roxo. |
| **secondary** | Fundo branco, texto `#6457e8`, shadow sutil. |
| **outline** | Fundo transparente, `border: 1.5px solid #e7e5f2`, texto `#2c2a3a`. |
| **ghost** | Sem fundo, texto `#6457e8`, underline no hover. Usado para ações inline como "Adicionar cor". |
| **icon** | Circular 44×44px, fundo branco, borda fina. Para ações isoladas (favoritar, deletar). |

Tamanhos disponíveis: `sm`, `md`, `lg`. Estado de loading exibe `CircularProgress` inline. Efeito `scale(0.97)` no `:active`.

### 3.2 UnderlineField (`src/components/UnderlineField.tsx`)

Campo de entrada com estilo **underline** (sem caixa ao redor), utilizando o `MuiInput`:

- Linha base: `#e7e5f2`
- Hover/Foco: `#6457e8`
- Erro: `#ef4f6e` na linha e no label
- Suporta `multiline`, `endAdornment` (ex: ícone de moeda no campo de preço)
- Helper text de erro aparece abaixo do campo em `0.72rem`

### 3.3 ProductCard (`src/components/ProductCard.tsx`)

Card de produto para exibição em grid:

- `borderRadius: 16px`, `boxShadow` sutil
- Hover: `translateY(-4px)` com shadow mais forte
- Imagem quadrada (`aspectRatio: 1/1`) com fundo `#f6f5fb`
- Badge opcional no canto superior esquerdo (tons: `new`, `promo`, `success`, `neutral`)
- Botão de favoritar (coração) no canto superior direito com fundo glass
- Botão de carrinho com gradiente roxo no rodapé do card
- Callbacks: `onAddToCart`, `onToggleFavorite`, `onClick`

### 3.4 AddProductCard (`src/components/AddProductCard.tsx`)

Card com borda tracejada (`2px dashed #d0d0e8`) e aspecto `1 / 1.32`, usado como primeiro item da grid admin para criar novos produtos. Ícone "+" em círculo com gradiente roxo.

### 3.5 ProductGrid (`src/components/ProductGrid.tsx`)

Container de grid responsivo:

- `borderRadius: 24px`, fundo branco, `boxShadow` pronunciada
- Grid CSS: 1 coluna (xs), 2 (sm), 3 (md), N colunas configurável (lg)
- Círculos decorativos translúcidos nos cantos
- Estado de loading com shimmer skeleton animado (`@keyframes pf-shimmer`)

### 3.6 ColorSwitcher (`src/components/ColorSwitcher.tsx`)

Seletor de variação de cor para a página de detalhe:

- Miniaturas 46×46px com `borderRadius: 16px`
- Borda `#6457e8` quando selecionado + checkmark circular com gradiente
- Exibe o nome da cor selecionada ao lado do label

### 3.7 SizeSwitcher (`src/components/SizeSwitcher.tsx`)

Seletor de tamanho em grid:

- Chips pill com `borderRadius: 999px`
- Selecionado: gradiente roxo com shadow; não selecionado: borda `#e7e5f2`
- Suporta estado `disabled` com opacidade e `line-through`

### 3.8 Selects Nativos (Categoria / Fornecedor)

Nos modais de criação e edição, os campos de categoria e fornecedor usam `<select>` nativo estilizado com underline:

- `borderBottom: 1.5px solid #e7e5f2`
- Hover: `borderColor: #6457e8`
- Erro: `borderColor: #ef4f6e`
- Placeholder em cor `#9290a8`

### 3.9 Modais (Dialog)

Os modais (`CreateProductModal`, `EditProductModal`) seguem o padrão:

- `borderRadius: 24px`
- `boxShadow: 0 30px 60px rgba(80, 70, 180, 0.25)`
- Círculos decorativos translúcidos nos cantos
- Header com título bold (800) + subtítulo + botão fechar (X)
- Padding: `p: { xs: 3, md: 4.5 }`
- Botões de ação no rodapé com gap de `1.5`

**CreateProductModal:** campos nome, descrição, marca, preço (com ícone $), categoria (select), fornecedor (select). Validação inline.

**EditProductModal:** mesmos campos + toggle de "Produto ativo" (Switch roxo) + seções de variações de cor (color picker + nome) e variações de grade/tamanho (nome + estoque). Botão "Excluir" opcional.

---

## 4. Páginas

### 4.1 ProductEditAdminPage (`src/pages/ProdutEdit.tsx`) — Página Principal

Página autocontida de administração de produtos. É a tela renderizada pelo `main.jsx`.

- Fundo: `#f6f5fb`
- Título "Catálogo de produtos" com subtítulo orientativo
- Grid 4 colunas com `AddProductCard` como primeiro item
- Clique em produto abre `EditProductModal` (carrega dados via API)
- Clique em "Novo produto" abre `CreateProductModal`
- Hooks: `useProductList` (busca lista) e `useProductForm` (CRUD)

### 4.2 ProductListPage (`src/pages/ProductList.tsx`) — Vitrine (Cliente)

Página de listagem voltada ao consumidor final:

- **Topbar:** logo "lapakbaju" com gradiente, barra de busca pill, botões Wishlist e Carrinho
- **Sidebar de filtros:** painel lateral (240px, oculto em mobile) com checkboxes de tipo e cor (com swatch colorido)
- **Área principal:** breadcrumbs, título, chips de filtros ativos (removíveis), grid 3 colunas de ProductCards, paginação
- Paginação com item selecionado em gradiente roxo

### 4.3 ProductDetailPage (`src/pages/ProductDetail.tsx`) — Detalhe (Cliente)

Página de detalhe de produto individual:

- Fundo gradiente roxo (`#8b8cf0` → `#6f6ae8`)
- Card branco centralizado (`maxWidth: 1040`, `borderRadius: 24px`) com círculos decorativos
- Layout grid 2 colunas: galeria de imagens (esquerda) + informações (direita)
- Galeria: imagem principal + 4 miniaturas (64×64px) + indicador "+N more"
- Info: marca com avatar, nome, rating com estrelas, preço, `ColorSwitcher`, `SizeSwitcher`, botão "Add to cart", info de frete grátis

### 4.4 ProductListAdminPage (`src/pages/ProductCreate.tsx`) — Admin Simplificada

Versão admin da listagem que recebe callbacks por props (ao invés de ser autocontida):

- Mesma estrutura visual da `ProductEditAdminPage`
- Grid 4 colunas com `AddProductCard` + `ProductCards`
- Abre apenas `CreateProductModal`

---

## 5. Layout e Spacing

- **Grid de Produtos:** `gap: 3` (24px), padding interno `p: 4` (32px)
- **Páginas Admin:** `py: { xs: 3, md: 5 }`, `px: { xs: 2, md: 5 }`
- **Modais:** `p: { xs: 3, md: 4.5 }`, gap entre campos `gap: 2.5` (20px)
- **Sidebar de Filtros:** `width: 240px`, `p: 3`, oculta em mobile
- **Responsividade:** Grid adapta de 1 a 4 colunas conforme breakpoint (`xs` → `lg`)

---

## 6. UX — Fluxos e Feedback

1. **Estados de Carregamento:** A `ProductGrid` exibe skeleton cards com animação shimmer enquanto `loading = true`.
2. **Validação:** Erros de formulário são exibidos inline abaixo do campo em `#ef4f6e`, com label do campo também mudando de cor.
3. **Loading em Botões:** Botões de submit exibem `CircularProgress` inline e ficam desabilitados durante a operação.
4. **Hover em Cards:** Todos os cards (produto, adicionar) fazem `translateY(-4px)` com shadow reforçado.
5. **Toggle Ativo/Inativo:** No modal de edição, um `Switch` roxo controla a visibilidade do produto na loja.
6. **Exclusão:** Botão "Excluir" no modal de edição desativa o produto via `PATCH /products/{id}/disable`.

---

## 7. Integração com API

- **Base URL:** `VITE_PRODUCT_API_URL` ou `http://localhost:3002`
- **Autenticação:** Token JWT do `localStorage` enviado como `Authorization: Bearer {token}`
- **Endpoints usados:**
  - `GET /products` — lista de produtos (`data.items[]`)
  - `GET /products/{id}` — detalhe para edição
  - `POST /products` — criação (body: `ProductCreateRequest`)
  - `PUT /products/{id}` — atualização
  - `PATCH /products/{id}/disable` — desativação (soft delete)
- **Dados mockados:** Categorias e fornecedores são mock locais definidos em `useProductForm.ts` (IDs devem ser os mesmos do back-end)

---

## 8. Implementação (MUI Theme — `src/styles.ts`)

O tema MUI centraliza os estilos base. Os componentes customizados (`Button`, `UnderlineField`) aplicam estilos próprios por cima.

```typescript
// Resumo das configurações do tema
shape: { borderRadius: 10 },
palette: {
  primary: { main: "#6C63FF", dark: "#5A52E0", light: "#EAE9FF" },
  background: { default: "#f8f8ff", paper: "#ffffff" },
  text: { primary: "#3d3d6b", secondary: "#9898b3" },
},
components: {
  MuiButton:  { contained: borderRadius 9999px, gradient, ... },
  MuiInput:   { underline style com transição de cor },
  MuiCard:    { borderRadius 20px, shadow, hover effect },
  MuiDialog:  { borderRadius 24px, modal shadow },
  MuiChip:    { borderRadius 9999px, semibold },
  MuiTab:     { textTransform none, semibold },
  ...
}
```
