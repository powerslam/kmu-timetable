import fs from 'fs';
import { UniversityName, weeks } from './variables.js';

const all_data = { _class: [], classUsage: [] };
weeks.forEach((week, weekCode) => {
    // 추출한 데이터를 가져옴
    const data = JSON.parse(fs.readFileSync(`../result/${week}.json`).toString());
    
    data.results.forEach(v => {
        if(!(v.deptCode in UniversityName)) return;
        const startTime = v.lectureTime.start.hour * 100 + v.lectureTime.start.minute;
        let endTime = startTime + (v.lectureTime.block >> 1) * 100;
        
        // 총 교시가 홀수고, 시작 시간도 정각이 아니면
        if(v.lectureTime.block % 2 != 0 && v.lectureTime.start.minute != 0) {
            endTime += 70; // 1시간 추가 (30 + 70)
            v.lectureTime.block += 1; // 홀수에서 짝수로 만들어서 아래에서 0을 더하게 만듬
        }

        // 블록이 홀수면 +30 아니면 +0
        endTime += (v.lectureTime.block % 2 != 0 ? 30 : 0);

        all_data._class.push({
            grade: v.grade,
            deptCD: v.deptCode,
            categoryCD: v.categoryCode,

            week: weekCode + 1,

            subjectCD: v.subjectCd,
            subjectNM: v.subjectNm,

            professor: v.professorNm,
            startTime: startTime,
            endTime: endTime,

            credit: v.credits.credit,
            remark: v.remark
        });

        all_data.classUsage.push({
            week: weekCode + 1,
            subjectCD: v.subjectCd,
            classRoomCD: v.lectureTime.classRoomCode,
        });
    });
});

fs.writeFileSync('../result/class.json', JSON.stringify(all_data._class));
fs.writeFileSync('../result/classRoomUsage.json', JSON.stringify(all_data.classUsage));
