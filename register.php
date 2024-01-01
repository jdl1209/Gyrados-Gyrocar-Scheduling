<?php
require_once("DB.class.php");
$db = new DB();
include 'db_connection.php';
include 'MyUtils.php';

$myUtils = new MyUtils();
$header = $myUtils->html_header("Register");

// Process the registration form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $role = $_POST["role"]; // Added role input

    // Additional fields
    $fName = isset($_POST["fName"]) ? $_POST["fName"] : "";
    $mInitial = isset($_POST["mInitial"]) ? $_POST["mInitial"] : "";
    $lName = isset($_POST["lName"]) ? $_POST["lName"] : "";
    $suffix = isset($_POST["suffix"]) ? $_POST["suffix"] : "";
    $phoneNum = isset($_POST["phoneNum"]) ? $_POST["phoneNum"] : "";
    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $address1 = isset($_POST["address1"]) ? $_POST["address1"] : "";
    $address2 = isset($_POST["address2"]) ? $_POST["address2"] : "";
    $city = isset($_POST["city"]) ? $_POST["city"] : "";
    $state = isset($_POST["state"]) ? $_POST["state"] : "";
    $zip = isset($_POST["zip"]) ? $_POST["zip"] : "";

    // Validate input data (you can add more specific validation as needed)
    if (empty($username) || empty($password) || empty($role) || empty($fName) || empty($lName) || empty($phoneNum) || empty($email) || empty($address1) || empty($city) || empty($state) || empty($zip)) {
        echo "Please fill out all required fields.";
    } else {
        // Check if the username is already taken
        $existingUser = $db->getUserByName($username);
        if ($existingUser) {
            echo "Username already taken. Please choose a different one.";
        } else {
            // Insert the new user into the database
            $success = $db->addUser($fName, $mInitial, $lName, $suffix, $phoneNum, $username, $email, $address1, $address2, $city, $state, $zip, $role, $password);

            if ($success) {
                // Redirect to the login page after successful registration
                header("Location: login.php");
                exit();
            } else {
                echo "Error occurred during registration.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="assets/styles.css" />
    <title>Login</title>
</head>
<body>
    <div class="login">
        <h1>Register an account</h1>
        <form method="post" action="">
            <p><input type="text" name="username" value="" placeholder="Username or Email"></p>
            <p><input type="password" name="password" value="" placeholder="Password"></p>
            
            <!-- Additional fields -->
            <p><input type="text" name="fName" value="" placeholder="First Name"></p>
            <p><input type="text" name="mInitial" value="" placeholder="Middle Initial"></p>
            <p><input type="text" name="lName" value="" placeholder="Last Name"></p>
            <p><input type="text" name="suffix" value="" placeholder="Suffix"></p>
            <p><input type="text" name="phoneNum" value="" placeholder="Phone Number"></p>
            <p><input type="text" name="email" value="" placeholder="Email"></p>
            <p><input type="text" name="address1" value="" placeholder="Address Line 1"></p>
            <p><input type="text" name="address2" value="" placeholder="Address Line 2"></p>
            <p><input type="text" name="city" value="" placeholder="City"></p>
            <p><input type="text" name="state" value="" placeholder="State"></p>
            <p><input type="text" name="zip" value="" placeholder="ZIP Code"></p>
            
            <p>
                <select name="role">
                    <option value="" selected>Select a Role</option>
                    <option value="1">Admin</option>
                    <option value="2">Attendee</option>
                    <option value="3">Event Manager</option>
                </select>
            </p>
            <p class="submit"><input type="submit" name="commit" value="Register"></p>
        </form>
        <p>Already have an account? <a href="login.php">Log In</a></p>
    </div>
</body>
</html>
