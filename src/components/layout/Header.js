// src/components/layout/Header.js
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  InputBase,
  styled,
  Link
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { categoryList, categories } from '../../data/products';

// 검색창 스타일 컴포넌트
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  width: '100%',
  maxWidth: '600px',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const pages = ['이달의베스트', '판매자특가', '계절히트상품'];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenCategoryMenu = (event) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElCategory(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {/* 상단 툴바 - 로고와 검색창 */}
        <Toolbar disableGutters>
          {/* 로고 */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* 중앙 검색창 */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="검색어를 입력하세요"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>

          {/* 우측 아이콘들 */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* 장바구니 아이콘 */}
            <IconButton 
              color="inherit" 
              component={RouterLink} 
              to="/cart"
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* 사용자 메뉴 */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem component={RouterLink} to="/mypage" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">마이페이지</Typography>
              </MenuItem>
              <MenuItem component={RouterLink} to="/login" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">로그인</Typography>
              </MenuItem>
            </Menu>

            <Button
              color="inherit"
              startIcon={<HelpIcon />}
              component={RouterLink}
              to="/customer-service"
            >
              고객센터
            </Button>
          </Box>
        </Toolbar>

        {/* 하단 툴바 - 카테고리와 메뉴 */}
        <Toolbar disableGutters sx={{ mt: 1 }}>
          {/* 카테고리 메뉴 */}
          <Button
            color="inherit"
            onClick={handleOpenCategoryMenu}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ mr: 4 }}
          >
            카테고리
          </Button>
          <Menu
            anchorEl={anchorElCategory}
            open={Boolean(anchorElCategory)}
            onClose={handleCloseCategoryMenu}
            sx={{
              mt: '10px',
              '& .MuiPaper-root': {
                width: '250px',
                maxHeight: '400px'
              }
            }}
          >
            {categoryList.map((category) => (
              <MenuItem
                key={category}
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  py: 2
                }}
              >
                <Link
                  component={RouterLink}
                  to={`/category/${category.toLowerCase()}`}
                  onClick={handleCloseCategoryMenu}
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  {category}
                </Link>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  mt: 1
                }}>
                  {categories[category].map((subCategory, index) => (
                    <Link
                      key={index}
                      component={RouterLink}
                      to={`/category/${category.toLowerCase()}/${subCategory}`}
                      onClick={handleCloseCategoryMenu}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {subCategory}
                    </Link>
                  ))}
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* 메인 메뉴 */}
          {pages.map((page) => (
            <Button
              key={page}
              component={RouterLink}
              to={`/${page.toLowerCase()}`}
              sx={{ 
                color: 'white',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {page}
            </Button>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;