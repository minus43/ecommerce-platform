// src/pages/order/Checkout.js
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert
} from '@mui/material';

const steps = ['배송 정보', '결제 수단 선택', '주문 확인'];

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const orderItems = location.state?.orderItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  // 장바구니에서 상품이 전달되지 않았을 경우의 렌더링
  if (orderItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Alert severity="warning">
          주문할 상품이 없습니다.
          <Button 
            color="inherit" 
            size="small" 
            onClick={() => navigate('/cart')}
            sx={{ ml: 2 }}
          >
            장바구니로 돌아가기
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingInfoChange = (event) => {
    setShippingInfo({
      ...shippingInfo,
      [event.target.name]: event.target.value
    });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // 배송 정보 입력 단계
  const ShippingForm = () => (
    <Box component="form" sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="받는 사람"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="연락처"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="배송지 주소"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="배송 메시지"
            name="message"
            value={shippingInfo.message}
            onChange={handleShippingInfoChange}
          />
        </Grid>
      </Grid>
    </Box>
  );

  // 결제 수단 선택 단계
  const PaymentForm = () => (
    <Box sx={{ mt: 3 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">결제 수단 선택</FormLabel>
        <RadioGroup
          name="payment-method"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <FormControlLabel 
            value="card" 
            control={<Radio />} 
            label="신용/체크카드" 
          />
          <FormControlLabel 
            value="transfer" 
            control={<Radio />} 
            label="계좌이체" 
          />
          <FormControlLabel 
            value="phone" 
            control={<Radio />} 
            label="휴대폰 결제" 
          />
          <FormControlLabel 
            value="kakao" 
            control={<Radio />} 
            label="카카오페이" 
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );

  // 주문 확인 단계
  const ReviewForm = () => {
    const shippingFee = 3000;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          주문 상품 정보
        </Typography>
        <List disablePadding>
          {orderItems.map((item) => (
            <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 50, height: 50, marginRight: 16 }}
                />
                <ListItemText
                  primary={item.name}
                  secondary={`${item.quantity}개`}
                />
              </Box>
              <Typography variant="body2">
                ₩{(item.price * item.quantity).toLocaleString()}
              </Typography>
            </ListItem>
          ))}
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="배송비" />
            <Typography variant="body2">
              ₩{shippingFee.toLocaleString()}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="총 결제금액" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              ₩{(totalPrice + shippingFee).toLocaleString()}
            </Typography>
          </ListItem>
        </List>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            배송 정보
          </Typography>
          <Typography gutterBottom>{shippingInfo.name}</Typography>
          <Typography gutterBottom>{shippingInfo.phone}</Typography>
          <Typography gutterBottom>{shippingInfo.address}</Typography>
          {shippingInfo.message && (
            <Typography color="text.secondary">
              배송 메시지: {shippingInfo.message}
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            결제 수단
          </Typography>
          <Typography>
            {paymentMethod === 'card' && '신용/체크카드'}
            {paymentMethod === 'transfer' && '계좌이체'}
            {paymentMethod === 'phone' && '휴대폰 결제'}
            {paymentMethod === 'kakao' && '카카오페이'}
          </Typography>
        </Box>
      </Box>
    );
  };

  const handleSubmit = () => {
    // 여기에 결제 처리 로직 구현
    console.log('주문 정보:', {
      shippingInfo,
      paymentMethod,
      orderItems,
      totalPrice
    });
    
    // 결제 성공 시
    setActiveStep(steps.length);
  };

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
          주문/결제
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <>
            <Alert severity="success" sx={{ mb: 3 }}>
              주문이 완료되었습니다.
            </Alert>
            <Typography variant="subtitle1">
              주문번호: ORDER-{Date.now()}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{ mt: 3 }}
            >
              쇼핑 계속하기
            </Button>
          </>
        ) : (
          <>
            {activeStep === 0 && <ShippingForm />}
            {activeStep === 1 && <PaymentForm />}
            {activeStep === 2 && <ReviewForm />}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  이전
                </Button>
              )}
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              >
                {activeStep === steps.length - 1 ? '결제하기' : '다음'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Checkout;