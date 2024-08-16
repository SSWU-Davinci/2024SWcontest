import { fetchData } from './logData.js';
import { getThemeNumber } from './themaNumCnt.js';

export async function getRandomSet() {
    try {
        const data = await fetchData(); // fetchData()의 결과를 기다림
        if (data) {
            let selectedSet = []; // 세트 저장 배열 초기화

            // 각 테마에 대해 랜덤한 세트를 선택
            data.forEach(theme => {
                const sets = theme.set_number;
                const randomIndex = Math.floor(Math.random() * sets.length);
                const randomSet = sets[randomIndex];
                selectedSet.push(randomSet);
            });

            console.log('뽑아온 대사: ', selectedSet);
            return selectedSet; // Promise 반환
        } else {
            throw new Error('Failed to load data.');
        }
    } catch (error) {
        console.error('Error during initialization:', error);
        throw error; // 에러를 다시 throw 해서 호출한 쪽에서 처리하게 함
    }
}

  // logData = 스테이지에 맞는 theme_number의 대사 묶음
 export async function loadData() {
    try {
      let themeNumber = getThemeNumber();
      console.log('스테이지: ', themeNumber);

      //랜덤으로 대사 세트를 뽑아온다
      let data = await getRandomSet();

      if (data && data.length > 0) {
        // themeNumber에 해당하는 대사 묶음 선택
        return data[themeNumber - 1];
      } else {
        console.log('비어있는 대사 오류');
      }
    } catch (error) {
      console.error('데이터 로드 중 오류', error);
    }
  }

  loadData();