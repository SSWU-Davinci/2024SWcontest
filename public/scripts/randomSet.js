// JSON 대사 파일 불러오기
const log = require('../log/log.json');

function getRandomSet() {
    const selectedSet = [];         // 세트 저장 배열 초기화

    // 우선 전체 데이터에서 테마별 대사 묶음들 나누기
    let themaScriptLines = [];          // 테마별 대사들 저장 배열 초기화
    if (theme_number == "차별") {
        themaScriptLines = log.filter(scriptLines => scriptLines.theme_number == "차별");
    }
    else if (theme_number == "환경") {
        themaScriptLines = log.filter(scriptLines => scriptLines.theme_number == "환경");
    }
    else if (theme_number == "악의") {
        themaScriptLines = log.filter(scriptLines => scriptLines.theme_number == "악의");
    }

    const setNumber = [1, 2, 3];            // set_number 1, 2, 3 배열로 따로 저장
    const randomSetNumber = setNumber[Math.floor(Math.random() * setNumber.length)];            // 1, 2, 3 중에 랜덤으로 선택하여 저장

    // 해당 테마에서 randomSetNumber에 해당하는 대사들만 selectedSet에 저장하기
    themaScriptLines.forEach(scriptLines => {
        if (scriptLines.set_number === randomSetNumber) {
            selectedSet.push(scriptLines);
        }
    });

    return selectedSet;
}

// getRandomSet 함수 export
module.exports = getRandomSet;


// data{ [테마넘버 1인 대사들], [ 테마2], [테마3]}
// [테마1] 배열은 {[세트1], [세트2], [세트3], [세트4]}