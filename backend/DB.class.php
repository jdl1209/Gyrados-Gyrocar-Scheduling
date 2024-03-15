<?php

// **********************************************************************
// **********************************************************************
// **                     Team Gyrados API                             ** 
// **                                                                  **
// **                                                                  **
// **       Created By JAKE LOMBARDO and ERICH SNELL                   **
// **                                                                  **
// **  All functions are queries called to the database using php      **
// **********************************************************************
// **********************************************************************

class DB {

    private $conn;

    public function __construct(){
        try {
            // Connect to the database (adjust these values based on your server configuration)
            $dsn = "mysql:host=localhost;dbname=rochester";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            $this->conn = new PDO($dsn, 'admin', 'password', $options);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            die(); // Stop script execution on connection failure
        }
    }

    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Sign-up
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    public function signUpCustomer($fName, $mInitial, $lName, $suffix, $phoneNum, $username, $email, $address1, $address2, $city, $state, $zip, $roleID, $password, $license, $creditCardNumber, $securityCode, $cardZip, $expirationDate) {
        // Check the email
        if ($this->checkEmail($email)) {
            // Email is not in use, continue checking phone
            if ($this->checkPhone($phoneNum)) {
                // Phone is not in use, continue checking license
                if ($this->checkLicense($license)) {
                    // License is not in use, proceed with the inserts
    
                    // Add the information to the databases
                    // Perform database inserts here...
    
                    //customer insert
                    if ($this->insertCustomerInfo($fName, $mInitial, $lName, $suffix, $phoneNum, $username, $email, $address1, $address2, $city, $state, $zip)) {
                        
                        // Get the customer ID from the last inserted row
                        $customerID = $this->conn->lastInsertId();
    
                        //customer_credit_info insert
                        if ($this->insertCustomerCreditInfo($creditCardNumber, $securityCode, $cardZip, $expirationDate)) {
    
                            //customer_password insert
                            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                            if ($this->insertCustomerPassword($customerID, $hashedPassword)) {
    
                                //customer_license insert
                                if ($this->insertCustomerLicense($license)) {
                                    echo "Registration successful!";
                                } else {
                                    echo "Error inserting customer license.";
                                }
                            } else {
                                echo "Error inserting customer password.";
                            }
                        } else {
                            echo "Error inserting customer credit info.";
                        }
                    } else {
                        echo "Error inserting customer info.";
                    }
                } else {
                    echo "License is already in use.";
                }
            } else {
                echo "Phone number is already in use.";
            }
        } else {
            echo "Email is already in use.";
        }
    }
    


    public function checkEmail($email) {
        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM customer WHERE email = ?");
            $stmt->bindParam(1, $email, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
    
            $count = $stmt->fetchColumn();
    
            // If count is equal to 0, the email is not in use
            return $count === 0;
    
        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            // For example, you can log the error and return false
            error_log("Error checking email: " . $e->getMessage());
            return false;
        }
    }

    public function checkPhone($phoneNumber) {
        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM customer WHERE phoneNum = ?");
            $stmt->bindParam(1, $phoneNumber, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
    
            $count = $stmt->fetchColumn();
    
            // If count is equal to 0, the phone number is not in use
            return $count === 0;
    
        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            // For example, you can log the error and return false
            error_log("Error checking phone number: " . $e->getMessage());
            return false;
        }
    }
    
    //Check the license 
    public function checkLicense($licenseNumber) {
        try {
            // Hash the provided license number
            $hashedLicenseNumber = hash('sha256', $licenseNumber);
    
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM customer_license WHERE hashed_licenseID = ?");
            $stmt->bindParam(1, $hashedLicenseNumber, PDO::PARAM_STR);
            $stmt->execute();
    
            $count = $stmt->fetchColumn();
    
            // If count is equal to 0, the license is not in use
            return $count === 0;
    
        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            // For example, you can log the error and return false
            error_log("Error checking license: " . $e->getMessage());
            return false;
        }
    }


