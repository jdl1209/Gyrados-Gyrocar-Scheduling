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
            $dsn = "mysql:host=localhost;dbname=eds5997";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            $this->conn = new PDO($dsn, 'eds5997', 'Records7^muraenidae', $options);
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
    public function isSuspended($username) {
        // Perform database query to check if the user is suspended
        // Return true if suspended, false otherwise
    }
    
    // Check if the user is an employee
    public function isEmployee($username) {
        // Call getRoleId to get the role ID
        $roleId = $this->getRoleId($username);
    
        // Check if the role ID corresponds to an employee role
        // Return true if an employee, false otherwise
    }
    
    // Check if the user is a customer
    public function isCustomer($username) {
        // Call getRoleId to get the role ID
        $roleId = $this->getRoleId($username);
    
        // Check if the role ID corresponds to a customer role
        // Return true if a customer, false otherwise
    }
    
    // Get roleId
    public function getRoleId($username) {
        try {
            // Use prepared statement to prevent SQL injection
            $stmt = $this->conn->prepare("SELECT roleID FROM users WHERE username = ?");
            $stmt->bindParam(1, $username, PDO::PARAM_STR);
            $stmt->execute();
    
            $roleId = $stmt->fetchColumn();
    
            // Return the role ID
            return $roleId;
        } catch (PDOException $e) {
            // Handle the exception, log or display an error message
            error_log("Error getting role ID: " . $e->getMessage());
            return null;
        }
    }
    


    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  FAQ/Email
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////










    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Reserve/Available Cars
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////









    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Payment
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////









    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Edit Account
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

    public function editAccount($userID, $fName, $mInitial, $lName, $suffix, $phoneNum, $email, $address1, $address2, $city, $state, $zip, $password, $creditCardNumber, $securityCode, $cardZip, $expirationDate) {
        // Check if the user exists
        if ($this->userExists($userID)) {
            // Update user information
            if ($this->updateUserInfo($userID, $fName, $mInitial, $lName, $suffix, $phoneNum, $email, $address1, $address2, $city, $state, $zip)) {
                // Check if the user has credit card information
                if ($this->hasCreditCardInfo($userID)) {
                    // Update existing credit card information
                    if ($this->updateCreditCardInfo($userID, $creditCardNumber, $securityCode, $cardZip, $expirationDate)) {
                        echo "Account updated successfully!";
                    } else {
                        echo "Error updating credit card information.";
                    }
                } else {
                    // Insert new credit card information
                    if ($this->insertCreditCardInfo($userID, $creditCardNumber, $securityCode, $cardZip, $expirationDate)) {
                        echo "Account updated successfully!";
                    } else {
                        echo "Error inserting credit card information.";
                    }
                }
    
                // Check if the password is provided and update password
                if (!empty($password)) {
                    if ($this->updatePassword($userID, $password)) {
                        echo "Password updated successfully!";
                    } else {
                        echo "Error updating password.";
                    }
                }
            } else {
                echo "Error updating user information.";
            }
        } else {
            echo "User not found.";
        }
    }
    
    // Check if the user exists
    public function userExists($userID) {
        // Perform database query to check if the user with the given ID exists
        // Return true if user exists, false otherwise
    }
    
    // Update user information
    public function updateUserInfo($userID, $fName, $mInitial, $lName, $suffix, $phoneNum, $email, $address1, $address2, $city, $state, $zip) {
        // Perform database update to modify user information
        // Return true if update successful, false otherwise
    }
    
    // Check if the user has credit card information
    public function hasCreditCardInfo($userID) {
        // Perform database query to check if the user has credit card information
        // Return true if credit card information exists, false otherwise
    }
    
    // Update existing credit card information
    public function updateCreditCardInfo($userID, $creditCardNumber, $securityCode, $cardZip, $expirationDate) {
        // Perform database update to modify credit card information
        // Return true if update successful, false otherwise
    }
    
    // Insert new credit card information
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
    
    // Update password
    public function updatePassword($userID, $password) {
        // Hash the new password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
        // Perform database update to modify user password
        // Return true if update successful, false otherwise
    }
    







    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Reports
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////








    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Approvals
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////








    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Customer Service
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////








    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Locate Cars
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////








    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Add Cars
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////








    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Make a Report
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////







    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Add Locations
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////








    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////
    //                                  Add Employees
    //////  //////  //////  //////  //////  //////  //////  //////  //////  //////


    // Add your database-related functions here

    public function getUserByName($username) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM customer WHERE username = ?");
            $stmt->execute([$username]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Log or handle the error appropriately
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    public function addUser($fName, $mInitial, $lName, $suffix, $phoneNum, $username, $email, $address1, $address2, $city, $state, $zip, $roleID, $password) {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
        try {
            // Begin a transaction
            $this->conn->beginTransaction();
    
            // Insert into the customer table
            $query = "INSERT INTO customer (fName, mInitial, lName, suffix, phoneNum, username, email, address1, address2, city, state, zip, roleID) VALUES (:fName, :mInitial, :lName, :suffix, :phoneNum, :username, :email, :address1, :address2, :city, :state, :zip, :roleID)";
            $stmt = $this->conn->prepare($query);
    
            // Bind parameters
            $stmt->bindParam(':fName', $fName);
            $stmt->bindParam(':mInitial', $mInitial);
            $stmt->bindParam(':lName', $lName);
            $stmt->bindParam(':suffix', $suffix);
            $stmt->bindParam(':phoneNum', $phoneNum);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':address1', $address1);
            $stmt->bindParam(':address2', $address2);
            $stmt->bindParam(':city', $city);
            $stmt->bindParam(':state', $state);
            $stmt->bindParam(':zip', $zip);
            $stmt->bindParam(':roleID', $roleID);
    
            // Execute the query
            if (!$stmt->execute()) {
                throw new Exception("Error inserting into the customer table.");
            }
    
            // Fetch the customerID immediately after insertion
            $customerID = $this->conn->lastInsertId('customerID');
    
            if (!$customerID) {
                throw new Exception("Error retrieving last inserted customerID.");
            }
    
            // Insert the password using a separate method
            if ($this->insertPassword($customerID, $hashedPassword)) {
                // Commit the transaction
                $this->conn->commit();
                return true;
            } else {
                throw new Exception("Error inserting into the customer_password table.");
            }
        } catch (Exception $e) {
            // An error occurred, rollback the transaction
            $this->conn->rollBack();
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    
    private function insertPassword($customerID, $hashedPassword) {
        try {
            // Insert into the customer_password table
            $queryPass = "INSERT INTO customer_password (customerID, hashedPass) VALUES (:customerID, :hashedPassword)";
            $stmtPass = $this->conn->prepare($queryPass);
    
            // Bind parameters for the password query
            $stmtPass->bindParam(':customerID', $customerID);
            $stmtPass->bindParam(':hashedPassword', $hashedPassword);
    
            // Execute the password insertion query
            return $stmtPass->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    

    // Add other methods for interacting with the database as needed

    // Example function to fetch all roles
    public function getAllRoles() {
        try {
            $stmt = $this->conn->query("SELECT * FROM roles");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Log or handle the error appropriately
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}
?>
