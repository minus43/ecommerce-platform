// src/pages/product/ProductList.js
import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  CardActions,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { products } from '../../data/products';

const ProductList = () => {
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>정렬</InputLabel>
            <Select
              value={sortBy}
              label="정렬"
              onChange={handleSortChange}
            >
              <MenuItem value="price_asc">가격 낮은순</MenuItem>
              <MenuItem value="price_desc">가격 높은순</MenuItem>
              <MenuItem value="newest">최신순</MenuItem>
              <MenuItem value="popular">인기순</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="상품 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₩{product.price.toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="add to cart">
                  <ShoppingCartIcon />
                </IconButton>
                <Button 
                  size="small" 
                  color="primary"
                  component={RouterLink}
                  to={`/product/${product.id}`}
                >
                  상세보기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;