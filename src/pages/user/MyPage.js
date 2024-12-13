// src/pages/user/MyPage.js
import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  List,
  Button,
  Avatar,
  TextField
} from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// 탭 패널 컴포넌트
function TabPanel({ children, value, index, ...other }) {
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

function MyPage() {
  const [tabValue, setTabValue] = useState(0);
  const [userInfo] = useState({
    name: '홍길동',
    email: 'user@example.com',
    phone: '010-1234-5678',
    level: 'GOLD',
    point: 3000
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 주문 내역 컴포넌트
  const OrderHistory = () => (
    <List>
      {[1, 2, 3].map((order) => (
        <Paper key={order} sx={{ mb: 2, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">
              주문번호: ORDER-2024-{order}
            </Typography>
            <Typography color="primary">
              배송완료
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <img
              src={`https://source.unsplash.com/random?product=${order}`}
              alt="Product"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <Box>
              <Typography variant="h6">상품명 {order}</Typography>
              <Typography color="text.secondary">
                ₩{(order * 10000).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                주문일자: 2024-01-{order}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small">주문상세</Button>
            <Button variant="outlined" size="small">배송조회</Button>
            <Button variant="outlined" size="small">리뷰작성</Button>
          </Box>
        </Paper>
      ))}
    </List>
  );

  // 찜 목록 컴포넌트
  const WishList = () => (
    <Grid container spacing={2}>
      {[1, 2, 3, 4].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card>
            <img
              src={`https://source.unsplash.com/random?wishlist=${item}`}
              alt={`Wishlist item ${item}`}
              style={{ width: '100%', height: 200, objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6">찜한상품 {item}</Typography>
              <Typography color="text.secondary">
                ₩{(item * 15000).toLocaleString()}
              </Typography>
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                장바구니 담기
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // 회원정보 수정 컴포넌트
  const ProfileEdit = () => (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 100, height: 100, mr: 2 }}>
              {userInfo.name[0]}
            </Avatar>
            <Button variant="outlined">프로필 이미지 변경</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="이름"
            defaultValue={userInfo.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="이메일"
            defaultValue={userInfo.email}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="전화번호"
            defaultValue={userInfo.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth>
            정보 수정
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  // 배송지 관리 컴포넌트
  const AddressManagement = () => (
    <Box>
      <Button variant="contained" sx={{ mb: 2 }}>
        새 배송지 추가
      </Button>
      <List>
        {[1, 2].map((address) => (
          <Paper key={address} sx={{ mb: 2, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {address === 1 ? '집' : '회사'}
                {address === 1 && ' (기본배송지)'}
              </Typography>
              <Box>
                <Button size="small">수정</Button>
                <Button size="small" color="error">삭제</Button>
              </Box>
            </Box>
            <Typography>서울시 강남구 테헤란로 123</Typography>
            <Typography color="text.secondary">010-1234-5678</Typography>
          </Paper>
        ))}
      </List>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* 사용자 정보 요약 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 64, height: 64 }}>
              {userInfo.name[0]}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">{userInfo.name}님</Typography>
            <Typography color="text.secondary">
              회원등급: {userInfo.level}
            </Typography>
            <Typography color="text.secondary">
              포인트: {userInfo.point.toLocaleString()}P
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* 탭 메뉴 */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<ShoppingBagIcon />} label="주문내역" />
          <Tab icon={<FavoriteIcon />} label="찜 목록" />
          <Tab icon={<PersonIcon />} label="회원정보 수정" />
          <Tab icon={<LocationIcon />} label="배송지 관리" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <OrderHistory />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <WishList />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ProfileEdit />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <AddressManagement />
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default MyPage;