// src/pages/product/ProductDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  Rating,
  Tabs,
  Tab,
  Breadcrumbs,
  Link
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link as RouterLink } from 'react-router-dom';
import { products } from '../../data/products';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetail = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // id를 이용해 상품 데이터 찾기
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!product) {
    return <Typography>상품을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link component={RouterLink} to="/" color="inherit">
              홈
            </Link>
            <Link 
              component={RouterLink} 
              to={`/category/${product.category.toLowerCase()}`} 
              color="inherit"
            >
              {product.category}
            </Link>
            {product.productType && (
              <Link
                component={RouterLink}
                to={`/category/${product.category.toLowerCase()}/${product.productType}`}
                color="inherit"
              >
                {product.productType}
              </Link>
            )}
            <Typography color="text.primary">{product.name}</Typography>
          </Breadcrumbs>
          
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Rating value={product.rating || 4.5} readOnly precision={0.5} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
            {product.discount > 0 && (
              <Typography variant="h5" color="error.main" sx={{ fontWeight: 'bold' }}>
                {product.discount}%
              </Typography>
            )}
            <Typography variant="h5" color="primary">
              ₩{(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
            </Typography>
          </Box>
          {product.discount > 0 && (
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ textDecoration: 'line-through' }}
            >
              ₩{product.price.toLocaleString()}
            </Typography>
          )}
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 3 }}>
            <TextField
              type="number"
              label="수량"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ width: 100, mr: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{ mr: 2 }}
            >
              장바구니
            </Button>
            <Button variant="outlined" startIcon={<FavoriteIcon />}>
              찜하기
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleTabChange}>
            <Tab label="상품상세" />
            <Tab label="리뷰" />
            <Tab label="Q&A" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {product.description}
        </TabPanel>
        <TabPanel value={value} index={1}>
          상품 리뷰가 들어갑니다.
        </TabPanel>
        <TabPanel value={value} index={2}>
          상품 Q&A가 들어갑니다.
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ProductDetail;