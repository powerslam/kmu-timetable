import fs from 'fs/promises';
import fetch from 'node-fetch';

import { weeks } from './variables.js';

// 데이터 다운로드
const getDataFromCurl = async (week, dayOfWeek) => {
  // 크롬 개발자도구의 Network 탭을 활용하여
  // 국민대 수강신청 사이트가 어디로부터 데이터를 받아오는지 분석
  // 이 때, 국민대 수강신청 사이트는 요일별로 데이터를 가져올 수 있고, 가장 쉽게 검색코드를 알 수 있었기 때문에
  // 요일별로 데이터를 가져오는 것을 선택
  return await fetch('https://sugang.kookmin.ac.kr/api/subject/public/lectures/conditions/validation/ko', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      'syy': '2023',
      'smtCd': '10',
      'locale': 'ko',
      'searchType': '01', // 요일별 검색
      'daywCd': dayOfWeek, // 일, 월, 화, 수, 목, 금, 토 순 (1 ~ 7)
      'offset': 0,
  
      'limit': null, 'stuno': null, 'subjtCd': null, 'subjtNm': null, 'professorNm': null, 'professorNo': null,
      'lessnLestmCd': null, 'cmpsjCdt': null, 'cmpsjDivCd': null, 'cltrDomnCd': null, 'dghtDivCd': null,
      'univCd': null, 'deprtCd': null, 'bchdmCntcSubjtYn': null, 'srclnLctreLangDivCd': null,
      'studentUnivDeptCd': null, 'scheduleSeq': null, 'grade': null, 'estblCrseDivCd': null,
      'apntPriorSubjtYn': null, 'scheduleDivCd': null
    })
  }).then((res) => res.json())
  .then((json) => {
    // 요일별로 받아온 데이터를
    // original 폴더에 따로 보관하도록 저장
    return fs.writeFile(`../original/${week}.json`, JSON.stringify(json));
  }).catch((error) => { console.error(error); });
}

fs.access('../original', fs.constants.F_OK)
    .then(() => {console.log('downloadData.js: 이미 폴더가 있습니다.')})
    .catch((err) => fs.mkdir('../original'))
    .then(() => {
      console.log('downloadData.js: 폴더 생성 완료')
      return weeks.map(async (week, i) => {
        return await getDataFromCurl(week, i + 1).then(() => console.log(`${week}.json 다운로드 완료`));
      });
    });
