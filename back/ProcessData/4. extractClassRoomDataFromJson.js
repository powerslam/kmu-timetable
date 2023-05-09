import fs from 'fs';
import { weeks } from './variables.js';

// 건물 / 층 / 지하 등을 구분하기 위한 정규표현식
const regex = {
    building: /^[가-힣]+/,
    floor: /-?\d+층/,
    under: /지하중?/
}

const classRooms = new Set();
weeks.forEach(week => {
    const data = JSON.parse(fs.readFileSync(`../result/${week}.json`).toString());
    
    data.results.forEach(({ lectureTime: lt }) => {
        if(lt.classRoomCode){
            let newer = `${lt.classRoomCode}/`
            const match = lt.classRoomName.match(regex.under);
            newer += match ? lt.classRoomName.replaceAll(match[0], "-" + (match[0].length === 3 ? "2" : ""))
                        : lt.classRoomName;

            classRooms.add(newer);
        }
    });
});


const list = Array.from(classRooms).sort();
const res = {};

list.forEach(classRoom => {
    let [code, name] = classRoom.split('/');

    const building = name.match(regex.building)[0];
    let floor = name.match(regex.floor);
    const room = name.split(regex.floor)[1];

    if(!floor) floor = -10;
    else floor = parseInt(floor[0].replace("층", ""));
    if(!res.hasOwnProperty(building)) res[building] = {};
    if(!res[building].hasOwnProperty(floor)) res[building][floor] = [];

    res[building][floor].push({
        code: code,
        name: room ? room : null,
    });
});

fs.writeFileSync('../result/classroom.json', JSON.stringify(res));
