import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Rating,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Button } from "../components/Button";
import { ColorSwitcher, type ColorOption } from "../components/ColorSwitcher";
import { SizeSwitcher, type SizeOption } from "../components/SizeSwitcher";
import { useProductDetail } from "../hooks/products/useProductDetail";

export interface ProductDetail {
  id:            string;
  brand:         string;
  brandIcon?:    string;
  sku?:          string;
  name:          string;
  rating:        number;
  reviewsCount:  number;
  price:         number;
  oldPrice?:     number;
  images:        string[];
  colors:        ColorOption[];
  sizes:         SizeOption[];
  sizeGroupLabel?: string;
  freeDeliveryThreshold?: number;
}

interface ProductDetailPageProps {
  productId?: string;
  onAddToCart?: (payload: { productId: string; colorId: string | null; sizeId: string | null }) => void;
  onToggleFavorite?: (productId: string) => void;
}

export function ProductDetailPage({ productId, onAddToCart, onToggleFavorite }: ProductDetailPageProps) {
  const { product, loading, load } = useProductDetail();
  const [activeImage, setActiveImage] = useState(0);
  const [colorId, setColorId] = useState<string | null>(null);
  const [sizeId, setSizeId] = useState<string | null>(null);

  useEffect(() => {
    if (productId) load(productId);
  }, [productId, load]);

  useEffect(() => {
    if (product?.colors.length) {
      setColorId(product.colors[0].id);
    }
  }, [product]);

  if (loading || !product) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #8b8cf0, #6f6ae8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#fff" }} />
      </Box>
    );
  }

  const visibleThumbs = product.images.slice(0, 4);
  const extraCount = product.images.length - visibleThumbs.length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #8b8cf0, #6f6ae8)",
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 6 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: 1040,
          mx: "auto",
          background: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 30px 60px rgba(80, 70, 180, 0.25)",
          overflow: "hidden",
          p: { xs: 3, md: 5 },
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "#f1f0ff",
            zIndex: 0,
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "#f1f0ff",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs
            separator="›"
            sx={{
              mb: 3,
              fontSize: "0.8125rem",
              "& .MuiBreadcrumbs-separator": { color: "#9290a8" },
            }}
          >
            <Link underline="hover" sx={{ color: "#9290a8", cursor: "pointer" }}>
              Produtos
            </Link>
            <Typography sx={{ fontSize: "0.8125rem", color: "#2c2a3a", fontWeight: 600 }}>
              {product.brand || product.name}
            </Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
              gap: { xs: 4, md: 6 },
            }}
          >
            {/* Galeria de imagens */}
            <Box>
              <Box
                sx={{
                  aspectRatio: "1 / 1",
                  borderRadius: "16px",
                  background: "#f6f5fb",
                  overflow: "hidden",
                  mb: 1.5,
                }}
              >
                <Box
                  component="img"
                  src={product.images[activeImage]}
                  alt={product.name}
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 1.25 }}>
                {visibleThumbs.map((img, i) => (
                  <Box
                    key={i}
                    component="button"
                    type="button"
                    onClick={() => setActiveImage(i)}
                    sx={{
                      width: 64,
                      height: 64,
                      p: 0,
                      borderRadius: "8px",
                      border: "2px solid",
                      borderColor: activeImage === i ? "#6457e8" : "transparent",
                      background: "#f6f5fb",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={`Miniatura ${i + 1}`}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ))}
                {extraCount > 0 && (
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "8px",
                      background: "#f6f5fb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      color: "#9290a8",
                      fontWeight: 600,
                    }}
                  >
                    +{extraCount} more
                  </Box>
                )}
              </Box>
            </Box>

            {/* Informacoes do produto */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                {product.brandIcon && (
                  <Avatar src={product.brandIcon} sx={{ width: 22, height: 22 }} />
                )}
                <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, color: "#2c2a3a" }}>
                  {product.brand}
                </Typography>
                {product.sku && (
                  <Typography sx={{ fontSize: "0.75rem", color: "#cfcfe0", ml: "auto" }}>
                    {product.sku}
                  </Typography>
                )}
              </Box>

              <Typography
                sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, fontWeight: 700, color: "#2c2a3a", mb: 1 }}
              >
                {product.name}
              </Typography>

              {product.rating > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                  <Rating
                    value={product.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ color: "#f5a623" }}
                  />
                  <Typography sx={{ fontSize: "0.75rem", color: "#9290a8" }}>
                    {product.reviewsCount} avaliacoes
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 4 }}>
                <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#2c2a3a" }}>
                  R$ {product.price.toFixed(2)}
                </Typography>
                {product.oldPrice && (
                  <Typography
                    sx={{ fontSize: "1.125rem", color: "#9290a8", textDecoration: "line-through" }}
                  >
                    R$ {product.oldPrice.toFixed(2)}
                  </Typography>
                )}
              </Box>

              {product.colors.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <ColorSwitcher colors={product.colors} value={colorId} onChange={setColorId} />
                </Box>
              )}

              {product.sizes.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <SizeSwitcher
                    options={product.sizes}
                    value={sizeId}
                    onChange={setSizeId}
                    label={product.sizeGroupLabel ?? "Tamanho"}
                    columns={6}
                  />
                  <Link
                    underline="hover"
                    sx={{ fontSize: "0.75rem", color: "#6457e8", fontWeight: 600, mt: 1, display: "inline-block" }}
                  >
                    Guia de tamanhos
                  </Link>
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
                <Box sx={{ flex: 1 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />}
                    onClick={() =>
                      onAddToCart?.({ productId: product.id, colorId, sizeId })
                    }
                  >
                    Adicionar ao carrinho
                  </Button>
                </Box>
                <Button
                  variant="icon"
                  icon={<FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                  onClick={() => onToggleFavorite?.(product.id)}
                />
              </Box>

              {product.freeDeliveryThreshold && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: "#9290a8" }} />
                  <Typography sx={{ fontSize: "0.8125rem", color: "#9290a8" }}>
                    Entrega gratuita em pedidos acima de R$ {product.freeDeliveryThreshold.toFixed(2)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetailPage;
