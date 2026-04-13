'use client';
import ProductCard, { Product } from '@/components/ProdutcCard/ProductCard';
import { useEffect, useState } from 'react';
import { Box, Container, CircularProgress, Typography, Pagination, Stack } from '@mui/material';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Quantos produtos por página

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Erro na requisição');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Cálculo dos produtos a serem exibidos na página atual
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo ao trocar de página
  };

  return (
    <>
      <Box component="main" sx={{ py: 4, mt: 2 }}>
        <Container  maxWidth="lg" sx={{ py: 3, mt: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
              <Typography color="error">Erro: {error}</Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                  mb: 4,
                }}
              >
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onBuy={(prod) => alert(`Adicionado: ${prod.title}`)}
                  />
                ))}
              </Box>

              {/* Paginação */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </>
  );
}