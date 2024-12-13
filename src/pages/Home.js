// src/pages/Home.js
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { products, categoryList } from '../data/products';

// 카테고리별 배경색 설정
const categoryColors = {
  Electronics: {
    light: '#f3f8ff',
    main: '#2196f3',
    gradient: 'linear-gradient(45deg, #bbdefb 0%, #f3f8ff 100%)'
  },
  Fashion: {
    light: '#fff3f0',
    main: '#ff4d4f',
    gradient: 'linear-gradient(45deg, #ffccc7 0%, #fff3f0 100%)'
  },
  Home: {
    light: '#f6ffed',
    main: '#52c41a',
    gradient: 'linear-gradient(45deg, #d9f7be 0%, #f6ffed 100%)'
  },
  Beauty: {
    light: '#fff0f6',
    main: '#eb2f96',
    gradient: 'linear-gradient(45deg, #ffd6e7 0%, #fff0f6 100%)'
  },
  Sports: {
    light: '#f4f0ff',
    main: '#722ed1',
    gradient: 'linear-gradient(45deg, #d3adf7 0%, #f4f0ff 100%)'
  }
};

const Home = () => {
  // 각 카테고리별 현재 페이지 상태 관리
  const [currentPages, setCurrentPages] = useState(
    categoryList.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );

  // 카테고리별로 상품 필터링
  const categoryProducts = categoryList.reduce((acc, category) => {
    acc[category] = products
      .filter(product => product.category === category)
      .slice(0, 30);
    return acc;
  }, {});

  // 페이지 변경 핸들러
  const handlePageChange = (category, direction) => {
    setCurrentPages(prev => {
      const newPage = prev[category] + direction;
      const maxPage = Math.floor(categoryProducts[category].length / 6);
      
      if (newPage < 0 || newPage > maxPage - 1) return prev;
      return { ...prev, [category]: newPage };
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* 메인 배너 */}
      <Paper
        sx={{
          position: 'relative',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?shopping)',
          height: '400px',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Typography variant="h3" color="inherit" gutterBottom>
            Welcome to Our Store
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            최고의 상품을 최저가로 만나보세요
          </Typography>
        </Box>
      </Paper>

      {/* 카테고리별 상품 섹션 */}
      {categoryList.map((category) => (
        <Box 
          key={category} 
          sx={{ 
            mb: 8,
            pb: 4,
            background: categoryColors[category].gradient,
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          {/* 카테고리 헤더 */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            px: 3,
            pt: 3
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold',
                color: categoryColors[category].main
              }}
            >
              {category}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip 
                label="인기상품" 
                sx={{
                  backgroundColor: categoryColors[category].main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: categoryColors[category].main,
                    opacity: 0.9
                  }
                }}
                size="small"
                component={RouterLink}
                to={`/category/${category.toLowerCase()}/popular`}
                clickable
              />
              <Chip 
                label="신상품" 
                sx={{
                  backgroundColor: 'white',
                  color: categoryColors[category].main,
                  borderColor: categoryColors[category].main,
                  '&:hover': {
                    backgroundColor: categoryColors[category].light
                  }
                }}
                variant="outlined"
                size="small"
                component={RouterLink}
                to={`/category/${category.toLowerCase()}/new`}
                clickable
              />
            </Stack>
          </Box>

          {/* 상품 그리드와 네비게이션 */}
          <Box sx={{ position: 'relative', px: 3 }}>
            {/* 왼쪽 화살표 */}
            <IconButton 
              onClick={() => handlePageChange(category, -1)}
              disabled={currentPages[category] === 0}
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: 2,
                '&:hover': { 
                  bgcolor: 'white',
                  color: categoryColors[category].main
                },
                zIndex: 1
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {/* 상품 그리드 */}
            <Grid container spacing={2}>
              {categoryProducts[category]
                .slice(currentPages[category] * 6, (currentPages[category] + 1) * 6)
                .map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card
                      component={RouterLink}
                      to={`/product/${product.id}`}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none',
                        backgroundColor: 'white',
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
                          sx={{ 
                            color: categoryColors[category].main,
                            fontWeight: 'bold'
                          }}
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

            {/* 오른쪽 화살표 */}
            <IconButton 
              onClick={() => handlePageChange(category, 1)}
              disabled={currentPages[category] === Math.floor(categoryProducts[category].length / 6) - 1}
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: 2,
                '&:hover': { 
                  bgcolor: 'white',
                  color: categoryColors[category].main
                },
                zIndex: 1
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default Home;