import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Pagination,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { products } from '../data/products';

const CategoryPage = () => {
  const { category, subCategory } = useParams();
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 12;

  useEffect(() => {
    const filtered = products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase() &&
      product.productType === subCategory
    );
    setFilteredProducts(filtered);
    setPage(1); // Reset page when category/subcategory changes
  }, [category, subCategory]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* 브레드크럼브 네비게이션 */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          홈
        </Link>
        <Link component={RouterLink} to={`/category/${category}`} color="inherit">
          {category}
        </Link>
        <Typography color="text.primary">{subCategory}</Typography>
      </Breadcrumbs>

      {/* 카테고리 제목 */}
      <Typography variant="h4" gutterBottom>
        {subCategory}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        총 {filteredProducts.length}개의 상품
      </Typography>

      {/* 상품 그리드 */}
      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              component={RouterLink}
              to={`/product/${product.id}`}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 280,
                  objectFit: 'cover'
                }}
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  gutterBottom
                >
                  {product.brand}
                </Typography>
                <Typography 
                  variant="body1" 
                  component="h2" 
                  sx={{ 
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {product.discount > 0 && (
                    <Typography 
                      variant="body1" 
                      color="error.main" 
                      sx={{ fontWeight: 'bold' }}
                    >
                      {product.discount}%
                    </Typography>
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ₩{(product.price * (1 - product.discount/100)).toLocaleString()}
                  </Typography>
                </Box>
                {product.discount > 0 && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ₩{product.price.toLocaleString()}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 페이지네이션 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={pageCount} 
          page={page} 
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
};

export default CategoryPage; 