    public function insertCustomerInfo($fName, $mInitial, $lName, $suffix, $phoneNum, $username, $email, $address1, $address2, $city, $state, $zip) {
        try {
            // Insert into the customers table
            $queryCustomer = "INSERT INTO customers (first_name, middle_initial, last_name, suffix, phone, username, email, address1, address2, city, state, zip) VALUES (:fName, :mInitial, :lName, :suffix, :phoneNum, :username, :email, :address1, :address2, :city, :state, :zip)";
            $stmtCustomer = $this->conn->prepare($queryCustomer);
    
            // Bind parameters for the customers table query
            $stmtCustomer->bindParam(':fName', $fName);
            $stmtCustomer->bindParam(':mInitial', $mInitial);
            $stmtCustomer->bindParam(':lName', $lName);
            $stmtCustomer->bindParam(':suffix', $suffix);
            $stmtCustomer->bindParam(':phoneNum', $phoneNum);
            $stmtCustomer->bindParam(':username', $username);
            $stmtCustomer->bindParam(':email', $email);
            $stmtCustomer->bindParam(':address1', $address1);
            $stmtCustomer->bindParam(':address2', $address2);
            $stmtCustomer->bindParam(':city', $city);
            $stmtCustomer->bindParam(':state', $state);
            $stmtCustomer->bindParam(':zip', $zip);
    
            // Execute the customers table insertion query
            $stmtCustomer->execute();
    
            // // Get the customer ID from the last inserted row
            // $customerID = $this->conn->lastInsertId();
    
            // // Insert into the customer_password table
            // $queryPass = "INSERT INTO customer_password (customerID, hashedPass) VALUES (:customerID, :hashedPassword)";
            // $stmtPass = $this->conn->prepare($queryPass);
            return true;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    public function insertCustomerCreditInfo($creditCardNumber, $securityCode, $cardZip, $expirationDate) {
        try {
            // Insert into the customer_credit_info table
            $queryCreditInfo = "INSERT INTO customer_credit_info (credit_card_number, security_code, card_zip, expiration_date) VALUES (:creditCardNumber, :securityCode, :cardZip, :expirationDate)";
            $stmtCreditInfo = $this->conn->prepare($queryCreditInfo);
    
            // Bind parameters for the customer_credit_info table query
            $stmtCreditInfo->bindParam(':creditCardNumber', $creditCardNumber);
            $stmtCreditInfo->bindParam(':securityCode', $securityCode);
            $stmtCreditInfo->bindParam(':cardZip', $cardZip);
            $stmtCreditInfo->bindParam(':expirationDate', $expirationDate);
    
            // Execute the customer_credit_info table insertion query
            $stmtCreditInfo->execute();
    
            return true;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    

    public function insertCustomerLicense($licenseNumber) {
        try {
            // Hash the provided license number
            $hashedLicenseNumber = hash('sha256', $licenseNumber);
    
            // Insert into the customer_license table
            $queryLicense = "INSERT INTO customer_license (hashed_licenseID) VALUES (:hashedLicenseNumber)";
            $stmtLicense = $this->conn->prepare($queryLicense);
    
            // Bind parameters for the customer_license table query
            $stmtLicense->bindParam(':hashedLicenseNumber', $hashedLicenseNumber);
    
            // Execute the customer_license table insertion query
            $stmtLicense->execute();
    
            return true;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    

    public function insertCustomerPassword($customerID, $hashedPassword) {
        try {
            // Insert into the customer_password table
            $queryPassword = "INSERT INTO customer_password (customerID, hashedPass) VALUES (:customerID, :hashedPassword)";
            $stmtPassword = $this->conn->prepare($queryPassword);
    
            // Bind parameters for the customer_password table query
            $stmtPassword->bindParam(':customerID', $customerID);
            $stmtPassword->bindParam(':hashedPassword', $hashedPassword);
    
            // Execute the customer_password table insertion query
            $stmtPassword->execute();
    
            return true;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    

    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Login
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////


    public function loginUser($username, $password) {
        // Check if the user is suspended
        if ($this->isSuspended($username)) {
            echo "User is suspended. Please contact support.";
        } elseif (!$this->isUserApproved($username)) {
            echo "User is not approved. Please wait for approval.";
        } else {
            // Check if the user is an employee
            if ($this->isEmployee($username)) {
                // Log in as an employee
                echo "Logged in as an employee.";
            } elseif ($this->isCustomer($username)) {
                // Check if the user is a customer
                // Log in as a customer
                echo "Logged in as a customer.";
            } else {
                // User not found or other conditions
                echo "Invalid username or password.";
            }
        }
    }
    
    
    // Check if the user is suspended
    public function isSuspended($userID) {
        // Perform database query to check if the user is suspended
        // Return true if suspended, false otherwise

        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM suspended_users WHERE userID = ?");
            $stmt->bindParam(1, $userID, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
    
            $count = $stmt->fetchColumn();
    
            // If count is equal to 0, the email is not in use
            return $count === 0;
    
        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            // For example, you can log the error and return false
            error_log("User is suspended: " . $e->getMessage());
            return false;
        }

    }
    
    // Check if the user is an employee
    public function isEmployee($username) {
        // Check if the role ID corresponds to an employee role
        // Return true if an employee, false otherwise
        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT roleID FROM employees WHERE username = ?");
            $stmt->bindParam(1, $username, PDO::PARAM_STR);
            $stmt->execute();
    
            $roleId = $stmt->fetchColumn();
    
            // Return the role ID
            return true;
        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            error_log("Error getting role ID: " . $e->getMessage());
            return false;
        }
    }
    
    // Check if the user is a customer
    public function isCustomer($username) {
        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT roleID FROM customer WHERE username = ?");
            $stmt->bindParam(1, $username, PDO::PARAM_STR);
            $stmt->execute();
    
            $roleId = $stmt->fetchColumn();
    
            // Return the role ID
            return true;
        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            error_log("Error getting role ID: " . $e->getMessage());
            return false;
        }
    }

    // Check if the user is approved
    public function isUserApproved($username) {
        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT activated FROM customer WHERE username = ?");
            $stmt->bindParam(1, $username, PDO::PARAM_STR);
            $stmt->execute();
    
            $activatedStatus = $stmt->fetchColumn();
    
            // Return true if the user is approved (activated = 1), false otherwise
            return $activatedStatus == 1;

        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            error_log("Error getting user activation status: " . $e->getMessage());
            return false;
        }
    }
    
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  FAQ
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    public function getFAQ() {

        // Get all the FAQ lines from the database

        try {
            $array = array();
            $stmt = $this->conn->query("SELECT faqQuestion, faqAnswer FROM faq");
            $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $array;

        } catch (PDOException $e) {

            // Log or handle the error appropriately
            echo "Error getting FAQ questions: " . $e->getMessage();
            return false;
        }

    }


    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Reserve/Available Cars
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    // Available Cars - A Mapview of Available cars. You can click on one to see more information about. 
    // The function will look at a location and get all the cars associated with that location.

    //Function to get all the cars by location.



    public function getCarsByLocation($sublocationID) {
        //Get all of the cars by the specificed location
        $count = 0;

        try {

            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM cars");
            $stmt->execute();

            $count = $stmt->fetchColumn();
            $carsNotReserved = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $carID = $row['carID'];
    
                if ($this->isReserved($carID)) {
                    echo 'The car with ID ' . $carID . ' is already reserved.';
                } else {
                    array_push($carsNotReserved, $carID);
                }
            }

            return $carsNotReserved;

        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            error_log("Error getting role ID: " . $e->getMessage());
            return false;
        }
    }

    //Function to check if the car is reserved.

    public function isReserved($carID) {
        //Check if the car is reserved.
        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT reserved FROM cars WHERE reserved = 1");
            $stmt->execute();
    
            $carID = $stmt->fetchColumn();
    
            // Return the role ID
            return true;
        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            error_log("Error getting role ID: " . $e->getMessage());
            return false;
        }
    }

    // Reserve Car - Click on the car you want to reserve -> take you to the payment page -> you pay for it -> the car will then be updated as "reserved"
    // You will also have the car in your account as reserved.

    // Function to update the reserved table.

    // update the cars table with the car being reserved -> and that car to the reserved table.

    public function updateCarReserved($carID) {

        // Update the reserved table. 

        // Update username based on the ID
         try {
            $stmt = $this->conn->query("UPDATE cars SET reserved = 1 WHERE carID = $carID");
            $stmt->execute();
            return true;

        } catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    public function updateReserved($carID) {

        // Update the reserved table. 

        // Update username based on the ID

        try {
            $stmt = $this->conn->query("UPDATE cars SET reserved = 1 WHERE carID = $carID");
            $stmt->execute();
            return true;

        } catch(PDOException $e){
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Payment
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////





    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Edit Account
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    
    // Update Customer Username

    public function updateCustomerUsername($customerID, $username){

        // Update customer username based on the ID
        try{

            $stmt = $this->conn->prepare("UPDATE customer SET username = ? WHERE customerID = $customerID");
            $stmt->bindParam(1, $username, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error: " . $e->getMessage();
            return false;

        }

    }

    // Update Customer Password

    public function updateCustomerPassword($customerID, $password){

        // Update customer password based on the ID
        try{

            $hashedPass = hash('sha256', $password); // hashes the password provided
            $stmt = $this->conn->prepare("UPDATE customer_password SET hashedPass = ? WHERE customerID = $customerID");
            $stmt->bindParam(1, $$hashedPass, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error: " . $e->getMessage();
            return false;

        }

    }

    // Update Customer Email

    public function updateCustomerEmail($customerID, $email){

        // Update the customer email based on the customerID
        try{

            $stmt = $this->conn->prepare("UPDATE customer SET email = ? WHERE customerID = $customerID");
            $stmt->bindParam(1, $email, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error: " . $e->getMessage();
            return false;

        }

    }

    // Update Customer Address

    public function updateCustomerAddress($customerID, $address1, $address2, $city, $state, $zip){

        // Update the customer address based on the customerID
        try{

            $stmt = $this->conn->prepare("UPDATE customer SET address1 = ?, address2 = ?, city = ?, state = ?, zip = ? WHERE customerID = $customerID");
            $stmt->bindParam(1, $address1, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->bindParam(2, $address2, PDO::PARAM_STR);
            $stmt->bindParam(3, $city, PDO::PARAM_STR);
            $stmt->bindParam(4, $state, PDO::PARAM_STR);
            $stmt->bindParam(5, $zip, PDO::PARAM_STR);
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error: " . $e->getMessage();
            return false;

        }

    }

    // Update Credit Information

    public function updateCustomerCreditInfo($customerID, $creditNumber, $security, $cardZip, $expirationDate){

        // Hashes the information that is taken in and update the information
        try{

            $hashedCreditNumber = hash('sha256', $creditNumber);
            $hashedSecurity = hash('sha256', $security);
            $hashedCardZip = hash("sha256", $cardZip);
            $hashedExpiration = hash("sha256", $expirationDate);
            $stmt = $this->conn->prepare("UPDATE customer_credit_info SET hashedCreditNumber = ?, hashedSecurity = ?, hashedZipcode = ?, hashedExpiration = ? WHERE customerID = $customerID");
            $stmt->bindParam(1, $hashedCreditNumber, PDO::PARAM_STR);
            $stmt->bindParam(2, $hashedSecurity, PDO::PARAM_STR); 
            $stmt->bindParam(3, $hashedCardZip, PDO::PARAM_STR); 
            $stmt->bindParam(4, $hashedExpiration, PDO::PARAM_STR); 
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error: " . $e->getMessage();
            return false;

        }

    }

    // Update Customer Phone Number

    public function updateCustomerPhone($customerID, $phonenum){

        // Update the customer phone number based on the customerID
        try{

            $stmt = $this->conn->prepare("UPDATE customer SET phonenum = ? WHERE customerID = $customerID");
            $stmt->bindParam(1, $phonenum, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error: " . $e->getMessage();
            return false;

        }

    }

    // Update Employee Username

    public function updateEmployeeUsername($employeeID, $username){

        // Update username based on the ID
        try{

            $stmt = $this->conn->prepare("UPDATE employees SET username = ? WHERE employeeID = $employeeID");
            $stmt->bindParam(1, $username, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error: " . $e->getMessage();
            return false;

        }

    }

    // Update Employee Name

    public function updateEmployeeName($employeeID, $name){

        // Update username based on the ID
        try{

            $stmt = $this->conn->prepare("UPDATE employees SET fullname = ? WHERE employeeID = $employeeID");
            $stmt->bindParam(1, $name, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error: " . $e->getMessage();
            return false;

        }

    }

    // Update Employee Password

    public function updateEmployeePassword($employeeID, $epassword){

        // Update username based on the ID
        try{

            $hashedPass = hash('sha256', $epassword);
            $stmt = $this->conn->query("UPDATE employee_password SET hashedPass = ? WHERE employeeID = $employeeID");
            $stmt->bindParam(1, $$hashedPass, PDO::PARAM_STR); // Use 1 as the parameter placeholder
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error updating the employee password in employees table: " . $e->getMessage();
            return false;

        }

    }


    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Reports
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    //Erich

    public function getAllCustomers() {
        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT fName, lName, phoneNum, address1, city, state, zip FROM customer");
            $stmt->execute();

            // Fetch all results as an associative array
            $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Return the array of customers
            return $customers;

        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            error_log("Error getting all customers: " . $e->getMessage());
            return [];
        }
    }

    





    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Approvals
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////


    //Erich

    function fetchAndDisplayNotApprovedCustomersPDO($conn) {
        $notApprovedCustomers = array();
    
        $query = "SELECT customerID, fName, mInitial, lName, activated FROM customer WHERE activated IS NULL";
    
        try {
            $stmt = $conn->prepare($query);
            $stmt->execute();
    
            $notApprovedCustomers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            // Display not approved customers
            foreach ($notApprovedCustomers as $customer) {
                echo "Customer ID: " . $customer["customerID"] . ", Name: " . $customer["fName"] . " " . $customer["mInitial"] . " " . $customer["lName"] . ", Approval Status: Not Approved\n";
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Customer Service
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////


    //Erich





    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Locate Cars
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    //Jake

    public function getSingleCars($carID){

        try{

            $stmt = $this->conn->query("SELECT carType, battery, status, reserved, sublocationID FROM cars WHERE carID = ?");
            $stmt->bindParam(1, $carID, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);

        }catch(PDOException $e){

            echo "Error getting locations:". $e->getMessage();
            return false;

        }

    }

    public function getCars($sublocationID){

        try{

            $stmt = $this->conn->query("SELECT cars, address, cityName, zip FROM location WHERE sublocationID = ? ");
            $stmt->bindParam(1, $sublocationID, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);

        }catch(PDOException $e){

            echo "Error getting locations:". $e->getMessage();
            return false;

        }

    }


    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Insert/Delete Cars
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    //Insert car into car table

    public function insertCar($carType, $sublocationID){

        try{

            $stmt = $this->conn->prepare("INSERT INTO cars(carType, battery, status, reserved, sublocationID) VALUES (?, 100.00, 'active', 0, ?)");
            $stmt->bindParam(1, $carType, PDO::PARAM_STR);
            $stmt->bindParam(2, $sublocationID, PDO::PARAM_INT);
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error inserting into cars table: " . $e->getMessage();
            return false;

        }

    }


    // Delete a car from the cars table
    public function deleteCar($carID){
    
        try{

            $stmt = $this->conn->prepare("DELETE FROM cars WHERE carID = ?");
            $stmt->bindParam(1, $carID, PDO::PARAM_INT);
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error deleting a car in the cars table: " . $e->getMessage();
            return false;
        
        }

    }



    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Make a Report
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    // Insert into jobs table
    public function insertJobs($employeeID, $carID, $task, $notes){

        try{

            $stmt = $this->conn->prepare("INSERT INTO jobs(employeeID, carID, task, notes, jTime, jDate) VALUES (?, ?, ?, ?, date('h:i:s'), date('Y-m-d'))");
            $stmt->bindParam(1, $employeeID, PDO::PARAM_INT);
            $stmt->bindParam(2, $carID, PDO::PARAM_INT);
            $stmt->bindParam(3, $task, PDO::PARAM_STR);
            $stmt->bindParam(4, $notes, PDO::PARAM_STR);
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error inserting into location table: " . $e->getMessage();
            return false;

        }

    }




    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Insert/Get/Delete Locations
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    // Insert location to the location table

    public function insertLocation($sublocationName, $address, $cityName, $zip){

        try{

            $stmt = $this->conn->prepare("INSERT INTO location(sublocationName, address, cityName, zip) VALUES (?, ?, ?, ?)");
            $stmt->bindParam(1, $sublocationName, PDO::PARAM_STR);
            $stmt->bindParam(2, $address, PDO::PARAM_STR);
            $stmt->bindParam(3, $cityName, PDO::PARAM_STR);
            $stmt->bindParam(4, $zip, PDO::PARAM_STR);
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error inserting into location table: " . $e->getMessage();
            return false;

        }

    }

    // Get locations from the location table

    public function getLocation($sublocationID){

        try{

            $stmt = $this->conn->query("SELECT sublocationName, address, cityName, zip FROM location WHERE sublocationID = ? ");
            $stmt->bindParam(1, $sublocationID, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);

        }catch(PDOException $e){

            echo "Error getting locations:". $e->getMessage();
            return false;

        }

    }

    // Delete Locations from the location table
    public function deleteLocation($sublocationID){
    
        try{

            $stmt = $this->conn->prepare("DELETE FROM location WHERE sublocationID = ?");
            $stmt->bindParam(1, $sublocationID, PDO::PARAM_STR);
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error deleting a location in the location table: " . $e->getMessage();
            return false;
        
        }

    }


    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Insert Employees
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    // Insert employee into the employees table
    public function insertEmployee($roleID, $username, $fullname, $office){

        try{

            $stmt = $this->conn->prepare("INSERT INTO employees(roleID, username, fullname, office) VALUES (?, ?, ?, ?)");
            $stmt->bindParam(1, $roleID, PDO::PARAM_INT);
            $stmt->bindParam(2, $username, PDO::PARAM_STR);
            $stmt->bindParam(3, $fullname, PDO::PARAM_STR);
            $stmt->bindParam(4, $office, PDO::PARAM_STR);
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error inserting into employees table: " . $e->getMessage();
            return false;

        }

    }

    //Method for getting the employees
    public function getEmployees(){

        try{

            $stmt = $this->conn->query("SELECT employeeID, roleID, username, fullname, office FROM employees");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);

        }catch(PDOException $e){

            echo "Error getting employees: " . $e->getMessage();
            return false;

        }

    }

    //Method for deleting a specific employee
    public function deleteEmployee($employeeID){

        try{

            $stmt = $this->conn->prepare("DELETE FROM employees WHERE employeeID = ?");
            $stmt->bindParam(1, $employeeID, PDO::PARAM_INT);
            $stmt->execute();
            return true;

        }catch(PDOException $e){

            echo "Error deleting an employee: " . $e->getMessage();
            return false;

        }

    }

    // Add your database-related functions here

}
?>
