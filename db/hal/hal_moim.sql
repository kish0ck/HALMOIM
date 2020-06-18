-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 52.78.120.154    Database: hal
-- ------------------------------------------------------
-- Server version	5.7.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `moim`
--

DROP TABLE IF EXISTS `moim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moim` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `time` datetime NOT NULL,
  `location` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `state` tinyint(4) DEFAULT '1',
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `coment` varchar(3000) COLLATE utf8mb4_bin DEFAULT NULL,
  `moim_img` varchar(1000) COLLATE utf8mb4_bin DEFAULT 'default.jpg',
  PRIMARY KEY (`mid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `moimfkuid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moim`
--

LOCK TABLES `moim` WRITE;
/*!40000 ALTER TABLE `moim` DISABLE KEYS */;
INSERT INTO `moim` VALUES (1,'60세 노인 장기 붙을사람','2020-05-22 07:16:28','경기도 안양시',1,1,37.396931,126.922043,'장기 하실분 구합니다','/images/moim/default.jpg'),(2,'할망구대할방구','2020-05-22 07:16:29','경기도 안양시',2,1,37.386402,126.95318,'소개팅하실분 구해요','/images/moim/default.jpg'),(3,'등산좋아하시는분','2020-06-12 12:13:55','경기도 안양시 안양역',3,1,37.401857,126.922222,'청계산 등산갑니다. 건강 챙깁시다 모두','/images/moim/moimsan.jpg'),(4,'고스톱','2020-06-15 15:29:30','경기도 안양시',4,1,37.38807,126.948547,'재미삼아 고스톱 한번 쳐요','/images/moim/gostop.png'),(5,'스마트폰 단체게임하실분만','2020-05-30 09:48:22','경기도 안양시',5,1,37.477213,126.979522,'스마트폰 할줄 모른다 하는 노인들 다와 내가 알려줄게','/images/moim/default.jpg'),(6,'모임방 개설합니다','2020-06-01 17:46:52','경기도 안양시',6,1,37.394375,126.956954,'모여서 대화 나눠요 ','/images/moim/images.jpg'),(7,'카페에서 수다해요 우리','2020-05-27 20:20:12','서울시 관악구 남현로',7,1,37.474897,126.979737,'수다를 위한 카페모임','/images/moim/default.jpg'),(8,'할머니의 수다방','2020-06-29 19:21:31','경기도 안양시 동안구 호계동 카페베니스',8,1,37.390686,126.95206,'카페베니스에서 할머니들만 모여서 놉시다','/images/moim/suda.png'),(9,'김혜희와 아이들','2020-05-26 14:59:02','서울시 관악구 남현로',9,1,37.475301,126.983513,'김혜희가 대빵이다','/images/moim/default.jpg'),(10,'할모임','2020-06-24 16:28:38','서울시 관악구 남현로',10,1,37.477653,126.984479,'할모임','/images/moim/default.jpg'),(11,'할모임2번','2020-06-24 16:27:29','서울시 동작구 사당동 사당로',10,0,37.485398,126.979044,'할모임2번째','/images/moim/default.jpg'),(13,'체스둡시다','2020-06-10 23:11:00','서울시 동작구 사당동 사당로',5,1,37.483274,126.98992,'사당경로당에서 체스한판 둡시다.','/images/moim/chess.png'),(14,'체스뜨까 쓰양','2020-06-10 23:11:00','서울 동작구 동작대로25길 48',5,1,37.4852953519309,126.979898189948,'사당경로당에서 체스한판 둡시다.','/images/moim/KakaoTalk_20200606_181147623.png'),(16,'게이트볼 칩시다','2020-06-12 10:31:00','경기 안양시 동안구 동안로 지하 130',1,1,37.38973437119,126.950983854413,'서울 동작구 게이트 볼장에서 게이트볼 칩시다','/images/moim/e9181887-57a5-46d0-aac3-619d2a2ef5fb_게이트볼.jpg');
/*!40000 ALTER TABLE `moim` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-11 15:08:58
