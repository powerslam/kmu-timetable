import fetch from 'node-fetch';

const res = async (dayOfWeek) => {
  return await fetch('https://sugang.kookmin.ac.kr/api/subject/public/lectures/conditions/validation/ko', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      'syy': '2023', // 검색 연도
      'smtCd': '10',
      'locale': 'ko',
      'searchType': '01', // 기본검색 적용
      'daywCd': dayOfWeek, // 일, 월, 화, 수, 목, 금, 토 순 (1 ~ 7)
      'offset': 0,
  
      'limit': null, 'stuno': null, 'subjtCd': null, 'subjtNm': null, 'professorNm': null, 'professorNo': null,
      'lessnLestmCd': null, 'cmpsjCdt': null, 'cmpsjDivCd': null, 'cltrDomnCd': null, 'dghtDivCd': null,
      'univCd': null, 'deprtCd': null, 'bchdmCntcSubjtYn': null, 'srclnLctreLangDivCd': null,
      'studentUnivDeptCd': null, 'scheduleSeq': null, 'grade': null, 'estblCrseDivCd': null,
      'apntPriorSubjtYn': null, 'scheduleDivCd': null
    })
  });
} 

const getDataFromJson = (json) => {
  const data = {
      results: json.lectureRoms.results.map((lecRom) => {
          return {
              credits: lecRom.credits,                    // 학점 (학점/이론/실습)
              subjectCd: `${lecRom.subjectId}-${lecRom.classSequence}`,
              subjectNm: lecRom.subjectNm,
              lectureTimes: lecRom.schedule.lectureTimes.map((lecTime) => ({
                  block: 1,
                  start: lecTime.start,
                  day: lecTime.dayOfWeek,
                  instructorId: lecTime.instructorId,
                  classRoomCode: lecTime.classRoomCode,
                  classRoomName: lecTime.classRoomName,
              })), // 하나로 합칠 것인가? 하나로 합치기
              foreignLanguage: lecRom.foreignLanguage,
              professorNo: lecRom.professorNo,
              professorNm: lecRom.professorName,
              remark: lecRom.remark,                      // 수강 신청 주의사항
          }
      }),
      totalCount: json.lectureRoms.totalCount,       // 개설 과목 수
  }

  for(let i = 0; i < data.results.length; i++){
      const tmp = [data.results[i].lectureTimes[0]];
      for(let j = 1; j < data.results[i].lectureTimes.length; j++) {
          if(tmp[tmp.length - 1].day === data.results[i].lectureTimes[j].day) tmp[tmp.length - 1].block += 1;
          else tmp.push(data.results[i].lectureTimes[j]);
      }
      data.results[i].lectureTimes = tmp;
  }

  return data;
}

const data = getDataFromJson(await res().json());

import fs from 'fs';
fs.writeFileSync('data.json', JSON.stringify(data));

console.log(data.results.length);
