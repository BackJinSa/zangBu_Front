#!/usr/bin/env node

/**
 * 지도 API 테스트 스크립트
 * 백엔드 API가 정상적으로 작동하는지 확인합니다.
 */

const https = require('https');
const http = require('http');

// 테스트 설정
const API_BASE_URL = 'https://api.zanbu.site';
const TEST_DATA = [
  {
    address: "서울특별시 강남구 테헤란로 123",
    building_name: "삼성빌딩"
  },
  {
    address: "서울특별시 마포구 양화로 45", 
    building_name: "홍익타워"
  }
];

console.log('🗺️  지도 API 테스트 시작...\n');

// API 테스트 함수
function testMapAPI() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(TEST_DATA);
    
    const options = {
      hostname: 'api.zanbu.site',
      port: 443,
      path: '/map/list',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        // 실제 토큰이 있다면 추가
        // 'Authorization': 'Bearer YOUR_TOKEN'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          resolve({ status: res.statusCode, data: data, error: 'JSON 파싱 실패' });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// 개발 서버 확인 함수
function checkDevServer() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5173,
      path: '/',
      method: 'GET'
    }, (res) => {
      resolve(true);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// 메인 테스트 실행
async function runTests() {
  try {
    // 1. 개발 서버 확인
    console.log('1️⃣  개발 서버 확인...');
    const isDevServerRunning = await checkDevServer();
    
    if (isDevServerRunning) {
      console.log('✅ 개발 서버 실행 중 (http://localhost:5173)');
    } else {
      console.log('❌ 개발 서버가 실행되지 않았습니다');
      console.log('   💡 해결방법: npm run dev 실행');
    }

    console.log('');

    // 2. 백엔드 API 테스트
    console.log('2️⃣  백엔드 API 테스트...');
    console.log('📤 요청 데이터:');
    console.log(JSON.stringify(TEST_DATA, null, 2));
    console.log('');

    const result = await testMapAPI();
    
    if (result.status === 200) {
      console.log('✅ API 연동 성공!');
      console.log('📥 응답 데이터:');
      console.log(JSON.stringify(result.data, null, 2));
      
      // 응답 데이터 검증
      if (Array.isArray(result.data) && result.data.length > 0) {
        const firstItem = result.data[0];
        if (firstItem.lat && firstItem.lng && firstItem.address && firstItem.building_name) {
          console.log('✅ 응답 형식 올바름');
        } else {
          console.log('⚠️  응답 형식이 예상과 다릅니다');
        }
      }
    } else {
      console.log(`❌ API 호출 실패 (${result.status})`);
      console.log('📥 응답:', result.data);
      
      if (result.error) {
        console.log('❌ 에러:', result.error);
      }
    }

  } catch (error) {
    console.log('❌ 테스트 실행 중 에러 발생:');
    console.log(error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 백엔드 서버가 실행되지 않았을 수 있습니다');
    } else if (error.code === 'ENOTFOUND') {
      console.log('💡 DNS 해석 실패 - 네트워크 연결을 확인하세요');
    }
  }

  console.log('\n📋 다음 단계:');
  console.log('1. 브라우저에서 http://localhost:5173/map/test 접속');
  console.log('2. "API 테스트 실행" 버튼 클릭');
  console.log('3. 개발자 도구 콘솔 확인');
  console.log('4. 필터와 검색 기능 테스트');
  console.log('\n📚 자세한 가이드: TEST_GUIDE.md 파일 참조');
}

// 스크립트 실행
runTests();