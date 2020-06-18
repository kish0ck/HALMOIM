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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `birth` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `gender` int(11) NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `addr` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `profile_img` varchar(1000) COLLATE utf8mb4_bin DEFAULT 'default.jpg',
  `login_img` varchar(1000) COLLATE utf8mb4_bin NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'김혜희','1954',2,'01012340001','서울 관악구 남현동 1130-1','/images/profile/hh.jpg','/images/login/01012340001.png',37.4764974,126.980896,'등산을 좋아해요^^'),(2,'최현정','1955',2,'01012340002','서울특별시 노원구 공릉동 393-11','/images/profile/default.jpg','/images/login/01012340002.png',37.6259458,127.074765,''),(3,'박성호','1951',1,'01048085791','서울 서초구 방배동 산 130-2','/images/profile/testHal.jpg','/images/login/01048085791.png',37.4710448,126.98633099999998,'하이룽\nㅋㅋ\n카트 뜰싸람 구함'),(4,'이학진','1952',1,'01012340004','인천광역시 서구 가성로 136-1','/images/profile/default.jpg','/images/login/01012340004.png',37.4966787,126.675961,''),(5,'홍기석','1952',1,'01055679257','서울특별시 동작구 사당동 대림아파트','/images/profile/haldambi.jpg','/images/login/01055679257.png',37.4841405,126.974733,'토요일 밤에~'),(6,'권순국','1952',1,'01012340006','서울특별시 동작구 신대방 1가길 16','/images/profile/default.jpg','default.jpg',37.4869006,126.909107,'장기 한 판 둡시다'),(7,'김경규','1954',1,'01012340007','서울특별시 노원구 공릉동 393-18','/images/profile/default.jpg','default.jpg',37.6304846,127.090992,'등산 좋아합니다.'),(8,'정다원','1952',1,'01012340008','서울특별시 관악구 남현동 1062-20','/images/profile/default.jpg','default.jpg',37.475332,126.980227,'맛집 많이 압니다. 밥한끼 합시다.'),(9,'박수진','1955',2,'01012340009','서울특별시 서초구 방배2동 458-3','/images/profile/default.jpg','default.jpg',37.48144,126.985911,'방배 살아요. 골프 좋아하시는 분 연락주세요~ 홍홍'),(10,'심예주','1955',2,'01012340010','서울특별시 서초구 서초4동 1316-18','/images/profile/default.jpg','default.jpg',37.498077,127.024858,''),(11,'강소연','1956',2,'01012340011','서울특별시 서초구 서초동 1327-27','/images/profile/default.jpg','default.jpg',37.495285,127.02712,''),(12,'김동훈','1954',1,'01012340012','서울특별시 서초구 역삼동 강남대로 438','/images/profile/default.jpg','default.jpg',37.501587,127.026383,''),(13,'김민경','1956',2,'01012340013','서울특별시 서초4동','/images/profile/default.jpg','default.jpg',37.501664,127.022113,''),(14,'김영중','1953',1,'01012340014','서울특별시 강남구 역삼동 테헤란로20길 19 409호','/images/profile/default.jpg','default.jpg',37.498471,127.035003,''),(15,'김지승','1956',2,'01012340015','서울특별시 강남구 역삼1동 833-7','/images/profile/default.jpg','default.jpg',37.492922,127.033184,''),(16,'박신원','1955',2,'01012340016','서울특별시 강남구 역삼2동 713-7','/images/profile/default.jpg','default.jpg',37.50071,127.047703,''),(17,'오석빈','1954',1,'01012340017','서울특별시 삼성2동 109 삼성롯데캐슬프레미어아파트','/images/profile/default.jpg','default.jpg',37.514988,127.045565,''),(18,'오세욱','1951',1,'01012340018','서울특별시 삼성2동 105 삼성중앙하이츠빌리지아파트','/images/profile/default.jpg','default.jpg',37.51662,127.046495,''),(19,'윤인제','1953',1,'01012340019','서울특별시 강남구 청담동 E편한세상2차아파트','/images/profile/default.jpg','default.jpg',37.521333,127.045277,''),(20,'이은택','1951',1,'01012340020','서울특별시 동작구 사당동 1131번지 103동','/images/profile/default.jpg','default.jpg',37.48529,126.971343,''),(21,'이정훈','1942',1,'01012340021','서울특별시 강남구 역삼동 테헤란로 212','/images/profile/default.jpg','default.jpg',37.5012743,127.039585,''),(22,'한승민','1942',1,'01012340022','서울특별시 동작구 사당3동 171-140','/images/profile/default.jpg','default.jpg',37.489549,126.97389,''),(23,'안지희','1945',2,'01012340023','서울특별시 서초구 방배동 2626-3','/images/profile/default.jpg','default.jpg',37.471992,126.983443,''),(24,'유우빈','1945',2,'01012340024','서울특별시 서초구 방배2동 2626','/images/profile/default.jpg','default.jpg',37.473226,126.983828,''),(25,'조신비','1956',2,'01012340025','서울특별시 서초구 방배동 방배신주아파트','/images/profile/default.jpg','default.jpg',37.47746,126.984047,''),(26,'조한슬','1956',2,'01012340026','서울특별시 서초구 방배2동 2525-5','/images/profile/default.jpg','default.jpg',37.474471,126.982862,''),(34,'gfgd','3453',1,'4545345','서울 서초구 방배동 산 130-2','/images/profile/default.jpg','2',37.4710448,126.98633099999998,''),(35,'다가가','3949',2,'394933382','서울 관악구 남현동 602-23','/images/profile/default.jpg','2',37.4754855,126.98081669999999,''),(36,'버블티','1920',2,'01033333333','서울 서초구 방배동 산 130-2','/images/profile/default.jpg','2',37.4710448,126.98633099999998,''),(37,'tester','2030',1,'1234089734','서울 서초구 방배동 산 130-2','/images/profile/default.jpg','2',37.4710448,126.98633099999998,''),(38,'배정순','3453',2,'01012341234','서울 서초구 방배동 산 130-2','/images/profile/default.jpg','myImg',37.4710448,126.98633099999998,''),(39,'4534645646','4564',2,'01042343242','서울 동작구 신대방동 695-30','/images/profile/default.jpg','myImg',37.486801,126.90896199999999,''),(40,'554','3453',1,'01023424324','서울 동작구 신대방동 695-30','/images/profile/default.jpg','/images/login/01023424324.png',37.4867959,126.90895379999998,''),(41,'dddd','2345',1,'01042345345','서울 동작구 신대방동 701-7','/images/profile/default.jpg','/images/login/01042345345.png',37.4867998,126.90899990000001,''),(42,'34534','3453',2,'01058485485','서울 관악구 남현동 602-23','/images/profile/default.jpg','/images/login/01058485485.png',37.475419599999995,126.9806437,''),(44,'박성호','1020',2,'01099999999','서울 서초구 방배동 산 130-2','/images/profile/default.jpg','/images/login/01049349349.png',37.4710448,126.98633099999998,''),(45,'테스텅','1920',1,'01053453453','서울 동작구 신대방동 701-7','/images/profile/default.jpg','/images/login/01053453453.png',37.486775400000006,126.90903859999999,''),(46,'음하하','1943',2,'01098743434','서울 동작구 신대방동 701-7','/images/profile/default.jpg','/images/login/01098743434.png',37.4867823,126.90900559999999,''),(47,'테스터터','1939',1,'01057457438','서울 동작구 신대방동 701-7','/images/profile/default.jpg','/images/login/01057457438.png',37.486779899999995,126.90897860000001,''),(48,'아무개','1930',1,'01095349459','서울 동작구 신대방동 695-30','/images/profile/default.jpg','/images/login/01095349459.png',37.486806,126.90897280000002,''),(49,'아무개2','1745',2,'01056969569','서울 동작구 신대방동 701-7','/images/profile/default.jpg','/images/login/01056969569.png',37.486799,126.9090121,''),(50,'테스트','1954',2,'01023423412','서울 노원구 공릉동 400-21','2','2',37.624304599999995,127.07221989999998,''),(51,'박막례','1945',2,'01011111111','경기도 안양시 동안구 동안로 57','/images/profile/mack.png','/images/login/01011111111.png',37.3863866,126.96423430000002,''),(52,'이갑순','1938',2,'01012340052','경기도 안양시 동안구 귀인동 933-7','/images/profile/maehwa.jpg','/login/01012340052.png',37.387631,126.971663,'매화 가지 하나'),(53,'김복남','1940',1,'01012340053','경기도 안양시 동안구 평촌동 345번지','/images/profile/san.png','/images/login/01012340053.png',37.387631,126.971663,'건강하게 살자. 등산 좋아합니다.'),(54,'최병길','1943',1,'01012340054','경기도 의왕시 청계동 포일세거리로 96','/images/profile/default.jpg','/images/login/01012340053.png',37.403105,126.987381,'장기,바둑'),(55,'홍순자','1934',2,'01012340055','경기도 의왕시 청계동 포일세거리로 96','/images/profile/default.jpg','/images/login/01012340053.png',37.403105,126.987381,''),(56,'김혜희','1943',2,'01012349876','경기 안양시 동안구 비산동 1102','/images/profile/default.jpg','/images/login/800144bb-12d5-43b1-816c-3e2f3fd98081_01012349876.png',37.394183999999996,126.94334859999998,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-11 15:08:59
