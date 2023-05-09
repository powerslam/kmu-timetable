import fs from 'fs/promises';
import { weeks } from "./variables.js";

const _processDataFromJson = (json, week) => {
  const data = {
    results: json.lectureRoms.results.map((lecRom) => {
        return {
            deptCode: lecRom.assignedDepartmentCode,                    // 개설 학과
            categoryCode: lecRom.categoryCode,                          // 과목 분류 (ex: 전공필수, 핵심교양 등등)
            grade: lecRom.grades.elements.join(""),                     // 학년의 범위가 담긴 strGrade 대신 각 배열마다 학년이 담긴 grades를 하나로 합침
            credits: lecRom.credits,                                    // 학점 (학점/이론/실습)
            subjectCd: `${lecRom.subjectId}-${lecRom.classSequence}`,   // 과목ID-분반
            subjectNm: lecRom.subjectNm,                                // 과목 이름
            lectureTime: 
              lecRom.schedule.lectureTimes.filter(lecTime => lecTime.dayOfWeek === week).map((lecTime) => {
                return {
                    block: 1,                                           // 1타임 한다는 뜻 (30분)
                    start: lecTime.start,                               // 수업 시작 시각
                    day: lecTime.dayOfWeek,                             // 요일
                    instructorId: lecTime.instructorId,
                    classRoomCode: lecTime.classRoomCode,               // 교실 고유 코드
                    classRoomName: lecTime.classRoomName,               // 교실 이름
                }
              }),
            foreignLanguage: lecRom.foreignLanguage,
            professorNo: lecRom.professorNo,                            // 교수님 고유 코드
            professorNm: lecRom.professorName,                          // 교수님 성함
            remark: lecRom.remark,                                      // 과목별 비고
        }
    }),
    totalCount: json.lectureRoms.totalCount,
  };

  // 쪼개진 수업 시간을 하나로 합치는 작업
  const res = { results: [], totalCount: data.totalCount };
  for(let i = 0; i < data.results.length; i++){
    if(data.results[i].lectureTime.length){
      data.results[i].lectureTime[0].block = data.results[i].lectureTime.length;
      data.results[i].lectureTime = data.results[i].lectureTime[0];
      res.results.push(data.results[i]);
    }
  }
  
  return res;
}

fs.access('../result', fs.constants.F_OK)
    .then(() => {console.log('processingDataFromJson.js 이미 폴더가 존재함')})
    .catch(() => fs.mkdir('../result'))
    .then(() => {
      console.log('processingDataFromJson.js 이미 폴더가 존재함');
  
      return weeks.map(async (week) => {
        return await fs.readFile(`../original/${week}.json`)
          .then((data) => JSON.parse(data.toString()))
          .then((json) => fs.writeFile(`../result/${week}.json`, JSON.stringify(_processDataFromJson(json, week))))
          .then(() => console.log(`${week}.json 으로부터 추출 완료`));  
      });
    });
