// 제품 이름 생성을 위한 보조 데이터
const brands = {
  Electronics: ['삼성', 'LG', '애플', '소니', '필립스', '샤오미', '화웨이', '파나소닉', '브라운', '다이슨'],
  Fashion: ['나이키', '아디다스', '자라', '유니클로', 'H&M', '구찌', '프라다', '버버리', '폴로', '라코스테'],
  Home: ['이케아', '한샘', '시몬스', '템퍼', '일룸', '까사미아', '무인양품', '데스커', '에이스', '코웨이'],
  Beauty: ['랑콤', '에스티로더', '맥', '이니스프리', '설화수', '비오템', '라네즈', '헤라', '시세이도', '스킨푸드'],
  Sports: ['휠라', '푸마', '언더아머', '뉴발란스', '리복', '아식스', '미즈노', '데상트', '스파이더', '케이스위스']
};

const categories = {
  Electronics: [
    '스마트폰', '노트북', '태블릿', '이어폰', '헤드폰', '스마트워치', 
    '블루투스 스피커', '공기청정기', '모니터', '키보드', '마우스', 'TV',
    '게이밍 노트북', '청소기', '냉장고', '세탁기', '건조기', '에어컨'
  ],
  Fashion: [
    '티셔츠', '청바지', '재킷', '코트', '원피스', '스커트', '셔츠', 
    '니트', '패딩', '후드티', '스웨터', '블라우스', '슬랙스', '수트'
  ],
  Home: [
    '소파', '침대', '식탁', '의자', '책상', '옷장', '수납장', 
    '매트리스', '커튼', '조명', '거실장', '화장대', '책장'
  ],
  Beauty: [
    '스킨케어', '선크림', '파운데이션', '립스틱', '아이섀도우', 
    '마스카라', '향수', '샴푸', '바디로션', '클렌저', '세럼'
  ],
  Sports: [
    '운동화', '러닝화', '트레이닝복', '요가매트', '테니스라켓',
    '골프클럽', '수영복', '스키복', '등산복', '자전거'
  ]
};

// 카테고리 리스트와 브랜드 리스트 생성
const categoryList = Object.keys(categories);
const brandList = brands;

// 가격 범위 설정
const priceRanges = {
  Electronics: { min: 50000, max: 2000000 },
  Fashion: { min: 20000, max: 300000 },
  Home: { min: 30000, max: 1000000 },
  Beauty: { min: 10000, max: 100000 },
  Sports: { min: 20000, max: 500000 }
};

// 랜덤 가격 생성 함수
const getRandomPrice = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 랜덤 평점 생성 함수
const getRandomRating = () => {
  return (Math.random() * 2 + 3).toFixed(1); // 3.0 ~ 5.0
};

// 500개의 제품 데이터 생성
const generateProducts = () => {
  const products = [];
  let id = 1;

  categoryList.forEach(category => {
    const categoryBrands = brands[category];
    const categoryProducts = categories[category];
    const priceRange = priceRanges[category];

    categoryProducts.forEach(productType => {
      categoryBrands.forEach(brand => {
        products.push({
          id: id++,
          name: `${brand} ${productType}`,
          price: getRandomPrice(priceRange.min, priceRange.max),
          description: `${brand}의 ${productType}입니다. 최고의 품질과 디자인을 자랑합니다.`,
          image: `https://source.unsplash.com/random?${productType.replace(' ', '')}`,
          rating: getRandomRating(),
          category: category,
          brand: brand,
          productType: productType,
          stock: Math.floor(Math.random() * 100) + 1,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
          isNew: Math.random() < 0.1,
          discount: Math.random() < 0.2 ? Math.floor(Math.random() * 40) + 10 : 0,
        });
      });
    });
  });

  return products;
};

// 제품 데이터 생성
const generatedProducts = generateProducts();

// exports
export { 
  categoryList, 
  brandList, 
  categories, 
  generatedProducts as products 
};
