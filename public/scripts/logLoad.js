import { getThemeNumber } from './themaNumCnt.js';
import { setCriminal, setFire } from './criminal.js';
//import { fetchData } from './logData.js';
import { getRandomSet, loadData } from './randomSet.js';

document.addEventListener("DOMContentLoaded", async function () {
  const animalClass = document.querySelectorAll(".animal");
  const dialogue = document.getElementById("dialogue");
  const name_text = document.getElementById("name_text");

  let logData = []; // 데이터를 저장할 배열
  const animalData = []; // 동물 데이터 저장할 배열 

  let index = 0; // 클릭할 때마다 증가시킬 인덱스
  const animalClicked = new Set(); // 클릭된 동물들을 저장
  let allAnimalClicked = false; // 모든 동물이 클릭되었는지 확인
  let finalClick = false; // 모든 대사를 확인한 후 클릭 필요 여부

  // 동물 ID와 한국어 이름의 매칭
  const animalName = {
    fish: '물고기',
    pig: '멧돼지',
    giraffe: '기린',
    bear: '북극곰'
  };

  try {
    logData = await loadData();
    console.log('스테이지 대사 목록: ', logData);

    animalClass.forEach(animal => {
      animal.addEventListener("click", main);
    });
  } catch (error) {
    console.error('데이터 로드 중 오류', error);
  }

  function main(event) {
    const animal = event.currentTarget;

    // 클릭된 동물의 ID 콘솔에 출력
    console.log("animal ID:", animal.id);
    // 현재 인덱스 콘솔에 출력
    console.log("index", index);

    if (finalClick) {
      resetAnimalStyles();
      selectAnimalStyle();
      name_text.textContent = "햄부장";
      dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
      chooseCriminal();
      setFire(1);
      return
    }

    if (logData.scripts.length > 0 && index < logData.scripts.length) {
      let currentLog = logData.scripts[index]; // 내보낼 대사
      let criminalValue = currentLog.criminal; // criminal 값은 logData에 있다
      // exception이 배열인 경우 체크해서 저장
      let exception = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
      let n = index; // 범인은 index 카운트에서 제외하기 위한 임시 변수

      // 동물 ID에 해당하는 한국어 이름 설정
      name_text.textContent = animalName[animal.id] || animal.id;

      // 클릭 된 동물 대사 출력
      if (exception.includes(animal.id)) {
        // 예외 동물인 경우
        while (exception.includes(animal.id)) {
          if (n < logData.length) {
            n++; // 예외 대사라면 그 다음 대사로 업데이트
            currentLog = logData[n];
            criminalValue = currentLog.criminal; // 범인 값도 같이 업데이트
            exception = Array.isArray(currentLog.exception) ? currentLog.exception : [currentLog.exception];
          } else {
            break; // 마지막 대사까지 도달
          }
        }
        dialogue.textContent = currentLog.line;
      } else {
        dialogue.textContent = currentLog.line;
        index++; // 다음 인덱스로 이동
      }
      addAnimalData(animal.id, criminalValue); // 클릭된 동물 데이터 저장
    }

    // 클릭된 동물을 set에 추가
    animalClicked.add(animal.id);

    // 모든 동물이 클릭되었다면
    if (animalClicked.size === animalClass.length) {
      allAnimalClicked = true;
      finalClick = 1;
      setFire(1);
    }


    // 동물 앞으로 나오게
    animalClass.forEach(a => {
      a.style.transform = "";
      a.style.zIndex = "1";
    });

    animal.style.transform = "translate(0px, -35%) scale(1.7)";
    animal.style.zIndex = "10";

    if (!allAnimalClicked) {
      // 4명 다 확인 안하면 2번 클릭 못하도록
      animal.removeEventListener("click", main);
    }
  }

  // 배경 클릭 시 동물 크기 리셋
  document.addEventListener("click", function (event) {
    if (!event.target.classList.contains("animal")) {
      if (finalClick || allAnimalClicked) {
        // 모든 대사를 확인한 후 배경을 클릭했을 때
        resetAnimalStyles();
        selectAnimalStyle();
        name_text.textContent = "햄부장";
        dialogue.textContent = "모든 직원을 확인했뵤! 해고할 직원을 골라뵤~~";
        chooseCriminal();
        setFire(1);
      } else {
        // 클릭된 곳이 동물이 아닌 경우에 스타일 리셋
        animalClass.forEach(a => {
          a.style.transform = "";
          a.style.zIndex = "1";
        });
        // 아직 모든 대사를 보지 않았음
        if (index < logData.length) {
          name_text.textContent = "햄부장";
          dialogue.textContent = "신중하게 모든 직원을 확인해뵤...";
        }
      }
    }
  });


  ////////////////////////////////// 함수 //////////////////////////////////

  animalClass.forEach(animal => {
    animal.addEventListener("click", main);
  });

  // 동물 데이터를 배열에 저장
  function addAnimalData(animalId, criminalValue) {
    // 데이터 저장을 위한 구조체
    const animalCriminal = {
      id: animalId,
      criminal: criminalValue
    };

    // 객체를 배열에 추가
    animalData.push(animalCriminal);
    // 배열에 제대로 추가되었는지 확인
    console.log("동물의 정보: ", animalId, animalCriminal);
    console.log("현재 animalData 배열 상태:", animalData);
  }

  // 동물의 범죄 값을 받아온다
  function criminalData(id) {
    const animal = animalData.find(animal => animal.id === id);
    return animal ? animal.criminal : null;
  }

  // 범인을 고르면 범죄 여부를 받아온다
  function chooseCriminal() {
    animalClass.forEach(animal => {
      animal.addEventListener("click", () => {
        const criminalValue = criminalData(animal.id);
        console.log('범인 값', criminalValue);
        if (!(criminalValue === null)) {
          console.log(`동물 ID: ${animal.id}, Criminal: ${criminalValue}`);
          setCriminal(criminalValue);
        } else {
          console.log(`동물 ID: ${animal.id}에 해당하는 Criminal 값을 찾을 수 없습니다.`);
        }
      });
    });
  }


  // 동물들의 크기 및 위치를 초기 상태로 되돌리는 함수
  function resetAnimalStyles() {
    animalClass.forEach(a => {
      a.style.transform = "";
      a.style.zIndex = "1";
      a.style.animation = "";
    });
  }

  // 동물을 선택하게 유도하는 애니메이션
  function selectAnimalStyle() {
    // 클릭된 동물에게 커졌다 작아졌다 하는 애니메이션 적용
    animalClass.forEach(animal => {
      animal.addEventListener("click", function () {
        animal.style.animationName = "bounceClick";
        animal.style.animationDuration = "1s";
        animal.style.animationTimingFunction = "ease-in-out";
        animal.style.animationIterationCount = "1";
        animal.style.zIndex = "2";
      });
    });
  }



  ////////////////////////////////// 애니메이션 //////////////////////////////////

  const style = document.createElement('style');
  style.innerHTML = `
        @keyframes bounce {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
    
        @keyframes bounceClick {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.3);
            }
        }
    `;
  document.head.appendChild(style);
});