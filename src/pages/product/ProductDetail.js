// src/pages/product/ProductDetail.js
import { useState } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { products } from '../../data/products';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProductDetail = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // 상품 ID로 상품 정보 찾기
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <Typography>상품을 찾을 수 없습니다.</Typography>;
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const discountedPrice = product.price * (1 - product.discount/100);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* 브레드크럼브 네비게이션 */}
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
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover'
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            gutterBottom
          >
            {product.brand}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Rating value={product.rating || 4.5} readOnly precision={0.5} />
          
          <Box sx={{ my: 3 }}>
            {product.discount > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography 
                  variant="h5" 
                  color="error.main" 
                  sx={{ fontWeight: 'bold' }}
                >
                  {product.discount}% OFF
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ textDecoration: 'line-through' }}
                >
                  ₩{product.price.toLocaleString()}
                </Typography>
              </Box>
            )}
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
              ₩{discountedPrice.toLocaleString()}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 3 }}>
            <TextField
              type="number"
              label="수량"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ width: 100, mr: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{ mr: 2 }}
              onClick={() => {
                // 장바구니 추가 로직
                alert('장바구니에 추가되었습니다.');
              }}
            >
              장바구니
            </Button>
            <Button
              variant="outlined"
              startIcon={<FavoriteIcon />}
              onClick={() => {
                // 찜하기 로직
                alert('찜 목록에 추가되었습니다.');
              }}
            >
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
          <Typography variant="body1">
            {product.detailDescription || '상품 상세 정보가 준비중입니다.'}
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="body1">
            상품 리뷰가 준비중입니다.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="body1">
            상품 Q&A가 준비중입니다.
          </Typography>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ProductDetail;