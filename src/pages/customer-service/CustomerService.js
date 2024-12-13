// src/pages/customer-service/CustomerService.js
import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  TextField,
  Grid
} from '@mui/material';
import {
  Announcement as NoticeIcon,
  QuestionAnswer as FAQIcon,
  Email as InquiryIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CustomerService = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const menuItems = [
    { title: '공지사항', icon: <NoticeIcon />, component: Notice },
    { title: 'FAQ', icon: <FAQIcon />, component: FAQ },
    { title: '1:1 문의', icon: <InquiryIcon />, component: Inquiry },
    { title: '채팅상담', icon: <ChatIcon />, component: Chat }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        고객센터
      </Typography>
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
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
};

// 공지사항 컴포넌트
const Notice = () => {
  const notices = [
    { id: 1, title: '서비스 업데이트 안내', date: '2024-01-15', content: '서비스 업데이트 내용...' },
    { id: 2, title: '개인정보처리방침 변경 안내', date: '2024-01-10', content: '개인정보처리방침 변경사항...' },
    // ... 더 많은 공지사항
  ];

  return (
    <List>
      {notices.map((notice) => (
        <Box key={notice.id}>
          <ListItem button>
            <ListItemText
              primary={notice.title}
              secondary={notice.date}
            />
          </ListItem>
          <Divider />
        </Box>
      ))}
    </List>
  );
};

// FAQ 컴포넌트
const FAQ = () => {
  const faqs = [
    { id: 1, question: '배송은 얼마나 걸리나요?', answer: '일반적으로 2-3일 소요됩니다.' },
    { id: 2, question: '반품/교환은 어떻게 하나요?', answer: '고객센터로 문의해주세요.' },
    // ... 더 많은 FAQ
  ];

  return (
    <List>
      {faqs.map((faq) => (
        <Box key={faq.id}>
          <ListItem button>
            <ListItemText
              primary={faq.question}
              secondary={faq.answer}
            />
          </ListItem>
          <Divider />
        </Box>
      ))}
    </List>
  );
};

// 1:1 문의 컴포넌트
const Inquiry = () => {
  return (
    <Box component="form" noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="제목"
            placeholder="문의 제목을 입력해주세요"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="문의 내용"
            placeholder="문의하실 내용을 상세히 적어주세요"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth>
            문의하기
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

// 채팅상담 컴포넌트
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const handleStartChat = () => {
    setShowChat(true);
    // 채팅 시작 시 연결 시도
    setTimeout(() => {
      setConnected(true); // 실제로는 WebSocket 연결 성공 시 호출
      setMessages(prev => [...prev, {
        sender: 'system',
        content: '상담사와 연결되었습니다. 문의하실 내용을 입력해주세요.'
      }]);
    }, 2000); // 테스트를 위한 2초 지연
  };

  const handleDisconnect = () => {
    setConnected(false);
    setMessages(prev => [...prev, {
      sender: 'system',
      content: '채팅이 종료되었습니다.'
    }]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && connected) {
      setMessages([...messages, { sender: 'user', content: inputMessage.trim() }]);
      setInputMessage('');
      
      // 테스트용 자동 응답
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'counselor',
          content: '상담사 답변입니다. 어떤 도움이 필요하신가요?'
        }]);
      }, 1000);
    }
  };

  // 컴포넌트 언마운트 시 연결 종료
  useEffect(() => {
    return () => {
      if (connected) {
        handleDisconnect();
      }
    };
  }, [connected]);

  return (
    <Box>
      {!showChat ? (
        // 상담 시작 전 안내 화면
        <Box>
          <Typography variant="h6" gutterBottom>
            채팅상담 안내
          </Typography>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              상담 가능 시간
            </Typography>
            <Typography paragraph>
              평일 09:00 - 18:00
              <br />
              점심시간 12:00 - 13:00
              <br />
              주말 및 공휴일 휴무
            </Typography>

            <Typography variant="subtitle1" color="primary" gutterBottom>
              상담 전 주의사항
            </Typography>
            <Typography component="div" paragraph>
              <ul>
                <li>주문번호나 상품정보를 미리 준비해주시면 더 빠른 상담이 가능합니다.</li>
                <li>욕설, 비방, 음란성 내용이 포함된 경우 상담이 제한될 수 있습니다.</li>
                <li>상담 내용은 서비스 품질 향상을 위해 저장됩니다.</li>
                <li>상담사 연결까지 대기시간이 발생할 수 있습니다.</li>
              </ul>
            </Typography>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleStartChat}
              >
                위 내용을 확인했으며, 상담 시작하기
              </Button>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color={connected ? "success" : "error"}>
              {connected ? "상담사와 연결되었습니다" : "상담사 연결 대기중..."}
            </Typography>
            {connected && (
              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                onClick={handleDisconnect}
              >
                상담 종료
              </Button>
            )}
          </Box>
          
          <Box 
            sx={{ 
              height: 400, 
              overflow: 'auto', 
              bgcolor: 'background.paper', 
              p: 2, 
              mb: 2,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            {messages.map((msg, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mb: 1,
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  ...(msg.sender === 'system' && {
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontSize: '0.875rem'
                  })
                }}
              >
                {msg.sender !== 'system' && (
                  <Typography variant="body2" color="text.secondary">
                    {msg.sender === 'user' ? '나' : '상담사'}
                  </Typography>
                )}
                <Typography 
                  sx={{ 
                    display: 'inline-block',
                    bgcolor: msg.sender === 'user' ? 'primary.light' : 
                           msg.sender === 'system' ? 'transparent' : 'grey.100',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    p: msg.sender === 'system' ? 0 : 1,
                    borderRadius: 1
                  }}
                >
                  {msg.content}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={connected ? "메시지를 입력하세요" : "상담사 연결 대기중입니다..."}
              disabled={!connected}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              InputProps={{
                endAdornment: (
                  <Button 
                    variant="contained" 
                    disabled={!connected}
                    onClick={handleSendMessage}
                    sx={{ ml: 1 }}
                  >
                    전송
                  </Button>
                )
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomerService;