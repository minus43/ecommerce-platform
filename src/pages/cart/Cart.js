// src/pages/cart/Cart.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Checkbox,
  TextField,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart() {
  const navigate = useNavigate();
  // 장바구니 아이템 상태
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "상품 1",
      price: 29000,
      quantity: 1,
      image: "https://source.unsplash.com/random?product=1",
      selected: true
    },
    {
      id: 2,
      name: "상품 2",
      price: 39000,
      quantity: 2,
      image: "https://source.unsplash.com/random?product=2",
      selected: true
    }
  ]);

  // 수량 변경 핸들러
  const handleQuantityChange = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  // 상품 삭제 핸들러
  const handleDelete = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // 체크박스 핸들러
  const handleSelect = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  // 전체 선택 핸들러
  const handleSelectAll = (event) => {
    setCartItems(cartItems.map(item => ({ ...item, selected: event.target.checked })));
  };

  // 총 금액 계산
  const totalPrice = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }

    // 선택된 상품 정보를 state로 전달
    navigate('/checkout', { 
      state: { 
        items: selectedItems,
        totalPrice: totalPrice,
        totalQuantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0)
      } 
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>
        장바구니
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={handleSelectAll}
                  checked={cartItems.length > 0 && cartItems.every(item => item.selected)}
                  indeterminate={cartItems.some(item => item.selected) && !cartItems.every(item => item.selected)}
                />
              </TableCell>
              <TableCell>상품정보</TableCell>
              <TableCell align="right">가격</TableCell>
              <TableCell align="center">수량</TableCell>
              <TableCell align="right">합계</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={item.selected}
                    onChange={() => handleSelect(item.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 50, height: 50, marginRight: 16 }}
                    />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ₩{item.price.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton 
                      size="small"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      size="small"
                      value={item.quantity}
                      inputProps={{ 
                        style: { textAlign: 'center' },
                        readOnly: true
                      }}
                      sx={{ width: 60, mx: 1 }}
                    />
                    <IconButton 
                      size="small"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ₩{(item.price * item.quantity).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            결제 정보
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>상품 금액</Typography>
            <Typography>₩{totalPrice.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>배송비</Typography>
            <Typography>₩3,000</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">총 결제금액</Typography>
            <Typography variant="h6" color="primary">
              ₩{(totalPrice + 3000).toLocaleString()}
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            onClick={handleCheckout}
          >
            주문하기
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Cart;