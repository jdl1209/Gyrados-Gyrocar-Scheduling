<?php
require_once("DB.class.php");
$db = new DB();
include 'db_connection.php';
include 'MyUtils.php';

$myUtils = new MyUtils();
$header = $myUtils->html_header("Admin");

// Process logout
if (isset($_GET['logout'])) {
    // Unset or destroy the session variables
    session_unset();
    // or session_destroy();  // Uncomment this line if you want to destroy the entire session

    // Redirect to the login page
    header("Location: login.php");
    exit();
}

// Process the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $userProvidedPassword = $_POST["password"];

    // Query the database to check if the username exists
    $sql = "SELECT * FROM customer WHERE username = '$username'";
    $result = $conn->query($sql);

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();

        // Check if the 'hashedPass' index is set in the fetched row
        if (isset($row["hashedPass"])) {
            $storedHashedPassword = $row["hashedPass"]; // Assuming "hashedPass" is the name of the column in your database
        } else {
            // Handle the case where 'hashedPass' is not set
            echo "Error: 'hashedPass' not found in the result set.";
            exit;
        }

        // Hash the user-provided password for comparison
        $hashedUserPassword = hash('sha256', $userProvidedPassword);

        // Compare the stored hash with the hash of the user-provided password
        if ($hashedUserPassword === $storedHashedPassword) {
            // Authentication successful
            // Store user data in session variables
            $_SESSION['loggedIn'] = true;
            $_SESSION['username'] = $username;
            
            // Check if the 'role' index is set in the fetched row
            if(isset($row['role'])){
                $_SESSION['userRole'] = $row['role'];
            } else {
                // Handle the case where 'role' is not set
                echo "Error: 'role' not found in the result set.";
                exit;
            }

            // Redirect the user to the appropriate page
            if ($_SESSION['userRole'] === '1') {
                header("Location: admin.php");
            } elseif ($_SESSION['userRole'] === '3') {
                header("Location: events.php");
            } elseif ($_SESSION['userRole'] === '2') {
                header("Location: attendee.php");
            } else {
                echo "Role not recognized"; // Handle any other roles accordingly
            }

            exit;
        } else {
            // Password does not match
            echo "Incorrect password";
        }
    } else {
        // Username not found
        echo "Username not found";
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="assets/styles.css" />
</head>
<body>
    <div class="login">
        <h1>Login to view events</h1>
        <form method="post" action="">
            <p><input type="text" name="username" value="" placeholder="Username or Email"></p>
            <p><input type="password" name="password" value="" placeholder="Password"></p>
            <p class="remember_me"></p>
            <p class="submit"><input type="submit" name="commit" value="Login"></p>
        </form>
        <p>Don't have an account? <a href="register.php">Sign Up</a></p>
    </div>
</body>
</html>
