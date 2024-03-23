USE ROCHESTER;

-- Roles inserts
INSERT INTO roles VALUES(1, "Customer", "Customers are basic roles with the ability to apply to the application.");
INSERT INTO roles VALUES(2, "Employee", "Employees are employees of Gyrogogo and have the ability to approve customers, pull reports, and sign into the business pages.");
INSERT INTO roles VALUES(3, "Mechanic", "Mechanics are employees that have the ability to pull reports on services and insert reports of services.");
INSERT INTO roles VALUES(4, "Manager", "Managers are employees of Gryogogo that have the ability to do everything an employee does and can instruct Mechanics to move cars.");
INSERT INTO roles VALUES(5, "Business Administrator", "Business Administrators are employees of Gyrogogo who have all abilities managers do, along with updating all cars and locations and making employee accounts.");
INSERT INTO roles VALUES(6, "Systems Administrator", "System Administrators have the ability to view all services and monitor systems infrastructure, along with making the first busiroleIDness account.");


-- Customer Insert

INSERT INTO customer(fName, mInitial, lName, suffix, phoneNum, username, email, address1, city, state, zip, activated, roleID) VALUES("Jake", "D", "Lombardo", "Mr.", "7162205513", "jdl1209", "jdl1209@rit.edu", "123 Easy Street", "Buffalo", "NY", "14211", 1, 1);
INSERT INTO customer_password(customerID, hashedPass) VALUES (1, "e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a");
INSERT INTO customer_credit_info(customerID, hashedCreditNumber, hashedSecurity, hashedZipcode, hashedExpiration, hashedDriversID) VALUES (1, "477bba133c182267fe5f086924abdc5db71f77bfc27f01f2843f2cdc69d89f05", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", "ba74db3f3765c22c955c93bcb30d236f47a73ba557fcfe585d29224d88757086", "ee932b02fc14995ab1085f9c686b916d3dd5d21361ca4c20923965257334991d", "fcc649de03750993e750a17e889683bb3b0170f4ed215e18cd0dd51fb67cff23");

INSERT INTO customer(fName, lName, phoneNum, username, email, address1, city, state, zip, activated, roleID) VALUES("Erich", "Snell", "5854752411", "eds5997", "eds5997@rit.edu", "123 Easy Street", "Rochester", "NY", "14623", 1, 1);
INSERT INTO customer_password(customerID, hashedPass) VALUES (2, "e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a");
INSERT INTO customer_credit_info(customerID, hashedCreditNumber, hashedSecurity, hashedZipcode, hashedExpiration, hashedDriversID) VALUES (2, "477bba133c182267fe5f086924abdc5db71f77bfc27f01f2843f2cdc69d89f05", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", "ba74db3f3765c22c955c93bcb30d236f47a73ba557fcfe585d29224d88757086", "ee932b02fc14995ab1085f9c686b916d3dd5d21361ca4c20923965257334991d", "fcc649de03750993e750a17e889683bb3b0170f4ed215e18cd0dd51fb67cff23");

INSERT INTO customer(fName, lName, phoneNum, username, email, address1, city, state, zip, activated, roleID) VALUES("Bad", "Customer", "5854752411", "bcustomer", "bcustomer123@rit.edu", "123 Easy Street", "Rochester", "NY", "14623", 1, 1);
INSERT INTO customer_password(customerID, hashedPass) VALUES (3, "e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a");
INSERT INTO customer_credit_info(customerID, hashedCreditNumber, hashedSecurity, hashedZipcode, hashedExpiration, hashedDriversID) VALUES (3, "477bba133c182267fe5f086924abdc5db71f77bfc27f01f2843f2cdc69d89f05", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", "ba74db3f3765c22c955c93bcb30d236f47a73ba557fcfe585d29224d88757086", "ee932b02fc14995ab1085f9c686b916d3dd5d21361ca4c20923965257334991d", "fcc649de03750993e750a17e889683bb3b0170f4ed215e18cd0dd51fb67cff23");
INSERT INTO suspended_users VALUES (3, "yes");

-- Employee Insert

INSERT INTO employees(roleID, username, fullname, office) VALUES (2, "jdl1209", "Jake Lombardo", "Rochester");
INSERT INTO employee_password VALUES (1, "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8");

INSERT INTO employees(roleID, username, fullname, office) VALUES (2, "eds5997", "Erich Snell", "Rochester");
INSERT INTO employee_password VALUES (2, "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8");

-- Location Insert

INSERT INTO location(locationName, sublocationName, address, cityName, state, lat, lon) VALUES ("The Mall at Greece Ridge", "GyroGoGo Northwest", "Somerworth Drive", "Rochester", "NY", 43.20663, -77.68602);
INSERT INTO location(locationName, sublocationName, cityName, state, lat, lon) VALUES ("Town Center of Webster", "GyroGoGo Northeast", "Webster", "NY", 43.21223, -77.45218);
INSERT INTO location(locationName, sublocationName, address, cityName, state, lat, lon) VALUES ("Genesee Crossroads Garage", "GyroGoGo Center City", "69 Andrews St", "Rochester", "NY", 43.15752, -77.61197);
INSERT INTO location(locationName, sublocationName, cityName, state, lat, lon) VALUES ("Perinton Square Mall", "GyroGoGo Southeast", "Fairport", "NY", 43.06997, -77.44159);
INSERT INTO location(locationName, sublocationName, cityName, state, lat, lon) VALUES ("Paul Road at Scottsville Rd", "GyroGoGo Airpot", "Rochester", "NY", 43.10884, -77.67537);

-- Car Insert

INSERT INTO cars(carType, battery, status, reserved, sublocationID) VALUES ("v1", 100.00, "active", 0, 1);
INSERT INTO cars(carType, battery, status, reserved, sublocationID) VALUES ("v2", 100.00, "active", 0, 2);
INSERT INTO cars(carType, battery, status, reserved, sublocationID) VALUES ("v1", 100.00, "active", 0, 3);
INSERT INTO cars(carType, battery, status, reserved, sublocationID) VALUES ("v2", 100.00, "active", 0, 4);
INSERT INTO cars(carType, battery, status, reserved, sublocationID) VALUES ("v2", 100.00, "serviced", 0, 5);
INSERT INTO cars(carType, battery, status, reserved, sublocationID) VALUES ("v1", 100.00, "active", 1, 1);

-- Job Insert

INSERT INTO jobs(employeeID, carID, task, notes, jTimeDate) VALUES (1, 5, "Wheel Air Pressure", "Added air to the front wheel of the Gyrocar.", "2024-01-01 22:10:10");

-- FAQ Insert

INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: What do I need to sign up for GyroGoGo? ", "A:  All you need to do is provide some basic information on yourself plus your driver’s license information and a valid credit card. You will receive your approval within 24-72 hours.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: You declined my application for membership. What can I do about this?", "A: When your application was declined, you were provided a reason for the decision. You need to rectify this problem. Most commonly this is because either a license or a credit card has expired. If you provide us with current credentials, we are happy to move your membership forward.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: What is the process for renting a gyrocar?", "A: Your first step is to apply for a membership in GyroGoGo on this website. You will have access to our rental functions as soon as your information has been verified. The step-by-step reservation process is clear and easy to use; just select your desired pick up and drop off locations and start/return dates and times. You’ll receive a confirmation email with pick up instructions and the necessary access code for your vehicle.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: Do I need a special kind of license to drive a gyrocar?", "A: No. A current, regular driver’s license is all that is required to legally drive a gyrocar.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: I have never ridden a motorcycle. How will I be able to safely drive a gyrocar?", "A: A gyrocar uses a gyroscope for balance, so you do not need to learn the kind of skills required for riding a motorcycle. Driving a gyrocar is much like driving your automobile, just more slender and more nimble.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: How far in advance can I make reservations for a GyroGoGo car?", "A: Reservations are allowed up to one month in advance.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: I regularly commute to the county courthouse. Can I make reservations for several trips at the same time? ", "A: Yes, a member may have more than one reservation booked at a time. ", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: Do I have to return the gyrocar to the same location I picked it up from?", "A: No, you are not required to return the vehicle to the same location. During the rental process you will be asked the return destination.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: Is there any limit to the distance from the pick up site I can drive the gyrocar? ", "A: Yes, our vehicles are geo-fenced to operate no more than 20 miles outside Monroe County. The car will shut off if you exceed this perimeter. ", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: Is there a limit to the number of hours or days I can rent the gyrocar? ", "A: You can rent a GyroGoGo car for the time duration that meets you needs up to one month. If you wish to reserve the car for longer, you will need to make sequential reservations.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: Can I change the date after I’ve made a reservation?", "A: Yes. You always have the ability to view and edit a reservation when signed into your account.", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: Can I recharge the gyrocar at an EV recharge station? ", "A: Yes, the gyrocars can be charged at any standard EV station. However, other vehicles cannot access the GyroGoGo chargers; the chargers have a deterrent feature that prevent such use. ", 1);
INSERT INTO faq(faqQuestion, faqAnswer, employeeAdded) VALUES ("Q: What do I do if there is a mechanical problem during my rental?", "A: Just call our 800 Customer Service number and we will promptly send a mechanic with a replacement vehicle to assist you.", 1);
