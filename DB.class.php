<?php

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
