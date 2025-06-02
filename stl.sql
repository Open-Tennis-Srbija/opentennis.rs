-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: srpskatenisliga
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courts`
--

DROP TABLE IF EXISTS `courts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courts`
--

LOCK TABLES `courts` WRITE;
/*!40000 ALTER TABLE `courts` DISABLE KEYS */;
INSERT INTO `courts` VALUES (1,'','','2025-05-31 17:02:56','2025-05-31 17:02:56'),(2,'Beogradski Teniski Klub','https://www.beogradskiteniskiklub.com/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(3,'SC Karović','https://www.instagram.com/sckarovic/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(4,'Racket Country Club','https://racketcountryclub.com/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(5,'Premium','https://premiumtennis.net/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(7,'Topaco','https://tktopaco.com/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(11,'Baseline','https://baselinetns.com/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(12,'Padel Centar Košutnjak','https://padelcentar.rs/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(13,'Lucky club','','2025-05-31 17:02:56','2025-05-31 17:02:56'),(14,'Green Bay','https://greenbay.rs/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(15,'Veterinarski park','https://maps.app.goo.gl/WzxHg2nHLL8JcxuNA','2025-05-31 17:02:56','2025-05-31 17:02:56'),(16,'Tennis Palladio 98','https://tennispalladio98.it/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(17,'La Pineta Verona','https://www.tennispadelpineta.it/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(18,'Salonica Tennis Club','https://www.salonicatennis.gr/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(19,'DIF','https://maps.app.goo.gl/wpngkn8PWGqJfwmV9','2025-05-31 17:02:56','2025-05-31 17:02:56'),(20,'Čonkić Tennis Academy','https://conkicacademy.com/','2025-05-31 17:02:56','2025-05-31 17:02:56'),(21,'Stanovo Kragujevac','','2025-05-31 17:02:56','2025-05-31 17:02:56'),(22,'Reket','','2025-06-01 16:38:45','2025-06-01 16:38:45');
/*!40000 ALTER TABLE `courts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leagues`
--

DROP TABLE IF EXISTS `leagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leagues` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uri` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `county` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '?',
  `date_begin` date NOT NULL DEFAULT '2025-05-30',
  `date_end` date NOT NULL DEFAULT '2025-05-31',
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `court_id` bigint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `leagues_court_id_foreign` (`court_id`),
  CONSTRAINT `leagues_court_id_foreign` FOREIGN KEY (`court_id`) REFERENCES `courts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leagues`
--

