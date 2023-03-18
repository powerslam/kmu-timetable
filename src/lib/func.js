const fs = require('fs');

const getDataFromJson = () => {
    // 원래는 REST API 로 가져오기 중요
    const buffer = fs.readFileSync('../../public/data.json');
    const json = JSON.parse(buffer.toString());
    
    const data = {
        results: json.lectureRoms.results.map((lecRom) => {
            return {
                id: lecRom.id,
                year: lecRom.year,
                subjectId: lecRom.subjectId,
                subjectNm: lecRom.subjectNm,
                classSequence: lecRom.classSequence,
                credits: lecRom.credits,                    // 학점 (학점/이론/실습)
                lectureTimes: lecRom.schedule.lectureTimes.map((lecTime) => ({
                    day: lecTime.dayOfWeek,
                    start: lecTime.start,
                    end: lecTime.end,
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

    return data;
}

//const data = getDataFromJson();
//console.log(data.results[0].lectureTimes);

