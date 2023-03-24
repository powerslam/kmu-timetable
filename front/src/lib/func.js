//const fs = require('fs');

/*
export const getDataFromJson = () => {
    // 원래는 REST API 로 가져오기 중요
    const buffer = fs.readFileSync('../../public/data.json');
    const json = JSON.parse(buffer.toString());
    
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


console.log(getDataFromJson()); */