LOCK TABLES `leagues` WRITE;
/*!40000 ALTER TABLE `leagues` DISABLE KEYS */;
INSERT INTO `leagues` VALUES (1,'2025-05-31 17:03:05','2025-05-31 17:03:05','sparing','','?','2025-05-30','2025-05-31','',1),(2,'2025-05-31 17:03:05','2025-06-01 13:22:27','Topaco Letnja Liga 2025','topaco-letnja-liga-2025','Beograd','2025-04-14','2025-10-14','',1),(3,'2025-05-31 17:03:05','2025-06-01 13:22:27','BTK Letnja Liga 2025','btk-letnja-liga-2025','Beograd','2025-04-14','2025-10-14','',1),(9,'2025-05-31 17:03:05','2025-06-01 13:22:27','Baseline Letnja Liga 2025','baseline-letnja-liga-2025','Beograd','2025-04-14','2025-10-14','',1),(10,'2025-05-31 17:03:05','2025-06-01 13:22:27','Baseline Beograd Open Turnir 2025','baseline-beograd-open-turnir-2025','Beograd','2025-05-16','2025-05-18','',1),(11,'2025-05-31 17:03:05','2025-06-01 13:22:27','Prvenstvo Veterana Doboj Turnir 2025','prvenstvo-veterana-doboj-turnir-2025','Republika Srpska','2025-06-13','2025-06-15','',1),(12,'2025-05-31 17:03:05','2025-06-01 13:22:27','Vojvodina Open Turnir 2025','vojvodina-open-turnir-2025','Novi Sad','2025-05-30','2025-05-01','',1),(13,'2025-05-31 17:03:05','2025-05-31 17:03:05','Stanovo Open Turnir 2025','stanovo-open-turnir-2025','Kragujevac','2025-05-30','2025-05-31','',1);
/*!40000 ALTER TABLE `leagues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_players`
--

DROP TABLE IF EXISTS `match_players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_players` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tennis_match_id` bigint unsigned NOT NULL,
  `player_id` bigint unsigned NOT NULL,
  `team` enum('winner','loser') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `match_players_tennis_match_id_foreign` (`tennis_match_id`),
  KEY `match_players_player_id_foreign` (`player_id`),
  CONSTRAINT `match_players_player_id_foreign` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE CASCADE,
  CONSTRAINT `match_players_tennis_match_id_foreign` FOREIGN KEY (`tennis_match_id`) REFERENCES `tennis_matches` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=275 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_players`
--

LOCK TABLES `match_players` WRITE;
/*!40000 ALTER TABLE `match_players` DISABLE KEYS */;
INSERT INTO `match_players` VALUES (1,1,12,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(2,1,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(3,2,4,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(4,2,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(5,3,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(6,3,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(7,4,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(8,4,12,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(9,5,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(10,5,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(11,6,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(12,6,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(13,7,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(14,7,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(15,8,3,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(16,8,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(17,9,4,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(18,9,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(19,10,7,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(20,10,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(21,11,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(22,11,8,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(23,12,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(24,12,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(25,13,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(26,13,12,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(27,14,4,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(28,14,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(29,15,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(30,15,12,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(31,16,3,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(32,16,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(33,17,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(34,17,2,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(35,18,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(36,18,10,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(37,19,6,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(38,19,9,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(39,20,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(40,20,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(41,21,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(42,21,12,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(43,22,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(44,22,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(45,23,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(46,23,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(47,24,4,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(48,24,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(49,25,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(50,25,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(51,26,3,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(52,26,1,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(53,27,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(54,27,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(55,28,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(56,28,2,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(57,29,5,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(58,29,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(59,30,3,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(60,30,1,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(61,31,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(62,31,14,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(63,32,15,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(64,32,14,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(65,33,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(66,33,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(67,34,16,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(68,34,17,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(69,35,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(70,35,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(71,36,5,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(72,36,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(73,37,18,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(74,37,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(75,38,17,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(76,38,16,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(77,39,14,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(78,39,15,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(79,40,4,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(80,40,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(81,41,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(82,41,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(83,42,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(84,42,2,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(85,43,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(86,43,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(87,44,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(88,44,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(89,45,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(90,45,21,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(91,46,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(92,46,22,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(93,47,7,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(94,47,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(95,48,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(96,48,23,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(97,49,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(98,49,22,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(99,50,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(100,50,2,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(101,51,24,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(102,51,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(103,52,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(104,52,21,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(105,53,25,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(106,53,26,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(107,54,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(108,54,27,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(109,55,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(110,55,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(111,56,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(112,56,21,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(113,57,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(114,57,28,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(115,58,8,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(116,58,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(117,59,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(118,59,1,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(119,60,3,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(120,60,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(121,61,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(122,61,7,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(123,62,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(124,62,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(125,63,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(126,63,5,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(127,64,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(128,64,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(129,65,21,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(130,65,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(131,66,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(132,66,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(133,67,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(134,67,2,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(135,68,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(136,68,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(137,69,5,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(138,69,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(139,70,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(140,70,29,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(141,71,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(142,71,15,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(143,72,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(144,72,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(145,73,30,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(146,73,31,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(147,74,3,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(148,74,2,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(149,75,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(150,75,34,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(151,76,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(152,76,27,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(153,77,22,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(154,77,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(155,78,28,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(156,78,35,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(157,79,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(158,79,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(159,80,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(160,80,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(161,81,24,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(162,81,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(163,82,11,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(164,82,21,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(165,83,37,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(166,83,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(167,84,38,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(168,84,5,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(169,85,37,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(170,85,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(171,86,34,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(172,86,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(173,87,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(174,87,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(175,88,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(176,88,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(177,89,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(178,89,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(179,90,39,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(180,90,40,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(181,91,41,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(182,91,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(183,92,3,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(184,92,2,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(185,93,4,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(186,93,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(187,94,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(188,94,42,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(189,95,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(190,95,5,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(191,96,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(192,96,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(193,97,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(194,97,43,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(195,98,44,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(196,98,13,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(197,99,1,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(198,99,2,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(199,100,2,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(200,100,45,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(201,101,44,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(202,101,46,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(203,102,47,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(204,102,11,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(205,103,13,'winner','2025-05-31 17:03:15','2025-05-31 17:03:15'),(206,103,48,'loser','2025-05-31 17:03:15','2025-05-31 17:03:15'),(207,104,49,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(208,104,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(209,105,1,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(210,105,11,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(211,106,13,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(212,106,50,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(213,107,1,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(214,107,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(215,108,2,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(216,108,11,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(217,109,51,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(218,109,52,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(219,110,11,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(220,110,53,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(221,111,43,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(222,111,44,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(223,112,2,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(224,112,23,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(225,113,2,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(226,113,11,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(227,114,54,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(228,114,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(229,115,55,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(230,115,53,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(231,116,4,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(232,116,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(233,117,1,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(234,117,11,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(235,118,56,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(236,118,42,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(237,119,57,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(238,119,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(239,120,58,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(240,120,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(241,121,47,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(242,121,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(243,122,1,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(244,122,2,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(245,123,59,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(246,123,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(247,124,13,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(248,124,4,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(249,125,1,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(250,125,60,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(251,126,1,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(252,126,21,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(253,127,2,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(254,127,11,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(255,128,61,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(256,128,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(257,129,2,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(258,129,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(259,130,2,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(260,130,34,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(261,131,62,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(262,131,63,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(263,132,64,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(264,132,65,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(265,133,66,'winner','2025-05-31 17:03:16','2025-05-31 17:03:16'),(266,133,13,'loser','2025-05-31 17:03:16','2025-05-31 17:03:16'),(267,134,67,'winner','2025-06-01 12:18:44','2025-06-01 12:18:44'),(268,134,13,'loser','2025-06-01 12:18:44','2025-06-01 12:18:44'),(269,135,63,'winner','2025-06-01 16:38:45','2025-06-01 16:38:45'),(270,135,68,'loser','2025-06-01 16:38:45','2025-06-01 16:38:45'),(271,136,69,'winner','2025-06-02 05:28:20','2025-06-02 05:28:20'),(272,136,70,'loser','2025-06-02 05:28:20','2025-06-02 05:28:20'),(273,137,71,'winner','2025-06-02 12:31:17','2025-06-02 12:31:17'),(274,137,42,'loser','2025-06-02 12:31:17','2025-06-02 12:31:17');
/*!40000 ALTER TABLE `match_players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2025_03_19_135044_create_courts_table',1),(2,'2025_03_21_143654_create_leagues_table',2),(3,'0001_01_01_000000_create_users_table',3),(4,'0001_01_01_000001_create_cache_table',3),(5,'0001_01_01_000002_create_jobs_table',3),(6,'2025_02_21_154619_create_players_table',3),(7,'2025_02_21_154839_create_tenis_matches_table',3),(8,'2025_04_08_171625_create_match_players_table',3),(9,'2025_05_27_105344_update_players_with_categories',3),(10,'2025_05_29_091726_update_leagues',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `points` int NOT NULL DEFAULT '0',
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '?',
  `uri` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `club` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rank` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `players_uri_unique` (`uri`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'Srđan',4496,'Jovanović','4','srdjan-jovanovic','Premium Tenis','Beograd',1,'2025-05-31 17:02:45','2025-05-31 17:03:52'),(2,'Boris',4342,'Vuković','4','boris-vukovic','','Beograd',2,'2025-05-31 17:02:45','2025-05-31 17:03:52'),(3,'Ivan',1064,'Marjanović','4','ivan-marjanovic','','Beograd',5,'2025-05-31 17:02:45','2025-05-31 18:37:54'),(4,'Spasoje',1047,'Matijević','3','spasoje-matijevic','','Beograd',6,'2025-05-31 17:02:45','2025-05-31 18:37:54'),(5,'Vasilije',604,'Kosić','3','vasilije-kosic','','Beograd',7,'2025-05-31 17:02:45','2025-05-31 18:37:54'),(6,'Branimir',220,'Vilimonović','?','branimir-vilimonovic','','Vrnjačka Banja',22,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(7,'Sloba',268,'Negić','3','sloba-negic','','Beograd',16,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(8,'Manuel',213,'Verdi','3','manuel-verdi','','Beograd',26,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(9,'Darko',111,'Spasojević','?','darko-spasojevic','','Vrnjačka  Banja',49,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(10,'Aleksandar',54,'Milošević','3','aleksandar-milosevic','','Beograd',58,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(11,'Aleksa',2897,'Perišić','3','aleksa-perisic','','Beograd',4,'2025-05-31 17:02:45','2025-05-31 18:37:54'),(12,'Jay',270,'Fayed','3','jay-fayed','','Beograd',15,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(13,'Nikola',3973,'Tošić','3','nikola-tosic',NULL,'Beograd',3,'2025-05-31 17:02:45','2025-06-01 12:18:44'),(14,'Teodora',201,'Šušnjević','1','teodora-susnjevic',NULL,'Beograd',28,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(15,'Aleksej',210,'Petrovič','1','aleksej-petrovic',NULL,'Beograd',27,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(16,'Dušan',167,'Đurađ','?','dusan-djuradj',NULL,'Beograd',42,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(17,'Andrija',186,'Mašović','?','andrija-masovic',NULL,'Beograd',38,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(18,'Predrag',145,'Jočić','3','predrag-jocic',NULL,'Beograd',46,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(21,'Sanjin',394,'Milinković','3','sanjin-milinkovic',NULL,'Beograd',10,'2025-05-31 17:02:45','2025-05-31 18:37:54'),(22,'Mateja',237,'Manić','3','mateja-manic',NULL,'Beograd',20,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(23,'Rade',74,'Cvetković','3','rade-cvetkovic',NULL,'Beograd',54,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(24,'Milan',350,'Radoš','3','milan-rados',NULL,'Beograd',11,'2025-05-31 17:02:45','2025-05-31 18:37:54'),(25,'Andrej',157,'Žiberna','?','andrej-ziberna',NULL,'Beograd',43,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(26,'Igor',40,'Zadravec','?','igor-zadravec',NULL,'Beograd',63,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(27,'Dimitrije',77,'Stojanović','?','dimitrije-stojanovic',NULL,'Beograd',52,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(28,'Miloš',201,'Mrvić','2','milos-mrvic',NULL,'Beograd',29,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(29,'Nikita',22,'Borgolov','1','nikita-borgolov',NULL,'Beograd',66,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(30,'Luka',271,'Grgurević','?','luka-grgurevic',NULL,'Beograd',14,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(31,'Lazar',142,'Pajić','?','lazar-pajic',NULL,'Beograd',47,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(34,'Danilo',256,'Tehlirian','3','danilo-tehlirian',NULL,'Beograd',19,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(35,'Blagoje',48,'Ćurić','?','blagoje-curic',NULL,'Beograd',60,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(37,'Andrea',299,'Toniolo','5','andrea-toniolo',NULL,'Italija',13,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(38,'Dragan',193,'Ristanović','3','dragan-ristanovic',NULL,'Beograd',30,'2025-05-31 17:02:45','2025-06-02 15:13:30'),(39,'Miloš',177,'Vujović','2','milos-vujovic',NULL,'Beograd',40,'2025-05-31 17:02:45','2025-06-02 11:48:43'),(40,'Milutin',76,'Sinđelić','2','milutin-sindjelic',NULL,'Beograd',53,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(41,'Dimitrii',169,'Vinogradov','4','dimitrii-vinogradov',NULL,'Rusija',41,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(42,'Irena',102,'Lukić','1','irena-lukic',NULL,'Beograd',50,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(43,'Dragana',260,'Svrkota','3','dragana-svrkota',NULL,'Beograd',17,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(44,'Jovana',427,'Grumić','3','jovana-grumic',NULL,'Beograd',9,'2025-05-31 17:02:45','2025-05-31 18:37:54'),(45,'Rade',36,'Mrdja','?','rade-mrdja',NULL,'Beograd',65,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(46,'Zoran',44,'Radoš','3','zoran-rados',NULL,'Beograd',62,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(47,'Aleksandar',440,'Miletić','3','aleksandar-miletic',NULL,'Beograd',8,'2025-05-31 17:02:45','2025-05-31 18:37:54'),(48,'Κωνσταντίνος',60,'Δίπλας','3','Κωνσταντίνος-Δίπλας',NULL,'Grčka',56,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(49,'Andrija',190,'Derežić','3','andrija-derezic',NULL,'Hrvatska',31,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(50,'Miloš',39,'Lazić','2','milos-lazic',NULL,'Beograd',64,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(51,'Luka',220,'Stanojević','?','luka-stanojevic',NULL,'Vrnjačka Banja',23,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(52,'Srđan',46,'Pavlović','?','srdjan-pavlovic',NULL,'Vrnjačka Banja',61,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(53,'Marko',148,'Jović','3','marko-jovic',NULL,'Beograd',45,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(54,'Aleksandar',190,'Dimitrov','3','aleksandar-dimitrov',NULL,'Beograd',32,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(55,'Vladimir',190,'Živojinović','3','vladimir-zivojinovic',NULL,'Beograd',33,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(56,'Ljubica',140,'Stošković','1','ljubica-stoskovic',NULL,'Beograd',48,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(57,'Ivan',190,'Lekić','6','ivan-lekic',NULL,NULL,34,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(58,'Slobodan',180,'Vujinović','4','slobodan-vujinovic',NULL,NULL,39,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(59,'Goran',190,'Pavlović','3','goran-pavlovic',NULL,'Beograd',35,'2025-05-31 17:02:45','2025-06-02 11:44:56'),(60,'Goran',53,'Teranović','4','goran-teranovic',NULL,NULL,59,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(61,'Goran',190,'Vujanović','3','goran-vujanovic',NULL,'Beograd',36,'2025-05-31 17:02:45','2025-06-02 11:45:40'),(62,'Andreja',220,'Kuburović','3','andreja-kuburovic',NULL,NULL,24,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(63,'Stevan',311,'Ćirić','3','stevan-ciric',NULL,NULL,12,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(64,'Veljko',230,'Glišović','4','veljko-glisovic',NULL,'Kragujevac',21,'2025-05-31 17:02:45','2025-06-01 16:38:45'),(65,'Filip',67,'Perović','3','filip-perovic',NULL,'Kragujevac',55,'2025-05-31 17:02:45','2025-06-02 12:31:17'),(66,'Pavle',190,'Pavlović','6','pavle-pavlovic',NULL,NULL,37,'2025-05-31 17:02:45','2025-06-02 05:28:20'),(67,'Mira',260,'Dimić','4','mira-dimic',NULL,'Beograd',18,'2025-06-01 12:18:44','2025-06-02 11:44:14'),(68,'Danilo',95,'Vujasinović','?','danilo-vujasinovic',NULL,NULL,51,'2025-06-01 16:38:45','2025-06-02 12:31:17'),(69,'Dušan',220,'Tatović','4','dusan-tatovic',NULL,'Kragujevac',25,'2025-06-02 05:28:19','2025-06-02 11:42:32'),(70,'Bogdan',60,'Jovanović','3','bogdan-jovanovic',NULL,'Kragujevac',57,'2025-06-02 05:28:20','2025-06-02 12:31:17'),(71,'Martina',150,'Vranješ','1','martina-vranjes',NULL,'Beograd',44,'2025-06-02 12:31:17','2025-06-02 15:11:27');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('4dltjVjdT6bGzToSzb6RFEUXqikb6er1YySDPzaG',NULL,'78.3.243.167','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoia3ZBSlF5SkU0aVlGdkZtdE9YYkxhT1NYaVlOWmtaNG40UTFHd29rUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL2dldC1wbGF5ZXItY2hhcnQvNjYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1748893718),('5Bo977eLXNM6XLGH3MBznpenHcC9X0G7QP88QhAu',NULL,'54.92.182.58','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Edg/100.0.1185.29','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNjdLRm5xTG1vd0wzUWxiUndPN0I2ZzdWelZhaENWUlBWQVJCUk5tTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1748878361),('AFDA5KnqFe9TqXlI5RNJ3QBRePkq7EuTyWbw2aZp',NULL,'135.181.212.177','Mozilla/5.0 (compatible; MJ12bot/v1.4.8; http://mj12bot.com/)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGVmRlp2MmdFbmI0M0NKajJIU0lLRTRkcUE3TjJrN2prM0ZPeUNuVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL2xpZ2UtdHVybmlyaSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1748890130),('AHWoX4zZFYj366U1TDWAwrkr4nK9B7HHE4phC1GG',NULL,'54.36.148.193','Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWkdHN2E0ajJsRGNYeTg3Sjdqenl5WllwWUdsckFlcHJxdnR5dFA2dSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL2RhcmtvLXNwYXNvamV2aWMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1748881426),('AxkUjGBwCRdpE5pKifIsIIX3zbyJsGjXRK1F91nE',NULL,'178.148.69.199','Mozilla/5.0 (iPhone; CPU iPhone OS 18_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/136.0.3240.91 Version/18.0 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZzVJRnZIOThDWHNhaDExZndON3hDbTVVNTJFVXJBMEtWNlY4VEVaeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL2dldC1wbGF5ZXJzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1748888081),('BrwkSKTpC71UK6mTDpR2YQLPPWtZCMpu8LaY1AMj',NULL,'66.249.66.44','Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.113 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRndRMjBieGVJOE84RGFhWW13ZWxKZjNwcklwSks0QXV2Q1VsSEs2YSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL21hcmtvLWpvdmljIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1748884325),('fWBbq0j14JsZxh20Mc58tNkmZJJv8Er1OYQMg4D6',1,'178.148.65.235','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoidlhqM3RHNlZhbk9xV3hteGdkT3V3ajZtaU9Tc3FkbDZTYU1sdXdkSCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozMjoiaHR0cHM6Ly9zcnBza2F0ZW5pc2xpZ2EucnMvYWRtaW4iO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQ2OiJodHRwczovL3NycHNrYXRlbmlzbGlnYS5ycy9nZXQtcGxheWVyLWNoYXJ0LzI2Ijt9fQ==',1748884473),('g9viKut3QWWiRExuAIfVkrNdqwjO9zuIxUwO3dzh',NULL,'185.26.174.55','Mozilla/5.0 (iPhone; CPU iPhone OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoibUk5RHlpbE10UUoxdDMxcUNBTGFvODdab0VzTTZFcG1VTnFaaGUyayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjI6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL2dldC1sZWFndWUvc3Rhbm92by1vcGVuLXR1cm5pci0yMDI1Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1748890660),('HMH4ItARLcjNBWimWfyaZT9eWrosNiTbvxSuzMIo',NULL,'20.171.207.253','Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHI1ZjNQRFNhWWdvTW5UanlUU3dtTGE4bmRTNVZxMTFydG5BckhHeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHBzOi8vd3d3LnNycHNrYXRlbmlzbGlnYS5ycy9saWdlLXR1cm5pcmkiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1748887631),('k5Oy4J55jZhVZg7EiFNIxempJ6pl953tPRY6jNwm',NULL,'54.36.149.82','Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)','YTozOntzOjY6Il90b2tlbiI7czo0MDoib1BsNVR4VXphNXZnTGRyOFVoS1FvSVFhQUpKRDM1Z3FFYjRSamJ1ZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL2x1a2EtZ3JndXJldmljIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1748884093),('OM31ObBk8XDIY7Rf5ypaV8P365iFOhKcXkogmVRK',NULL,'78.3.243.167','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaU1qaWhFd1V5eTJSV296NnRJa0k0djJneDVidG5Tb2RPczNDR2NZWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTM2OiJodHRwczovL3NycHNrYXRlbmlzbGlnYS5ycy8lQ0UlOUElQ0YlODklQ0UlQkQlQ0YlODMlQ0YlODQlQ0UlQjElQ0UlQkQlQ0YlODQlQ0UlQUYlQ0UlQkQlQ0UlQkYlQ0YlODItJUNFJTk0JUNFJUFGJUNGJTgwJUNFJUJCJUNFJUIxJUNGJTgyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1748884912),('qjxPwR930LE0gT7CKVguICWrbb7p0UI5hyYblNSk',NULL,'66.249.66.195','Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.92 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)','YTozOntzOjY6Il90b2tlbiI7czo0MDoibnZhRUg4THpBb3RENkRyZGFYVjdocVQyUk4yR0J2Y08ycWhrTEloMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjY6Imh0dHBzOi8vd3d3LnNycHNrYXRlbmlzbGlnYS5ycy9nZXQtbGVhZ3VlL3N0YW5vdm8tb3Blbi10dXJuaXItMjAyNSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1748882256),('r8MwfSNfg0K331heV2v3zxsynJovZyzA0lTMWs6y',NULL,'185.26.175.139','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGZKWXRiQVhQYjV5Rmh2UUtVcHBvWEpXaW5PaUo1ZHZkSFFzWGJmVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL2dldC1wbGF5ZXJzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1748877524),('tnvTZNEEjgRmwqqPSnR1L1Gd4ht7dfCEQDlkzwPl',NULL,'54.36.148.210','Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUmZVdzU3dnl0ZTJWVm9GZlYxN2dDS2tZVTFEQ2k1S0FVSk5uTVkzaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHBzOi8vd3d3LnNycHNrYXRlbmlzbGlnYS5ycy9zdGF0aXN0aWthIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1748878756),('W3550ZIhl5QdEaapGefkDzlBVfLsV5zOQgUPnvvb',NULL,'54.36.149.2','Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaGFEM213UW1aVGRuT3ZnZXZ0MWZqY0xTTEM3a2xCRGk3ODM3d25idCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL21hdGVqYS1tYW5pYyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1748886679),('wDg4UEYzqiDql3L8LCaBmjlbOJOVNl9TENY0FwBb',NULL,'20.171.207.47','Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMDV0b2dCblNCRGp3SXBrZW1sZWhUcU1vZVBUdlFuWEhZQjUxN3NvSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL3N0YXRpc3Rpa2EiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1748887647),('XAGBcJZpFs5hEj2aynVTRL0xqdH1J2E5gdEW5bMj',NULL,'66.249.66.193','Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.92 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiR0dSUzh3QTc0STIzR0M0WXdHNmYwR0tXeFZ0VXpqNDFBZGQ2WHF6YSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Nzg6Imh0dHBzOi8vd3d3LnNycHNrYXRlbmlzbGlnYS5ycy9nZXQtbGVhZ3VlL3BydmVuc3R2by12ZXRlcmFuYS1kb2Jvai10dXJuaXItMjAyNSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1748878782),('zpmHyPw0LVSG9Uqc1k3yIKhGpBcNcFPbbsVuiNil',NULL,'178.148.65.235','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiR2JWcW43T3pXcDZyY292NEpUYWd6dEk4MWFoQkRYcEZlVzhLb0lTRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc3Jwc2thdGVuaXNsaWdhLnJzL2dldC1wbGF5ZXItY2hhcnQvNzEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1748881527);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tennis_matches`
--

DROP TABLE IF EXISTS `tennis_matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tennis_matches` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `court_id` bigint unsigned DEFAULT NULL,
  `league_id` bigint unsigned DEFAULT NULL,
  `set_score` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `game_score` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `number` int DEFAULT NULL,
  `county` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `winner_point_gain` int NOT NULL,
  `loser_point_gain` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tennis_matches_court_id_foreign` (`court_id`),
  KEY `tennis_matches_league_id_foreign` (`league_id`),
  CONSTRAINT `tennis_matches_court_id_foreign` FOREIGN KEY (`court_id`) REFERENCES `courts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tennis_matches_league_id_foreign` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tennis_matches`
--

LOCK TABLES `tennis_matches` WRITE;
/*!40000 ALTER TABLE `tennis_matches` DISABLE KEYS */;
INSERT INTO `tennis_matches` VALUES (1,2,1,'9:4',NULL,'2024-12-13',1,'Beograd',136,38,'2025-05-31 17:03:15','2025-05-31 17:03:33'),(2,2,1,'2:0','6:3,4:2','2024-12-16',2,'Beograd',145,43,'2025-05-31 17:03:15','2025-05-31 17:03:34'),(3,2,1,'2:0','6:0,6:2','2024-12-20',3,'Beograd',161,28,'2025-05-31 17:03:15','2025-05-31 17:03:34'),(4,2,1,'9:2','','2024-12-25',4,'Beograd',140,29,'2025-05-31 17:03:15','2025-05-31 17:03:34'),(5,2,1,'6:5','','2024-12-28',5,'Beograd',119,45,'2025-05-31 17:03:15','2025-05-31 17:03:34'),(6,2,1,'2:0','6:2,6:1','2025-01-03',6,'Beograd',166,35,'2025-05-31 17:03:15','2025-05-31 17:03:34'),(7,2,1,'6:1','','2025-01-08',7,'Beograd',103,21,'2025-05-31 17:03:15','2025-05-31 17:03:35'),(8,2,1,'9:0','','2025-01-13',8,'Beograd',146,19,'2025-05-31 17:03:15','2025-05-31 17:03:35'),(9,2,1,'6:4','','2025-01-14',9,'Beograd',104,37,'2025-05-31 17:03:15','2025-05-31 17:03:35'),(10,2,1,'5:4','','2025-01-17',10,'Beograd',117,41,'2025-05-31 17:03:15','2025-05-31 17:03:35'),(11,2,1,'5:0','','2025-01-17',11,'Beograd',117,19,'2025-05-31 17:03:15','2025-05-31 17:03:35'),(12,2,1,'2:0','4:1,4:1','2025-01-20',12,'Beograd',121,27,'2025-05-31 17:03:15','2025-05-31 17:03:35'),(13,2,1,'9:1','','2025-01-24',13,'Beograd',150,25,'2025-05-31 17:03:15','2025-05-31 17:03:36'),(14,2,1,'2:0','6:0,4:0','2025-01-28',14,'Beograd',139,16,'2025-05-31 17:03:15','2025-05-31 17:03:36'),(15,2,1,'7:6','','2025-02-03',15,'Beograd',137,54,'2025-05-31 17:03:15','2025-05-31 17:03:36'),(16,2,1,'9:5','','2025-02-05',16,'Beograd',154,49,'2025-05-31 17:03:15','2025-05-31 17:03:36'),(17,5,1,'2:0','6:1,3:1','2025-02-05',17,'Beograd',154,32,'2025-05-31 17:03:15','2025-05-31 17:03:36'),(18,2,1,'9:6','','2025-02-07',18,'Beograd',154,54,'2025-05-31 17:03:15','2025-05-31 17:03:36'),(19,3,1,'2:1','7:6,4:6,6:4','2025-02-08',19,'Vrnjačka Banja',220,111,'2025-05-31 17:03:15','2025-05-31 17:03:36'),(20,2,1,'9:4','','2025-02-09',20,'Beograd',155,43,'2025-05-31 17:03:15','2025-05-31 17:03:37'),(21,5,1,'2:0','6:0,6:1','2025-02-11',21,'Beograd',180,26,'2025-05-31 17:03:15','2025-05-31 17:03:37'),(22,5,1,'9:4','','2025-02-11',22,'Beograd',155,43,'2025-05-31 17:03:15','2025-05-31 17:03:37'),(23,5,1,'9:7','','2025-02-12',23,'Beograd',135,57,'2025-05-31 17:03:15','2025-05-31 17:03:37'),(24,2,1,'2:0','4:1,4:1','2025-02-17',24,'Beograd',128,28,'2025-05-31 17:03:15','2025-05-31 17:03:37'),(25,2,1,'6:1','','2025-02-18',25,'Beograd',112,22,'2025-05-31 17:03:15','2025-05-31 17:03:37'),(26,5,1,'8:3','','2025-02-19',26,'Beograd',150,38,'2025-05-31 17:03:15','2025-05-31 17:03:38'),(27,5,1,'3:0','4:1,4:0,4:2','2025-02-20',27,'Beograd',183,38,'2025-05-31 17:03:15','2025-05-31 17:03:38'),(28,5,1,'9:3',NULL,'2025-02-21',28,'Beograd',138,34,'2025-05-31 17:03:15','2025-05-31 17:03:38'),(29,4,1,'2:1','1:4,4:0,4:1','2025-02-21',29,'Beograd',159,50,'2025-05-31 17:03:15','2025-05-31 17:03:38'),(30,5,1,'9:6','','2025-02-25',30,'Beograd',139,52,'2025-05-31 17:03:15','2025-05-31 17:03:38'),(31,2,1,'2:0','4:1,4:0','2025-02-21',31,'Beograd',150,27,'2025-05-31 17:03:15','2025-05-31 17:03:38'),(32,2,1,'4:3','','2025-02-22',32,'Beograd',117,38,'2025-05-31 17:03:15','2025-05-31 17:03:38'),(33,5,1,'9:1','','2025-02-26',33,'Beograd',139,23,'2025-05-31 17:03:15','2025-05-31 17:03:39'),(34,4,1,'7:5','','2025-02-15',34,'Beograd',140,50,'2025-05-31 17:03:15','2025-05-31 17:03:39'),(35,5,1,'3:0','4:0,4:0,4:0','2025-02-27',35,'Beograd',186,21,'2025-05-31 17:03:15','2025-05-31 17:03:39'),(36,2,1,'2:1','3:4,4:1,1:0','2025-03-01',36,'Beograd',131,47,'2025-05-31 17:03:15','2025-05-31 17:03:39'),(37,2,1,'7:4',NULL,'2025-03-02',37,'Beograd',145,45,'2025-05-31 17:03:15','2025-05-31 17:03:39'),(38,4,1,'6:1',NULL,'2025-03-02',38,'Beograd',136,27,'2025-05-31 17:03:15','2025-05-31 17:03:39'),(39,2,1,'6:4',NULL,'2025-03-02',39,'Beograd',136,45,'2025-05-31 17:03:15','2025-05-31 17:03:39'),(40,2,1,'2:1','4:1,2:4,1:0','2025-03-03',40,'Beograd',123,47,'2025-05-31 17:03:15','2025-05-31 17:03:39'),(41,5,1,'6:3',NULL,'2025-03-04',41,'Beograd',94,31,'2025-05-31 17:03:15','2025-05-31 17:03:40'),(42,5,1,'9:4',NULL,'2025-03-05',42,'Beograd',120,37,'2025-05-31 17:03:15','2025-05-31 17:03:40'),(43,2,1,'4:2',NULL,'2025-03-05',43,'Beograd',120,33,'2025-05-31 17:03:15','2025-05-31 17:03:40'),(44,5,1,'3:0','4:0,4:1,4:2','2025-03-06',44,'Beograd',146,31,'2025-05-31 17:03:15','2025-05-31 17:03:40'),(45,5,1,'2:0','6:1,6:2','2025-03-07',45,'Beograd',189,39,'2025-05-31 17:03:15','2025-05-31 17:03:40'),(46,7,1,'6:2',NULL,'2025-03-07',46,'Beograd',137,33,'2025-05-31 17:03:15','2025-05-31 17:03:41'),(47,5,1,'2:1','0:4,4:2,1:0','2025-03-09',47,'Beograd',129,58,'2025-05-31 17:03:15','2025-05-31 17:03:41'),(48,5,1,'8:1',NULL,'2025-03-09',48,'Beograd',155,28,'2025-05-31 17:03:15','2025-05-31 17:03:41'),(49,5,1,'9:3',NULL,'2025-03-11',49,'Beograd',164,40,'2025-05-31 17:03:15','2025-05-31 17:03:41'),(50,5,1,'6:4',NULL,'2025-03-14',50,'Beograd',96,37,'2025-05-31 17:03:15','2025-05-31 17:03:41'),(51,5,1,'3:1','4:1,4:2,2:4,4:0','2025-03-15',51,'Beograd',209,65,'2025-05-31 17:03:15','2025-05-31 17:03:41'),(52,5,1,'2:1','4:0,2:4,1:0','2025-03-16',52,'Beograd',148,46,'2025-05-31 17:03:15','2025-05-31 17:03:41'),(53,2,1,'2:0','6:3,2:0','2025-03-16',53,'Beograd',157,40,'2025-05-31 17:03:15','2025-05-31 17:03:41'),(54,2,1,'7:3',NULL,'2025-03-16',54,'Beograd',148,40,'2025-05-31 17:03:15','2025-05-31 17:03:42'),(55,5,1,'7:5',NULL,'2025-03-17',55,'Beograd',127,48,'2025-05-31 17:03:15','2025-05-31 17:03:42'),(56,5,1,'9:6',NULL,'2025-03-19',56,'Beograd',145,54,'2025-05-31 17:03:15','2025-05-31 17:03:42'),(57,5,1,'3:0','4:0,4:1,4:0','2025-03-20',57,'Beograd',194,28,'2025-05-31 17:03:15','2025-05-31 17:03:42'),(58,7,1,'3:0','4:3,4:1,4:2','2025-03-21',58,'Beograd',194,59,'2025-05-31 17:03:15','2025-05-31 17:03:42'),(59,5,1,'5:3',NULL,'2025-03-21',59,'Beograd',132,41,'2025-05-31 17:03:15','2025-05-31 17:03:42'),(60,2,1,'3:0','4:1,4:1,4:1','2025-03-21',60,'Beograd',194,41,'2025-05-31 17:03:15','2025-05-31 17:03:42'),(61,11,1,'3:0','4:0,4:0,4:0','2025-03-22',61,'Beograd',194,22,'2025-05-31 17:03:15','2025-05-31 17:03:43'),(62,12,1,'2:0','4:0,4:1','2025-03-23',62,'Beograd',137,24,'2025-05-31 17:03:15','2025-05-31 17:03:43'),(63,13,1,'2:0','5:3,4:1','2025-03-23',63,'Beograd',168,47,'2025-05-31 17:03:15','2025-05-31 17:03:43'),(64,5,1,'2:0','6:0,6:4','2025-03-24',64,'Beograd',151,38,'2025-05-31 17:03:15','2025-05-31 17:03:43'),(65,7,1,'2:1','4:1,3:4,1:0','2025-03-26',65,'Beograd',160,53,'2025-05-31 17:03:15','2025-05-31 17:03:43'),(66,14,1,'2:1','3:4,4:2,1:0','2025-03-27',66,'Beograd',161,60,'2025-05-31 17:03:15','2025-05-31 17:03:43'),(67,5,1,'6:4',NULL,'2025-03-27',67,'Beograd',98,38,'2025-05-31 17:03:15','2025-05-31 17:03:44'),(68,7,1,'3:0','4:1,4:0,4:0','2025-03-28',68,'Beograd',152,20,'2025-05-31 17:03:15','2025-05-31 17:03:44'),(69,12,1,'2:1','4:0,2:4,3:2','2025-03-30',69,'Beograd',148,56,'2025-05-31 17:03:15','2025-05-31 17:03:44'),(70,12,1,'2:0','4:0,4:0','2025-03-31',70,'Beograd',162,22,'2025-05-31 17:03:15','2025-05-31 17:03:44'),(71,5,1,'9:4',NULL,'2025-03-31',71,'Beograd',171,48,'2025-05-31 17:03:15','2025-05-31 17:03:44'),(72,5,1,'9:0',NULL,'2025-04-01',72,'Beograd',171,23,'2025-05-31 17:03:15','2025-05-31 17:03:44'),(73,3,1,'2:1','7:6,6:7,7:6','2025-04-02',73,'Vrnjačka Banja',271,142,'2025-05-31 17:03:15','2025-05-31 17:03:44'),(74,7,1,'7:5',NULL,'2025-04-04',74,'Beograd',154,54,'2025-05-31 17:03:15','2025-05-31 17:03:45'),(75,15,1,'3:0','6:1,6:2,6:1','2025-04-05',75,'Beograd',254,48,'2025-05-31 17:03:15','2025-05-31 17:03:45'),(76,5,1,'8:3',NULL,'2025-04-06',76,'Beograd',141,37,'2025-05-31 17:03:15','2025-05-31 17:03:45'),(77,12,1,'2:0','4:3,4:1','2025-04-06',77,'Beograd',164,48,'2025-05-31 17:03:15','2025-05-31 17:03:45'),(78,5,1,'9:4',NULL,'2025-04-06',78,'Beograd',173,48,'2025-05-31 17:03:15','2025-05-31 17:03:45'),(79,5,1,'9:4',NULL,'2025-04-07',79,'Beograd',127,39,'2025-05-31 17:03:15','2025-05-31 17:03:45'),(80,7,1,'3:0','4:0,4:0,4:0','2025-04-07',80,'Beograd',155,14,'2025-05-31 17:03:15','2025-05-31 17:03:45'),(81,7,1,'2:0','4:2,4:1','2025-04-08',81,'Beograd',141,37,'2025-05-31 17:03:15','2025-05-31 17:03:46'),(82,5,1,'1:0','9:3','2025-04-09',82,'Beograd',174,42,'2025-05-31 17:03:15','2025-05-31 17:03:46'),(83,16,1,'2:0','4:1,3:2','2025-04-11',83,'Italija',156,42,'2025-05-31 17:03:15','2025-05-31 17:03:46'),(84,15,1,'2:1','3:4,4:1,4:1','2025-04-13',84,'Beograd',193,62,'2025-05-31 17:03:15','2025-05-31 17:03:46'),(85,17,1,'2:0','4:0,4:2','2025-04-13',85,'Italija',143,31,'2025-05-31 17:03:15','2025-05-31 17:03:46'),(86,7,2,'9:6',NULL,'2025-04-17',86,'Beograd',176,62,'2025-05-31 17:03:15','2025-05-31 17:03:46'),(87,5,1,'8:3',NULL,'2025-04-17',87,'Beograd',120,33,'2025-05-31 17:03:15','2025-05-31 17:03:46'),(88,5,1,'2:0','6:4,7:5','2025-04-20',88,'Beograd',191,77,'2025-05-31 17:03:15','2025-05-31 17:03:47'),(89,5,1,'2:0','6:2,6:2','2025-04-21',89,'Beograd',159,40,'2025-05-31 17:03:15','2025-05-31 17:03:47'),(90,7,2,'9:8',NULL,'2025-04-21',90,'Beograd',177,76,'2025-05-31 17:03:15','2025-05-31 17:03:47'),(91,11,1,'2:0','4:1,4:1','2025-04-23',91,'Beograd',169,37,'2025-05-31 17:03:15','2025-05-31 17:03:47'),(92,5,1,'6:4',NULL,'2025-04-25',92,'Beograd',127,45,'2025-05-31 17:03:15','2025-05-31 17:03:47'),(93,12,1,'9:5',NULL,'2025-04-25',93,'Beograd',179,56,'2025-05-31 17:03:15','2025-05-31 17:03:47'),(94,14,1,'9:0',NULL,'2025-04-26',94,'Beograd',179,24,'2025-05-31 17:03:15','2025-05-31 17:03:47'),(95,14,1,'3:0','4:2,4:1,3:2','2025-04-27',95,'Beograd',198,57,'2025-05-31 17:03:15','2025-05-31 17:03:48'),(96,5,1,'3:0','6:0,6:2,7:5','2025-04-28',96,'Beograd',227,60,'2025-05-31 17:03:15','2025-05-31 17:03:48'),(97,7,2,'9:7',NULL,'2025-04-28',97,'Beograd',180,70,'2025-05-31 17:03:15','2025-05-31 17:03:48'),(98,7,2,'9:5',NULL,'2025-04-29',98,'Beograd',180,57,'2025-05-31 17:03:15','2025-05-31 17:03:48'),(99,5,1,'6:4',NULL,'2025-04-30',99,'Beograd',152,50,'2025-05-31 17:03:15','2025-05-31 17:03:48'),(100,5,1,'2:0','6:0,4:2','2025-04-10',100,'Beograd',183,36,'2025-05-31 17:03:15','2025-05-31 17:03:48'),(101,7,2,'9:3',NULL,'2025-04-30',101,'Beograd',180,44,'2025-05-31 17:03:15','2025-05-31 17:03:48'),(102,5,1,'2:0','6:3,6:4','2025-05-02',102,'Beograd',220,74,'2025-05-31 17:03:15','2025-05-31 17:03:48'),(103,18,1,'2:1','4:1,2:4,1:0','2025-05-03',103,'Grčka',170,60,'2025-05-31 17:03:15','2025-05-31 17:03:49'),(104,12,1,'9:6',NULL,'2025-05-06',104,'Beograd',190,67,'2025-05-31 17:03:15','2025-05-31 17:03:49'),(105,5,1,'7:5',NULL,'2025-05-07',105,'Beograd',120,50,'2025-05-31 17:03:16','2025-05-31 17:03:49'),(106,12,2,'9:2',NULL,'2025-05-08',106,'Beograd',190,39,'2025-05-31 17:03:16','2025-05-31 17:03:49'),(107,5,1,'2:1','4:2,1:4,4:0','2025-05-09',107,'Beograd',190,67,'2025-05-31 17:03:16','2025-05-31 17:03:49'),(108,5,1,'2:1','6:2,6:2,6:7','2025-05-07',108,'Beograd',255,97,'2025-05-31 17:03:16','2025-05-31 17:03:49'),(109,3,1,'2:0','6:1,6:2','2025-05-09',109,'Vrnjačka Banja',220,46,'2025-05-31 17:03:16','2025-05-31 17:03:49'),(110,5,1,'3:0','6:2,6:3,9:4','2025-05-09',110,'Beograd',310,88,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(111,7,2,'9:6',NULL,'2025-05-10',111,'Beograd',190,67,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(112,5,1,'8:3',NULL,'2025-05-11',112,'Beograd',180,46,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(113,5,1,'8:3',NULL,'2025-05-09',113,'Beograd',130,36,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(114,7,2,'9:6',NULL,'2025-05-11',114,'Beograd',190,67,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(115,7,2,'9:5',NULL,'2025-05-11',115,'Beograd',190,60,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(116,5,1,'2:0','4:2,4:1','2025-05-12',116,'Beograd',155,41,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(117,5,1,'2:0','6:4,6:3','2025-05-14',117,'Beograd',170,64,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(118,7,1,'4:1',NULL,'2025-05-15',118,'Beograd',140,32,'2025-05-31 17:03:16','2025-05-31 17:03:50'),(119,11,10,'9:1',NULL,'2025-05-16',119,'Beograd',190,32,'2025-05-31 17:03:16','2025-05-31 17:03:51'),(120,7,1,'2:0','4:2,4:0','2025-05-17',120,'Beograd',180,39,'2025-05-31 17:03:16','2025-05-31 17:03:51'),(121,4,1,'3:0','4:0,4:0,4:1','2025-05-18',121,'Beograd',220,32,'2025-05-31 17:03:16','2025-05-31 17:03:51'),(122,5,1,'9:5',NULL,'2025-05-23',122,'Beograd',165,55,'2025-05-31 17:03:16','2025-05-31 17:03:51'),(123,7,2,'9:6',NULL,'2025-05-24',123,'Beograd',190,67,'2025-05-31 17:03:16','2025-05-31 17:03:51'),(124,12,1,'2:1','1:4,4:3,1:0','2025-05-25',124,'Beograd',160,74,'2025-05-31 17:03:16','2025-05-31 17:03:51'),(125,5,1,'6:4',NULL,'2025-05-26',125,'Beograd',160,53,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(126,5,1,'9:4',NULL,'2025-05-27',126,'Beograd',190,53,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(127,5,1,'3:0','6:0,6:1,6:0','2025-05-27',127,'Beograd',230,22,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(128,7,2,'9:3',NULL,'2025-05-27',128,'Beograd',190,46,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(129,7,1,'2:0','4:0,4:2','2025-05-28',129,'Beograd',180,39,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(130,7,1,'8:1',NULL,'2025-05-28',130,'Beograd',180,32,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(131,19,1,'2:0','6:4,6:4','2025-05-28',131,'Beograd',220,81,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(132,21,13,'2:0','7:6,6:0','2025-05-28',132,'Kragujevac',230,67,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(133,20,12,'9:0',NULL,'2025-05-31',133,'Beograd',190,25,'2025-05-31 17:03:16','2025-05-31 17:03:52'),(134,12,1,'4:0','4:0,4:0,4:2,4:0','2025-06-01',134,'Beograd',260,39,'2025-06-01 12:18:44','2025-06-01 12:18:44'),(135,22,1,'2:0','6:4,7:6','2025-06-01',135,'Beograd',230,95,'2025-06-01 16:38:45','2025-06-01 16:38:45'),(136,21,13,'2:0','6:1,6:4','2025-06-01',136,'Kragujevac',220,60,'2025-06-02 05:28:20','2025-06-02 05:28:20'),(137,4,1,'5:3',NULL,'2025-06-02',137,'Beograd',150,46,'2025-06-02 12:31:17','2025-06-02 12:31:17');
/*!40000 ALTER TABLE `tennis_matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nikola Tosic','admin','nikola@openinnovation.me','2025-06-01 14:05:54','$2y$12$zTefiJlcG/2mfogp4YDV3udTTR1iS3fEFYtTT3VZMzqmq9JvywvDS','C0UhEfVyCtZSmghoLr0rh8salHNBcvF8CUiLYRnZwGgTPqHB4CGUGUyhwg0V','2025-06-01 14:05:54','2025-06-02 05:41:54'),(2,'Bogdan Randjelovic','bogdan','bogdan@openinnovation.me','2025-06-01 14:05:54','$2y$12$2gGRGZ1vLsOoCy1bbUh/JeMPx1b3lbLdOqm8px5O9/c68mIJ4R8W6','jskpSnXQ22MJt3uqz1oSHtqj8xgIWMgiq9hg9RFDGIKjT2Nz2J1SQL5hg4nt','2025-06-01 14:05:54','2025-06-01 14:05:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-02 21:50:48
