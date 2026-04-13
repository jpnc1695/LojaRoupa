import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  Box,
} from '@mui/material';
import Link from 'next/link';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  onBuy?: (product: Product) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const handleBuy = () => {
    if (onBuy) onBuy(product);
    else console.log('Comprar:', product.title);
  };

  return (
    <Link href={`/produto/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: '100%',
          maxWidth: 240,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 6,
          },
        }}
      >
        {/* Container da imagem com tamanho padronizado */}
        <Box
          sx={{
            width: '100%',
            height: 150,
            bgcolor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              width: 'auto',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            p: 1.5,
            '&:last-child': { pb: 1.5 },
          }}
        >
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            noWrap
            title={product.title}
            sx={{ fontWeight: 500, fontSize: '0.9rem' }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: 32,
            }}
          >
            {product.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mt: 0.5,
            }}
          >
            <Rating value={product.rating.rate} precision={0.5} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              ({product.rating.count})
            </Typography>
          </Box>
          <Typography variant="body1" color="primary.main" sx={{ mt: 0.5, fontWeight: 600 }}>
            R$ {product.price.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 1.5, pt: 0 }}>
          <Button
            size="small"
            color="primary"
            fullWidth
            variant="contained"
            onClick={handleBuy}
            sx={{ fontSize: '0.75rem' }}
          >
            Ver detalhes
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}