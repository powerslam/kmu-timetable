# K-Time 서비스


# 목차
1. [프로젝트 설명](#프로젝트-설명)
2. [기술 스택](#기술-스택)
4. [프론트엔드 기능 정보](#프론트엔드-기능-정보)
5. [백엔드 기능 정보](#백엔드-기능-정보)
6. [API](#API)


# 프로젝트 설명
- 개발기간: 2023/04/10 ~ 2023/05/10
- 주소: https://powerslam.github.io/kmu-timetable
- 시연 영상 : [(Youtube 링크)](https://youtu.be/jFakjUy61gk)
- 설명: 
    - K-Time 서비스는 국민대학교 학생들이 대학 생활을 보다 편리하게 보낼 수 있도록 고안된 서비스이다. 강의실 별 시간표 조회를 통한 빈 강의실 확인,  개설 강의 조회 및 시간표 작성, 주요 서비스 바로가기 등과 같은 기능을 한 곳에 모아 학생들의 불필요한 시간 낭비를 최소화하고 학업과 생활을 보다 효율적으로 관리할 수 있도록 한다.
    - 반응형 디자인을 도입해서 어느 환경에서도 자연스러운 UI를 제공한다.
    - 이처럼 K-Time 서비스는 학생들의 대학 생활 전반에 걸쳐 필요한 다양한 정보를 모아 하나의 서비스로 제공함으로써 학생들의 생활 편의성을 증진하는 서비스이다.


# 기술 스택
```
프론트엔드: React with JS, React-Router
전역 State 관리: useContext + useReducer
프론트엔드 배포: github pages
백엔드: Express
서버: 구름 IDE 컨테이너(Ubuntu 18.04 환경)
DB: MySQL v5.7.4
```


# 프론트엔드 기능 정보
다음은 구현된 페이지의 목록과 이미지이다. 자세한 내용은 [front 폴더의 README.md](https://github.com/powerslam/kmu-timetable/blob/master/front/README.md)에서 확인할 수 있다.
## 1. 회원가입, 로그인 페이지
![image](https://github.com/powerslam/kmu-timetable/assets/97532643/442ed366-c15e-46f4-ba4f-fc33662f4b0e)


## 2. 메인 페이지
![image](https://github.com/powerslam/kmu-timetable/assets/97532643/7f373633-9ee7-4db8-8b13-dcf27cd1bc98)


## 3. 시간표 페이지
![image](https://github.com/powerslam/kmu-timetable/assets/97532643/3a66fcc5-ed82-4f88-ba3d-445306d57288)


## 4. 강의실 별 시간표 조회 페이지
![image](https://github.com/powerslam/kmu-timetable/assets/97532643/084cb59d-89fa-4154-9929-e229a56c2a90)


# 백엔드 기능 정보

백엔드는 API 서버의 역할을 한다. 프론트엔드에서 강의정보, 유저의 시간표 정보 등을 요청하면 관련 데이터를 SQL에서 조회하여 응답한다.

다음은 프론트엔드와 백엔드 간의 관계를 간략하게 표현한 이미지이다.

![image](https://github.com/powerslam/kmu-timetable/assets/97532643/585a660b-7aa4-4161-8fc6-a0b493813cef)

더 자세한 내용은 [back 폴더의 README.md 파일](https://github.com/powerslam/kmu-timetable/blob/master/back/README.md) 에서 확인할 수 있다.

