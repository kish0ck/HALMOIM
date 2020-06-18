CREATE TABLE `hal`.`user` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `birth` VARCHAR(20) NOT NULL,
  `gender` INT NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `addr` VARCHAR(200) NOT NULL,
  `profile_img` VARCHAR(1000) NULL DEFAULT 'default.jpg',
  `login_img` VARCHAR(1000) NOT NULL,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  PRIMARY KEY (`uid`));


CREATE TABLE `hal`.`moim` (
  `mid` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `time` DATETIME NOT NULL,
  `location` VARCHAR(200) NOT NULL,
  `uid` INT NOT NULL,
  `state` TINYINT NULL DEFAULT 1,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  `coment` VARCHAR(3000) NULL,
  `moim_img` VARCHAR(1000) NULL DEFAULT 'default.jpg',
  PRIMARY KEY (`mid`),
  INDEX `uid_idx` (`uid` ASC),
  CONSTRAINT `moimfkuid`
    FOREIGN KEY (`uid`)
    REFERENCES `hal`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `hal`.`participate` (
  `pid` INT NOT NULL AUTO_INCREMENT,
  `mid` INT NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`pid`),
  INDEX `mid_idx` (`mid` ASC),
  INDEX `uid_idx` (`uid` ASC),
  CONSTRAINT `partfkmid`
    FOREIGN KEY (`mid`)
    REFERENCES `hal`.`moim` (`mid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `partfkuid`
    FOREIGN KEY (`uid`)
    REFERENCES `hal`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `hal`.`room` (
  `rid` INT NOT NULL AUTO_INCREMENT,
  `uid1` INT NOT NULL,
  `uid2` INT NOT NULL,
  PRIMARY KEY (`rid`),
  INDEX `roomfkuid1_idx` (`uid1` ASC),
  INDEX `roomfkuid2_idx` (`uid2` ASC),
  CONSTRAINT `roomfkuid1`
    FOREIGN KEY (`uid1`)
    REFERENCES `hal`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `roomfkuid2`
    FOREIGN KEY (`uid2`)
    REFERENCES `hal`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `hal`.`chat` (
  `cid` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(3000) NOT NULL,
  `time` DATETIME NOT NULL,
  `state` TINYINT NULL DEFAULT 0,
  `rid` INT NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`cid`),
  INDEX `chatfkrid_idx` (`rid` ASC),
  INDEX `chatfkuid_idx` (`uid` ASC),
  CONSTRAINT `chatfkrid`
    FOREIGN KEY (`rid`)
    REFERENCES `hal`.`room` (`rid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `chatfkuid`
    FOREIGN KEY (`uid`)
    REFERENCES `hal`.`user` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

