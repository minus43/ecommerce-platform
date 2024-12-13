// src/pages/user/MyPage.js
import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Avatar,
  Tabs,
  Tab,
  List,
  TextField
} from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  LocalOffer as CouponIcon,
  QuestionAnswer as InquiryIcon,
  Help as QnaIcon,
  Stars as MembershipIcon,
  Payment as PaymentIcon,
  ExitToApp as WithdrawalIcon
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
  const userInfo = {
    name: '홍길동',
    email: 'user@example.com',
    phone: '010-1234-5678',
    level: 'GOLD',
    point: 3000
  };

  const menuItems = [
    { title: '주문조회', icon: <ShoppingBagIcon />, component: OrderHistory },
    { title: '찜 리스트', icon: <FavoriteIcon />, component: WishList },
    { title: '쿠폰함', icon: <CouponIcon />, component: Coupons },
    { title: '회원정보', icon: <PersonIcon />, component: ProfileEdit },
    { title: '상품문의 내역', icon: <InquiryIcon />, component: ProductInquiries },
    { title: '1:1 문의 내역', icon: <QnaIcon />, component: CustomerInquiries },
    { title: '등급안내', icon: <MembershipIcon />, component: MembershipInfo },
    { title: '결제수단', icon: <PaymentIcon />, component: PaymentMethods },
    { title: '배송지관리', icon: <LocationIcon />, component: AddressManagement },
    { title: '회원탈퇴', icon: <WithdrawalIcon />, component: Withdrawal }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* 사용자 정보 요약 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 64, height: 64 }}>{userInfo.name[0]}</Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">{userInfo.name}님</Typography>
            <Typography color="text.secondary">회원등급: {userInfo.level}</Typography>
            <Typography color="text.secondary">포인트: {userInfo.point.toLocaleString()}P</Typography>
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
          {menuItems.map((item, index) => (
            <Tab key={item.title} icon={item.icon} label={item.title} />
          ))}
        </Tabs>

        {menuItems.map((item, index) => (
          <TabPanel key={item.title} value={tabValue} index={index}>
            <item.component />
          </TabPanel>
        ))}
      </Paper>
    </Container>
  );
}

// 각 탭에 대한 컴포넌트들
const OrderHistory = () => (
  <List>
    <Typography>주문 내역이 들어갈 예정입니다.</Typography>
  </List>
);

const WishList = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography>찜 목록이 들어갈 예정입니다.</Typography>
    </Grid>
  </Grid>
);

const Coupons = () => (
  <List>
    <Typography>쿠폰함 내용이 들어갈 예정입니다.</Typography>
  </List>
);

const ProfileEdit = () => (
  <Box component="form" noValidate>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="이름"
          defaultValue="홍길동"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="이메일"
          defaultValue="user@example.com"
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="전화번호"
          defaultValue="010-1234-5678"
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

const ProductInquiries = () => (
  <List>
    <Typography>상품문의 내역이 들어갈 예정입니다.</Typography>
  </List>
);

const CustomerInquiries = () => (
  <List>
    <Typography>1:1 문의 내역이 들어갈 예정입니다.</Typography>
  </List>
);

const MembershipInfo = () => (
  <Box>
    <Typography>등급안내 내용이 들어갈 예정입니다.</Typography>
  </Box>
);

const PaymentMethods = () => (
  <Box>
    <Typography>결제수단 관리 내용이 들어갈 예정입니다.</Typography>
  </Box>
);

const AddressManagement = () => (
  <List>
    <Typography>배송지 관리 내용이 들어갈 예정입니다.</Typography>
  </List>
);

const Withdrawal = () => (
  <Box>
    <Typography variant="h6" color="error" gutterBottom>
      회원 탈퇴
    </Typography>
    <Typography color="text.secondary" paragraph>
      회원 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
    </Typography>
    <Button variant="contained" color="error">
      회원 탈퇴
    </Button>
  </Box>
);

export default MyPage;