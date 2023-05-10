# 프론트엔드

# 목차
1. [설치](#설치)
2. [메인 페이지](#메인-페이지)
3. [시간표 페이지](#시간표-페이지)
4. [강의실 별 시간표 조회 페이지](#강의실-별-시간표-조회-페이지)

# 설치

```
npm i
```

명령어로 필요한 패키지를 설치하면 실행할 수 있다.

단, 정상적으로 동작하기 위해서는 백엔드가 실행되고 있어야 하며, [varables.js](https://github.com/powerslam/kmu-timetable/blob/master/front/src/lib/variables.js) 파일에서 API_SERVER 값을 백엔드 서버의 주소로 고쳐야 된다.


# [메인 페이지](https://github.com/powerslam/kmu-timetable/blob/master/front/src/page/MainPage.js)

![image](https://github.com/powerslam/kmu-timetable/assets/97532643/4b1f1015-9e0f-4f38-931c-fbafdb30ebf6)

메인 페이지는 네모 박스로 구분된 두 가지 영역이 존재한다.


## 1. 회원 정보 및 바로가기 영역

  ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/43177516-4bff-418e-b15d-9177add43ccb)
  
  - 회원 아이디와 로그아웃 버튼을 제공한다
  - 그리고 국민대에서 제공하는 주요 서비스 4가지 정도를 추려서 바로가기 버튼을 만들었다.


## 2. 오늘의 수업 영역

  ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/87d1a98e-830c-4d68-b631-e77c22377449)
  
  - 후술할 시간표 페이지에서 사용자가 등록한 시간표 중 오늘 날짜에 등록된 과목들을 시작시간 순으로 보여준다.
  - 간단하게 과목 이름과 담당 교수님, 강의실, 시작시간 및 끝시간을 보여준다.
    
    
  ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/a5aea8f0-82c0-4c80-b645-351ff2c7fca9)
  
  - 만약 오늘 날짜에 등록된 과목이 없거나 오늘 수업이 모두 종료되었다면 사진처럼 남은 수업이 없다는 문구를 보여준다.


# [시간표 페이지](https://github.com/powerslam/kmu-timetable/blob/master/front/src/page/EmptyClassRoomPage.js)

  ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/72a60ca3-1ae6-438b-988a-dbcf990cad1b)

  - 시간표 페이지는 사용자가 등록한 시간표를 보여주는 TimeTable 컴포넌트와 사용자가 개설과목을 검색할 수 있게 보여주는 SearchMenu 컴포넌트로 구성되어 있다.
  
  - SearchMenu 컴포넌트는 TimeTable 위에 위치한 버튼으로 접근이 가능하다.
  
  
  ## [1. TimeTable 컴포넌트](https://github.com/powerslam/kmu-timetable/blob/master/front/src/components/TimeTable.js)
    ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/87805c20-c0cd-464d-9b46-64a9984f3d11)

  - TimeTable 컴포넌트는 CSS의 그리드 레이아웃을 사용하여 만들었다. 9(= 7 (일-토) + 2 (영어시각, 숫자시각)) 개의 열과 19 (= 18개 (1A ~ 9B) + 1개 (헤더(요일))) 행으로 구성되어있다.
  
  - 사용자가 과목을 선택할 때 동적으로 추가하고, 요일 및 영어 숫자 시각을 그릴 때에도 편하게 쓰기 위해 미리 grid 레이아웃상에서 위치를 잡는 [CSS 파일](https://github.com/powerslam/kmu-timetable/blob/master/front/src/styles/GridArrange.css)를 만들어 가독성을 높였다.
    
    
  ## [2. SearchMenu 컴포넌트](https://github.com/powerslam/kmu-timetable/tree/master/front/src/components/SearchMenu)
    ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/13428fc9-bdbd-424f-a9e9-ea4cc05f0f5e)

  - SearchMenu 컴포넌트는 다양한 하위 컴포넌트로 구성되어 있다. 그 중에서 중요한 몇 가지 컴포넌트에 대해 나열하겠다.

    ### TextInputModal & CheckInputModal
    ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/f4e46cfd-9c8d-417e-a00d-cbfaedea4a7f)
    
    - SearchMenuFilter 버튼을 클릭하면 노출되는 모달이다.
    - 교수님, 과목 검색은 TextInputModal 컴포넌트이고, 요일 선택은 CheckInputModal이다.
    - 각 모달마다 값을 입력하면 필터링 값이 되어서 넘어가게 된다.


    ### SearchMenuItem
    ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/8de06722-a577-4bfe-bae4-bb2327d12aa5)
    
    - API 로부터 받은 데이터를 보여주는 컴포넌트이다. 다음과 같이 개설학과, 과목분류, 학년, 과목명(과목코드), 분반, 학점, 교수님 성함, 교실 및 수업 시간, 비고란 순으로 데이터를 보여준다.


# [강의실 별 시간표 조회 페이지](https://github.com/powerslam/kmu-timetable/blob/master/front/src/page/EmptyClassRoomPage.js)

![image](https://github.com/powerslam/kmu-timetable/assets/97532643/2a63f7e8-3c7a-4e12-97fc-478fa37d7018)

- 강의실 별로 오늘 어떤 수업들이 배치되어 있는지 볼 수 있다. 이것을 통해 빈 강의실을 찾아다니는 수고를 덜 수 있다.
- 이 페이지는 건물과 층 수를 선택하는 input tag 와 해당 건물, 층에 강의실의 과목 목록을 보여준다.

  ## Input Tag
  ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/3ace9db4-26b3-4631-8b2b-a1111b6298f9)
  
  - 다음 사진 처럼 건물을 선택하고, 층을 선택하는 방식이다.

  ## 과목 
  ![image](https://github.com/powerslam/kmu-timetable/assets/97532643/6249a2f2-3ff3-4b76-b1fc-5500571f51b5)
  
  - 위의 Input tag에서 건물과 층을 모두 선택하고 나면 API로부터 데이터를 받아와서 값을 보여준다.

