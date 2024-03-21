DROP DATABASE IF EXISTS ROCHESTER;
CREATE DATABASE ROCHESTER;
USE ROCHESTER;

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
TABLE customer
stores all customer information
PK - customerID (auto incrementing)
FK - roleID (roles)
*/
CREATE TABLE customer(
    customerID INT PRIMARY KEY AUTO_INCREMENT,
    fName VARCHAR(20) NOT NULL,
    mInitial VARCHAR(1),
    lName VARCHAR(50) NOT NULL,
    suffix VARCHAR(10),
    phoneNum VARCHAR(10) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL,
    address1 VARCHAR(50) NOT NULL,
    address2 VARCHAR (50),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip VARCHAR(5) NOT NULL,
    activated SMALLINT,
    roleID SMALLINT,
    FOREIGN KEY(roleID) REFERENCES roles(roleID)
);

/*
TABLE customer_credit_info
stores hashed information of the customers credit car and drivers license
PK - customerID
FK - customerID (customers)
*/
CREATE TABLE customer_credit_info(
	customerID INT PRIMARY KEY,
    hashedCreditNumber VARCHAR(200) NOT NULL,
    hashedSecurity VARCHAR(200) NOT NULL,
    hashedZipcode VARCHAR(200) NOT NULL,
    hashedExpiration VARCHAR(200) NOT NULL,
    hashedDriversID VARCHAR (200) NOT NULL,
    FOREIGN KEY(customerID) REFERENCES customer(customerID)
);

/*
TABLE customer_password
stores customer hashed password (no looking mr FBI agent)
PK - customerID
FK - customerID (customers)
*/
CREATE TABLE customer_password(
	customerID INT PRIMARY KEY,
    hashedPass VARCHAR(200) NOT NULL,
    FOREIGN KEY (customerID) REFERENCES customer(customerID) 
);

/*
TABLE suspended_users
stores users who are suspended
PK - employeeID
FK - roleID(roles)
*/
CREATE TABLE suspended_users(
	userID INT PRIMARY KEY,
    suspended VARCHAR (3) NOT NULL,
    FOREIGN KEY (userID) REFERENCES customer(customerID)
);

/*
TABLE employees
stores employee information like office and username and role
PK - employeeID
FK - roleID(roles)
*/
CREATE TABLE employees(
	employeeID INT PRIMARY KEY AUTO_INCREMENT,
    roleID SMALLINT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    fullname VARCHAR(100) NOT NULL,
    office VARCHAR(50),
    FOREIGN KEY (roleID) REFERENCES roles(roleID)
);

/*
TABLE employee_password
stores employees hashed password (no looking mr FBI agent)
PK - employeeID
FK - roleID(roles)
*/
CREATE TABLE employee_password(
	employeeID INT PRIMARY KEY,
    hashedPass VARCHAR(200) NOT NULL,
    FOREIGN KEY (employeeID) REFERENCES employees(employeeID)
);

/*
TABLE location
stores data for locations for each car stop
PK - sublocationID
*/
CREATE TABLE location(
	sublocationID INT PRIMARY KEY AUTO_INCREMENT,
    locationName VARCHAR(400) NOT NULL UNIQUE,
    sublocationName VARCHAR(100) NOT NULL UNIQUE,
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
    carType VARCHAR(20) NOT NULL,
    battery DECIMAL(5,2) NOT NULL,
    status VARCHAR(20),
    reserved SMALLINT NOT NULL,
    sublocationID INT NOT NULL,
    FOREIGN KEY (sublocationID) REFERENCES location(sublocationID)
);

/*
TABLE jobs
stores information on each job done to a car
PK - employeeID
FK - carID
*/
CREATE TABLE jobs(
	taskID INT AUTO_INCREMENT PRIMARY KEY,
    employeeID INT,
    carID INT NOT NULL,
    task VARCHAR(20) NOT NULL,
    notes VARCHAR(500) NULL,
    jTimeDate DATETIME NOT NULL,
    FOREIGN KEY (carID) REFERENCES cars(carID),
    FOREIGN KEY (employeeID) REFERENCES employees(employeeID)
);

/*
TABLE reserved
stores information for each car that is reserved
PK - carID
FK - customerID, sublocationID
*/
CREATE TABLE reserved(
	carID INT PRIMARY KEY,
    customerID INT NOT NULL,
    sublocationID INT NOT NULL,
    rTime TIME NOT NULL,
    rDate DATE NOT NULL,
    FOREIGN KEY (carID) REFERENCES cars(carID),
    FOREIGN KEY (sublocationID) REFERENCES location(sublocationID)
);

/*
TABLE reservation_history
stores information of the reservation history for each car
PK - customerID
FK - carID, sublocationIDt, sublocationIDr
*/
CREATE TABLE reservation_history(
	customerID INT PRIMARY KEY,
    carID INT NOT NULL,
    timeTaken TIME NOT NULL,
    timeReturned TIME NOT NULL,
    dateTaken DATE NOT NULL,
    dateReturned DATE NOT NULL,
    sublocationIDt INT NOT NULL,
    sublocationIDr INT NOT NULL,
    FOREIGN KEY (carID) REFERENCES cars(carID),
    FOREIGN KEY (sublocationIDt) REFERENCES location(sublocationID),
    FOREIGN KEY (sublocationIDr) REFERENCES location(sublocationID)
);

/*
TABLE gps_location
stores gps location of cars
PK - carID
FK - carID, sublocationID
*/
CREATE TABLE gps_location (
	carID INT PRIMARY KEY,
    sublocationID INT,
    gpsLat DOUBLE NOT NULL,
    gpsLong DOUBLE NOT NULL,
    FOREIGN KEY (carID) REFERENCES cars(carID),
    FOREIGN KEY (sublocationID) REFERENCES location(sublocationID)
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
    employeeAdded INT,
    FOREIGN KEY (employeeAdded) REFERENCES employees(employeeID)
);

/*
TABLE calendar
stores the calendar id and number and days associated with that calendar
PK - calendarID
*/
CREATE TABLE calendar(
    calendarID INT PRIMARY KEY AUTO_INCREMENT,
    calendarNum INT NOT NULL,
    day DATE NOT NULL
);

/*
TABLE sublocation_calendar
lookup table for calendar and sublocation
PK - sublocationID
FK - sublocationID, calendarNum
*/
CREATE TABLE sublocation_calendar (
    sublocationID INT PRIMARY KEY NOT NULL,
    calendarNum INT NOT NULL,
    FOREIGN KEY (sublocationID) REFERENCES location(sublocation),
    FOREIGN KEY (calendarNum) REFERENCES calendar(calendarNum)
);

/*
TABLE reservation
stores the reservation for the car in the calendar
PK - reservationID
FK - customerID, carID, calendarNum, day
*/
CREATE TABLE reservation(){
    reservationID INT PRIMARY KEY AUTO_INCREMENT,
    customerID INT NOT NULL,
    carID INT NOT NULL,
    calendarNum INT NOT NULL,
    day DATE NOT NULL,
    timeBegin DATETIME NOT NULL,
    timeEnd DATETIME NOT NULL,
    FOREIGN KEY (customerID) REFERENCES customer(customerID),
    FOREIGN KEY (carID) REFERENCES cars(carID),
    FOREIGN KEY (calendarNum) REFERENCES calendar(calendarNum),
    FOREIGN KEY (day) REFERENCES calendar(day)
}