# 백엔드


# 목차
1. [설치](#-설치)
2. [데이터 수집 및 가공 과정](#-데이터-수집-및-가공-과정)
3. [API](#-API)


# 설치
```
npm i
```
명령어로 필요한 패키지를 설치하면 실행할 수 있다.

이 프로젝트가 동작하려면 mysql 5.7.4와 호환 되는 버전이 깔려 있어야 한다.
또, id는 root, password는 password를 만족해야 정상적으로 스키마를 통해 DB와 TABLE을 만들고, 데이터를 삽입할 수 있따.


# 데이터 수집 및 가공 과정
강의 정보를 얻기 위해서 다음의 과정을 거쳤다.

1. 크롬 개발자도구의 Network 탭을 사용하여 국민대 수강신청 사이트가 API에 요청하는 내용을 분석한다.

2. 1을 바탕으로 강의 정보를 json 형태로 받아와서 orignal 폴더에 저장한다. 요일별로 하는 것이 명확하게 모든 정보를 가져올 수 있기 때문에 요일을 기준으로 데이터를 받아온다.
    - [1. getDataFromCurl.js](https://github.com/powerslam/kmu-timetable/blob/master/back/ProcessData/1.%20getDataFromCurl.js)

3. 다운로드 받은 데이터에서 DB에서 쓰일 데이터만 추출하여 result 폴더에 저장한다.
    - [2. processingDataFromJson.js](https://github.com/powerslam/kmu-timetable/blob/master/back/ProcessData/2.%20processingDataFromJson.js)

4. 이제 DB 스키마 별로 필요한 데이터만 따로 모으고, 각 컬럼의 데이터 타입에 맞게 3번으로부터 다시 추출한다.
    - [3. extractClassDataFromJson](https://github.com/powerslam/kmu-timetable/blob/master/back/ProcessData/2.%20processingDataFromJson.js)
      - 이 파일에서는 CLASS 테이블과 CLASSROOM_USAGE 테이블에 필요한 데이터를 추출한다.

    - [4. extractClassRoomDataFromJson](https://github.com/powerslam/kmu-timetable/blob/master/back/ProcessData/4.%20extractClassRoomDataFromJson.js)
      - 이 파일에서는 BUILDING 테이블과 CLASSROOM 테이블에 필요한 데이터를 추출한다.

5. 4번에서 추출된 데이터를 DB 문법에 맞추어 차례대로 삽입한다.
    - [1. createTable.js](https://github.com/powerslam/kmu-timetable/blob/master/back/DB/1.%20createTable.js)
      - KTime DB를 만들고 [DB 스키마](https://github.com/powerslam/kmu-timetable/blob/master/back/DB/kmu-timtable.sql) 에 따라 테이블을 생성한다.
    
    - [2. insertClass.js](https://github.com/powerslam/kmu-timetable/blob/master/back/DB/1.%20createTable.js)
      - CLASS 테이블에 데이터를 삽입한다.
    
    - [3. insertClassRoom.js](https://github.com/powerslam/kmu-timetable/blob/master/back/DB/3.%20insertClassRoom.js)
      - BUILDING 테이블과 CLASSROOM 테이블에 데이터를 삽입한다.
    
    - [4. insertClassRoomUsage.js](https://github.com/powerslam/kmu-timetable/blob/master/back/DB/3.%20insertClassRoom.js)
      - CLASSROOM_USAGE 테이블에 데이터를 삽입한다.
 
실제로 이 과정을 하기 위해서는 걸어놓은 링크 순서대로 실행하면 된다. 또, 실행을 할 때에는 현 repo 의 폴더 구조를 유지하고 해야 한다.

# [API](https://github.com/powerslam/kmu-timetable/blob/master/back/app.js)
프론트엔드에서 오는 API 요청을 처리한다. API 요청을 위한 URL 루트는 다음과 같다.

### 1. /buliding
- (get) /building
  - 국민대 내에 존재하는 건물 리스트를 응답으로 전송한다.

- (get) /building/:building_cd
  - 임의로 정한 건물 코드를 입력하면 그 건물에 존재하는 층 수를 응답으로 전송한다.

- (get) /building/?bgd=N&flr=N
  - 쿼리스트링으로 bdg(건물 코드), flr(층)가 넘어오면 DB에서 조회하여 응답으로 전송한다.

### 2. /class
- (get) /class(/?SUBJECT_NM=N&PROFESSOR=N&WEEK=N)
  - 쿼리스트링의 요소인 SUBJECT_NM(과목 이름), PROFESSOR(교수님 성함), WEEK(요일) 반드시 넘어오지는 않는다. 사용자가 SearchMenu에서 필터 버튼을 통해 값을 입력하지 않았다면 생략된다. 
  
  - 쿼리스트링이 넘어왔다면, 강의조회 SQL 쿼리에 조건이 추가되어 원하는 정보만 응답으로 전송한다. 
  
  - 쿼리스트링이 넘어오지 않았다면 모든 강의 정보를 조회하여 응답으로 전송한다.

### 3. /timetable
- (get) /timetable/:id
  - URL parameter로 넘어온 아이디에 등록된 시간표를 반환한다.
 
- (post) /timetable
  - Request body에 있는 사용자의 ID와 과목 데이터를 TimeTable 테이블에 추가한다.
   
- (delete) /timetable/?id=N&sbjCD=N&week=N
  - 쿼리스트링으로 넘어온 id(유저 ID), sbjCD(삭제할 과목 코드), week(삭제할 과목의 요일)을 조회하고 삭제한다.

### 4. /signup
- (post) /signup
  - 유효성 검사는 프론트엔드에서만 검사하고, 백엔드에서는 DB에 중복된 데이터가 있는지 검사한다.

### 5. /login
- (post) /login
  - Request body 의 로그인 정보를 DB에서 조회하고 일치하면 SUCCESS, 아니면 FAIL을 응답으로 전송한다.
