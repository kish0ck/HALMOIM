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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(3000) COLLATE utf8mb4_bin NOT NULL,
  `time` datetime NOT NULL,
  `state` tinyint(4) DEFAULT '0',
  `rid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `type` varchar(10) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `chatfkrid_idx` (`rid`),
  KEY `chatfkuid_idx` (`uid`),
  CONSTRAINT `chatfkrid` FOREIGN KEY (`rid`) REFERENCES `room` (`rid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `chatfkuid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,'안녕하세요 할망구에요','2020-05-24 15:30:31',1,1,1,'text'),(2,'네 안녕하세요','2020-05-24 15:32:19',1,1,2,'text'),(3,'반갑습니다','2020-05-24 15:33:49',1,1,1,'text'),(4,'네네 수고하세요','2020-05-24 16:32:16',0,1,2,'text'),(5,'안녕하세요 관심있어서 연락했어유','2020-05-26 08:48:22',1,2,3,'text'),(6,'오우예 캄사해요','2020-05-26 08:50:54',1,2,1,'text'),(7,'ㅅㄱ 뻥임','2020-05-26 09:01:02',1,2,3,'text'),(8,'ㅆㅂ럼들아!!!','2020-05-26 09:05:39',1,2,1,'text'),(9,'ㅎㅇ','2020-05-25 14:02:12',1,3,4,'text'),(10,'ㅎㅇㄹ','2020-05-25 14:02:50',1,3,7,'text'),(11,'ㅂㅇ','2020-05-25 14:03:59',0,3,4,'text'),(12,'안녕하세요','2020-05-27 19:05:45',1,4,3,'text'),(13,'관심있어요!','2020-05-27 19:05:50',1,4,3,'text'),(14,'후후훗','2020-05-27 19:06:04',1,4,3,'text'),(15,'.... 뉴규/.?','2020-05-27 20:01:07',0,4,6,'text'),(16,'hi','2020-06-02 04:16:23',0,2,1,'text'),(17,'hi','2020-06-02 04:16:43',0,2,1,'text'),(18,'hi','2020-06-02 04:19:05',0,2,1,'text'),(19,'?','2020-06-02 06:39:07',0,2,1,'emoji'),(20,'hi','2020-06-02 07:04:50',0,2,1,'text'),(21,'qjwioejr','2020-06-02 07:04:52',0,2,1,'text'),(22,'\'','2020-06-02 07:21:00',0,1,1,'text'),(23,'안녕','2020-06-02 07:57:38',0,5,1,'text'),(24,'안녕하십니까','2020-06-02 07:58:14',0,7,5,'text'),(25,'형님','2020-06-02 07:59:43',0,7,5,'text'),(26,'반갑습니다','2020-06-02 08:00:36',0,7,5,'text'),(27,'장기나 한판 하실라우?','2020-06-02 08:06:41',0,7,5,'text'),(28,'안녕하슈','2020-06-02 08:07:44',0,8,5,'text'),(29,'저는','2020-06-02 08:12:03',0,8,5,'text'),(30,'기석쓰','2020-06-02 08:21:14',0,8,5,'text'),(31,'저기...','2020-06-02 08:21:33',0,9,5,'text'),(32,'혹시','2020-06-02 08:23:55',0,9,5,'text'),(33,'우빈씨 안녕?','2020-06-02 08:24:05',0,10,5,'text'),(34,'저기..','2020-06-02 08:25:47',0,11,1,'text'),(35,'혹시 성함이..?','2020-06-02 08:25:52',0,11,1,'text'),(36,'버블티씨?','2020-06-02 08:28:49',0,11,1,'text'),(37,'맞나요?','2020-06-02 08:33:11',0,11,1,'text'),(38,'저기요','2020-06-02 08:34:30',0,11,1,'text'),(39,'하이','2020-06-02 08:37:25',0,11,1,'text'),(40,'저는 타로버블티 좋아해요','2020-06-02 08:39:05',0,11,1,'text'),(41,'안녕','2020-06-03 06:58:51',0,6,1,'text'),(42,'이게 된다고?','2020-06-05 03:46:27',0,2,1,'text'),(43,'?','2020-06-05 06:52:49',0,5,1,'emoji'),(44,'개띠발','2020-06-05 21:29:05',0,15,1,'text'),(45,'하하','2020-06-07 16:25:55',0,16,5,'text'),(46,'안녕하세요','2020-06-07 16:32:45',0,16,10,'text'),(47,'네 안녕하세요','2020-06-07 16:33:09',0,16,5,'text'),(48,'?','2020-06-07 16:33:39',0,16,5,'emoji'),(49,'test2','2020-06-08 12:48:13',0,1,2,'text'),(50,'누구냐넌','2020-06-08 19:31:47',0,3,4,'text'),(51,'막례씨 안녕하세요??','2020-06-08 21:34:45',0,17,1,'text'),(52,'예 안녕하세유?','2020-06-08 22:06:59',0,17,51,'text'),(53,'제가 떡을 많이해서 남았는데','2020-06-08 22:09:22',0,17,1,'text'),(54,'한번 잡수실테요?','2020-06-08 22:09:26',0,17,1,'text'),(55,'좋지유','2020-06-08 22:09:31',0,17,51,'text'),(56,'어디사셔유?','2020-06-08 22:09:35',0,17,51,'text'),(57,'목화아파트에요','2020-06-09 00:16:31',0,17,1,'text'),(58,'?','2020-06-09 00:16:35',0,17,1,'emoji');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
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
