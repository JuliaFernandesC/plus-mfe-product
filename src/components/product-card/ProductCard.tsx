import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import type { Product } from '../../types/product';

export interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const productImage = product.variations?.[0]?.imageUrls?.[0] ?? '';
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(248, 248, 255, 0.93)',
        borderRadius: '24px',
        boxShadow: '0 18px 48px rgba(69, 63, 180, 0.14)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        image={productImage}
        alt={`${product.name} - ${product.variations?.[0]?.colorName ?? 'Produto'}`}
        sx={{ height: 280, objectFit: 'cover' }}
      />

      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: '#9898B3', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}
        >
          {product.category.name}
        </Typography>

        <Typography variant="h6" sx={{ color: '#3D3D6B', fontWeight: 700, lineHeight: 1.2 }}>
          {product.name}
        </Typography>

        <Typography variant="h6" sx={{ color: '#3D3D6B', fontWeight: 700 }}>
          {formattedPrice}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {product.variations.map((variation, index) => (
            <Box
              key={`${variation.colorName}-${index}`}
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                bgcolor: variation.colorHex,
                border: '2px solid rgba(255,255,255,0.9)',
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)',
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {product.sizes.map((size) => (
            <Chip
              key={size}
              label={size}
              size="small"
              sx={{
                bgcolor: '#EAE9FF',
                color: '#3D3D6B',
                fontWeight: 700,
                borderRadius: '12px',
                height: 28,
              }}
            />
          ))}
        </Box>
      </CardContent>

      <Box sx={{ px: 3, pb: 3 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onViewDetails(product.id)}
          sx={{
            borderRadius: 50,
            textTransform: 'none',
            bgcolor: '#6C63FF',
            '&:hover': {
              bgcolor: '#5A52E0',
            },
            py: 1.25,
            fontWeight: 700,
          }}
        >
          Visualizar Detalhes
        </Button>
      </Box>
    </Card>
  );
}
