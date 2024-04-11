DROP DATABASE IF EXISTS ROCHESTER;
CREATE DATABASE ROCHESTER;
USE ROCHESTER;

SET SQL_SAFE_UPDATES = 0;

/*
TABLE roles
stores role information
PK - roleID
*/
CREATE TABLE roles(
	roleID SMALLINT PRIMARY KEY,
    rName VARCHAR(30),
    description VARCHAR(500)
);

/*
TABLE user
stores information for all of our users, userID will be the ID that is stored in our login service
PK - customerID
FK - rolesID
*/
CREATE TABLE users(
    userID VARCHAR(100) PRIMARY KEY,
    roleID SMALLINT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    fName VARCHAR(20) NOT NULL,
    mInitial VARCHAR(1),
    lName VARCHAR(50) NOT NULL,
    suffix VARCHAR(10),
    phoneNum VARCHAR(10),
    email VARCHAR(50) NOT NULL,
    address1 VARCHAR(50) ,
    address2 VARCHAR (50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip VARCHAR(5),
    activated SMALLINT,
    office VARCHAR(50),
    FOREIGN KEY (roleID) REFERENCES roles(roleID)
);

/*
TABLE customer_credit_info
stores hashed information of the customers credit car and drivers license
PK - userID
FK - userID
*/
CREATE TABLE customer_credit_info(
	userID VARCHAR(100) PRIMARY KEY,
    hashedCreditNumber VARCHAR(200) NOT NULL,
    hashedSecurity VARCHAR(200) NOT NULL,
    hashedZipcode VARCHAR(200) NOT NULL,
    hashedExpiration VARCHAR(200) NOT NULL,
    hashedDriversID VARCHAR (200) NOT NULL,
    FOREIGN KEY(userID) REFERENCES users(userID)
);

/*
TABLE suspended_users
stores users who are suspended
PK - userID
FK - userID
*/
CREATE TABLE suspended_users(
	userID VARCHAR(100) PRIMARY KEY,
    FOREIGN KEY (userID) REFERENCES users(userID)
);

/*
TABLE location
stores data for locations for each car stop
PK - sublocationID
*/
CREATE TABLE location(
	locationID INT PRIMARY KEY AUTO_INCREMENT,
    locationName VARCHAR(400) NOT NULL UNIQUE,
    locationArea VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(400),
    cityName VARCHAR (30) NOT NULL,
    state VARCHAR(2) NOT NULL,
    lat DECIMAL(9,6),
    lon DECIMAL(9,6)
);

/*
TABLE cars
stores data for each car and how much battery and its status for its sublocation
PK - carID
FK - sublocationID
*/
CREATE TABLE cars(
	carID INT PRIMARY KEY AUTO_INCREMENT,
    carType VARCHAR(20),
    battery DECIMAL(5,2) NOT NULL,
    status VARCHAR(20),
    reserved SMALLINT NOT NULL,
    currentLocationID INT NOT NULL,
    FOREIGN KEY (currentLocationID) REFERENCES location(locationID)
);

/*
TABLE jobs
stores information on each job done to a car
PK - employeeID
FK - carID
*/
CREATE TABLE jobs(
	taskID INT AUTO_INCREMENT PRIMARY KEY,
    userID VARCHAR(100),
    carID INT NOT NULL,
    task VARCHAR(20) NOT NULL,
    notes VARCHAR(500) NULL,
    jTimeDate DATETIME NOT NULL,
    FOREIGN KEY (carID) REFERENCES cars(carID),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

/*
TABLE gps_location
stores gps location of cars
PK - carID
FK - carID, sublocationID
*/
CREATE TABLE gps_location (
	carID INT PRIMARY KEY,
    locationID INT,
    gpsLat DOUBLE NOT NULL,
    gpsLong DOUBLE NOT NULL,
    FOREIGN KEY (carID) REFERENCES cars(carID),
    FOREIGN KEY (locationID) REFERENCES location(locationID)
);

/*
TABLE faq
stores the faq questions for the FAQ page and can be dynamically updated
PK - faqID
FK - employeeAdded
*/
CREATE TABLE faq (
    faqID INT PRIMARY KEY AUTO_INCREMENT,
    faqQuestion VARCHAR (500),
    faqAnswer VARCHAR (500),
    userID VARCHAR(100),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

/*
TABLE reservation
stores the reservation for the car in the calendar
PK - reservationID
FK - customerID, carID, locationID, locationIDToReturn
*/
CREATE TABLE reservation (
    reservationID INT PRIMARY KEY AUTO_INCREMENT,
    userID VARCHAR(100) NOT NULL,
    carID INT NOT NULL,
    dateCreated INT NOT NULL,
    locationID INT NOT NULL,
    locationIDToReturn INT NOT NULL,
    timeBegin DATETIME NOT NULL,
    timeEnd DATETIME NOT NULL,
    paid BOOLEAN NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (carID) REFERENCES cars(carID),
    FOREIGN KEY (locationID) REFERENCES location(locationID),
    FOREIGN KEY (locationIDToReturn) REFERENCES location(locationID)
);

/*
TABLE days
stores the days that are available for booking
PK - dayID
*/
CREATE TABLE days(
	dayID INT PRIMARY KEY AUTO_INCREMENT,
    day DATE NOT NULL
);

/*
TABLE price
stores the prices for Gyrocar reservation
PK - priceID
*/
CREATE TABLE price(
    priceID INT PRIMARY KEY AUTO_INCREMENT,
    priceName VARCHAR(80),
    priceInCents BIGINT
);

DELIMITER $$
/*
TABLE days
insert a given day into the days table
PK - dayID
*/
CREATE PROCEDURE insertDays(
	dt DATE
)
BEGIN
   INSERT INTO days(day)
   VALUES(dt);
END$$

DELIMITER $$
/*
STORED PROCEDURE loadDays
A procedure to call loadDays, which will while loop the amount of days and call the insertDays procedure
*/
CREATE PROCEDURE loadDays(
   startDate DATE,
   day INT
)
BEGIN
   DECLARE counter INT DEFAULT 1;
   DECLARE dt DATE DEFAULT startDate;
   WHILE counter <= day DO
       CALL insertDays(dt);
       SET counter = counter + 1;
       SET dt = DATE_ADD(dt,INTERVAL 1 day);
   END WHILE;
END$$
DELIMITER ;

/*
STORED PROCEDURE addRemoveDays
A procedure to add the 31st day and remove the previous day
*/
DELIMITER $$
CREATE PROCEDURE addRemoveDays(
	yesterday DATE,
    31stDate DATE
)
BEGIN
	DELETE FROM days WHERE day = yesterday;
    INSERT INTO days(day) VALUES (31stDate);
END$$
DELIMITER ;

/*
EVENT addRemoveDays
An event that will update the database removing the previous day and 
*/
CREATE EVENT addRemoveDays
    ON SCHEDULE EVERY 1 DAY
    STARTS '2024-03-24 00:00:01'
    DO
      SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) INTO @yesterday_date;
	  SELECT DATE_ADD(CURDATE(), INTERVAL 30 DAY) INTO @thirtydays;
	  CALL addRemoveDays(@yesterday_date, @thirtydays);

/*
TABLE reports
Stores the reports that mechanics make for the cars. Reports can range from anything to 
simple check ups, fatal errors, routine maintenance, etc.
PK - reportID
FK - carID, sublocationID
*/

CREATE TABLE reports (
    reportID INT PRIMARY KEY AUTO_INCREMENT,
    reportType ENUM('Service Report','Status Report','Damage Report','Miscellaneous') NOT NULL,
    carID INT NOT NULL,
    sublocationID INT NOT NULL,
    reportStatus VARCHAR(20) NOT NULL,
    timeSpentLabor VARCHAR(6) NOT NULL,
    tasks VARCHAR(255) NOT NULL,
    notes VARCHAR(255) NOT NULL,
    FOREIGN KEY (carID) REFERENCES cars(carID)
    -- FOREIGN KEY (sublocationID) REFERENCES location(sublocationID)
);