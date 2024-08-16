// Firebase Realtime Database URL
const url = 'https://swcontest-e2cf1-default-rtdb.firebaseio.com/.json';

// 데이터 가져오기 함수
async function fetchData() {
  try {
    // fetch를 사용하여 데이터 요청
    const response = await fetch(url);
    
    // 응답 상태 코드가 200 (정상)인지 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // JSON 형태로 응답 데이터 파싱
    const data = await response.json();
    
    // JSON 데이터 출력
    console.log(data);
    return data;

  } catch (error) {
    // 에러 처리
    console.error('Error fetching data:', error);
  }
}

export {fetchData};
