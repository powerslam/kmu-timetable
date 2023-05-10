# K-Time 서비스


## 목차
1. [프로젝트 설명](##프로젝트-설명)
2. [기술스택](##기술스택)
3. [서비스 기능 정보](##서비스-기능-정보)
4. [데이터 수집 및 가공 과정](##데이터-수집-및-가공-과정)
5. [API](##API)


## 프로젝트 설명
- 개발기간: 2023/04/10 ~ 2023/05/10
- 주소: https://powerslam.github.io/kmu-timetable
- 시연 영상 : (Youtube 링크)
- 설명: 
    - K-Time 서비스는 국민대학교 학생들이 대학 생활을 보다 편리하게 보낼 수 있도록 고안된 서비스이다. 강의실 별 시간표 조회를 통한 빈 강의실 확인,  개설 강의 조회 및 시간표 작성, 주요 서비스 바로가기 등과 같은 기능을 한 곳에 모아 학생들의 불필요한 시간 낭비를 최소화하고 학업과 생활을 보다 효율적으로 관리할 수 있도록 한다.
    - 반응형 디자인을 도입해서 어느 환경에서도 자연스러운 UI를 제공한다.
    - 이처럼 K-Time 서비스는 학생들의 대학 생활 전반에 걸쳐 필요한 다양한 정보를 모아 하나의 서비스로 제공함으로써 학생들의 생활 편의성을 증진하는 서비스이다.

## 기술 스택
```
프론트엔드: React with JS, React-Router
전역 State 관리: useContext + useReducer
프론트엔드 배포: github pages
백엔드: Express
서버: 구름 IDE 컨테이너(Ubuntu 18.04 환경)
DB: MySQL v5.7.4
```


## 프론트엔드 기능 정보 (링크별 자세한 설명 참조)
1. 전역 상태관리

2. 회원가입, 로그인 페이지

3. 메인 페이지

4. 시간표 페이지

5. 강의실 별 시간표 조회 페이지


## 데이터 수집 및 가공 과정
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

## API
프론트엔드에서 오는 API 요청을 처리한다. API요청을 위한 URL 루트는 다음과 같다.

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

