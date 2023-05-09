-- MySQL dump 10.13  Distrib 5.7.41, for Linux (x86_64)
--
-- Host: localhost    Database: KTime
-- ------------------------------------------------------
-- Server version	5.7.41-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `KTime`;
CREATE DATABASE `KTime`;
USE `KTime`;
--
-- Table structure for table `BUILDING`
--

DROP TABLE IF EXISTS `BUILDING`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUILDING` (
  `BUILDING_CD` tinyint(4) NOT NULL COMMENT '건물 코드',
  `BUILDING_NM` varchar(50) NOT NULL COMMENT '건물 이름',
  `MIN_FLOOR` tinyint(4) NOT NULL COMMENT '최하층',
  `MAX_FLOOR` tinyint(4) NOT NULL COMMENT '최상층',
  PRIMARY KEY (`BUILDING_CD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CLASS`
--

DROP TABLE IF EXISTS `CLASS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CLASS` (
  `SUBJECT_CD` varchar(50) NOT NULL COMMENT '과목코드',
  `WEEK` tinyint(4) NOT NULL COMMENT '요일 코드',
  `SUBJECT_NM` varchar(100) NOT NULL COMMENT '과목명',
  `PROFESSOR` varchar(30) NOT NULL COMMENT '교수님',
  `START` smallint(4) NOT NULL COMMENT '시작시간(1030, 1300 등)',
  `END` smallint(4) NOT NULL COMMENT '끝 교시(1130, 1230 등)',
  `CREDIT` varchar(50) NOT NULL COMMENT '학점',
  `REMARK` varchar(500) DEFAULT NULL COMMENT '과목 비고',
  `GRADE` varchar(5) NOT NULL COMMENT '학년',
  `DEPT_CD` varchar(6) NOT NULL COMMENT '어떤 학부인지',
  `CATEGORY_CD` varchar(3) NOT NULL COMMENT '전공선택, 전공필수 등등',
  PRIMARY KEY (`SUBJECT_CD`,`WEEK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CLASSROOM`
--

DROP TABLE IF EXISTS `CLASSROOM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CLASSROOM` (
  `FLOOR` tinyint(4) NOT NULL COMMENT '몇 층에 위치했는가?',
  `CLASSROOM_CD` varchar(50) NOT NULL COMMENT '교실 코드',
  `BUILDING_CD` tinyint(4) NOT NULL COMMENT '건물 코드',
  `CLASSROOM_NM` varchar(50) DEFAULT NULL COMMENT '교실이름',
  PRIMARY KEY (`CLASSROOM_CD`,`FLOOR`,`BUILDING_CD`),
  KEY `FK_BUILDING_TO_CLASSROOM` (`BUILDING_CD`),
  CONSTRAINT `FK_BUILDING_TO_CLASSROOM` FOREIGN KEY (`BUILDING_CD`) REFERENCES `BUILDING` (`BUILDING_CD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CLASSROOM_USAGE`
--

DROP TABLE IF EXISTS `CLASSROOM_USAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CLASSROOM_USAGE` (
  `CLASSROOM_CD` varchar(50) NOT NULL COMMENT '교실 코드',
  `SUBJECT_CD` varchar(50) NOT NULL COMMENT '과목코드',
  `WEEK` tinyint(4) NOT NULL COMMENT '요일 코드',
  PRIMARY KEY (`CLASSROOM_CD`,`SUBJECT_CD`,`WEEK`),
  KEY `FK_CLASS_TO_CLASSROOM_USAGE` (`SUBJECT_CD`,`WEEK`),
  CONSTRAINT `FK_CLASSROOM_TO_CLASSROOM_USAGE` FOREIGN KEY (`CLASSROOM_CD`) REFERENCES `CLASSROOM` (`CLASSROOM_CD`),
  CONSTRAINT `FK_CLASS_TO_CLASSROOM_USAGE` FOREIGN KEY (`SUBJECT_CD`, `WEEK`) REFERENCES `CLASS` (`SUBJECT_CD`, `WEEK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TIMETABLE`
--

DROP TABLE IF EXISTS `TIMETABLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TIMETABLE` (
  `ID` varchar(50) NOT NULL COMMENT '아이디',
  `SUBJECT_CD` varchar(50) NOT NULL COMMENT '과목코드',
  `WEEK` tinyint(4) NOT NULL COMMENT '요일 코드',
  `BG_COLOR` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`,`SUBJECT_CD`,`WEEK`),
  KEY `FK_CLASS_TO_TIMETABLE` (`SUBJECT_CD`,`WEEK`),
  CONSTRAINT `FK_CLASS_TO_TIMETABLE` FOREIGN KEY (`SUBJECT_CD`, `WEEK`) REFERENCES `CLASS` (`SUBJECT_CD`, `WEEK`),
  CONSTRAINT `FK_USER_TO_TIMETABLE` FOREIGN KEY (`ID`) REFERENCES `USER` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `ID` varchar(50) NOT NULL COMMENT '아이디',
  `PWD` varchar(50) NOT NULL COMMENT '비밀번호',
  PRIMARY KEY (`ID`,`PWD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-09  5:21:10
