'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Container, Typography, Rating, Button, Chip, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Product } from '@/components/ProdutcCard/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Produto não encontrado');
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography color="error">{error || 'Produto não encontrado'}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 20 }}>
  
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        {/* Imagem padronizada (mesmo estilo dos cards, porém maior) */}
        <Box
          sx={{
            flex: { md: 1 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            p: 2,
            height: { xs: 'auto', md: 400 },
            width: '100%',
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              maxWidth: '100%',
              maxHeight: 400,
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Detalhes */}
        <Box sx={{ flex: { md: 1 } }}>
        <Typography variant="h6" color="primary.main" sx={{ mb: 2, fontWeight: 600 }}>
        {product.title}
          </Typography>
          <Chip label={product.category} color="secondary" size="small" sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rating.rate} precision={0.5} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              ({product.rating.count} avaliações)
            </Typography>
          </Box>
          <Typography variant="h6" color="primary.main" sx={{ mb: 2, fontWeight: 600 }}>
            R$ {product.price.toFixed(2)}
          </Typography>
          <Typography variant="h6" color="primary.main" sx={{ mb: 2, fontWeight: 600 }}>
            {product.description}
          </Typography>
          <Button variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
            Comprar agora
          </Button>

        <Button variant="contained" size="large" fullWidth  onClick={() => router.back()} sx={{ mb: 3, mt: 2 }}>
           Voltar
        </Button>
        </Box>
      </Box>
    </Container>
  );
}