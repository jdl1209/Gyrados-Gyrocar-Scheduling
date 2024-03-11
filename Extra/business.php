<?php
// Include your DB class file if not already included
// require_once 'path/to/your/DB.php';

// Create an instance of your DB class
require_once("DB.class.php");
$db = new DB();
include 'db_connection.php';
include 'MyUtils.php';

// Assuming $db is an instance of your DB class
$customers = $db->getAllUsersByRole(0);
$employees = $db->getAllUsersByRole(1);
$mechanics = $db->getAllUsersByRole(2);
$managers = $db->getAllUsersByRole(3);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Admin Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 50px;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px;
        }
        .tabs {
            display: flex;
            justify-content: center;
            background-color: #3498db;
            padding: 10px;
            margin-bottom: 20px;
        }
        .tab {
            margin: 0 15px;
            padding: 8px 15px;
            background-color: #555;
            color: #fff;
            cursor: pointer;
            border: none;
            border-radius: 5px;
        }
        .tab:hover {
            background-color: #777;
        }
        .tab.active {
            background-color: #3498db;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
            margin-top: 20px;
        }
        .user-lists {
            display: flex;
            justify-content: space-between;
        }
        .user-list {
            text-align: left;
            margin: 20px;
            padding: 20px;
            width: 22%;
            border-radius: 10px;
        }
        .user-list ul {
            list-style: none;
            padding: 0;
        }
        .user-list li {
            cursor: pointer;
            margin-bottom: 10px;
            color: #3498db;
        }
        #customersList {
            background-color: #f2f2f2;
        }
        #employeesList {
            background-color: #e6f7ff;
        }
        #mechanicsList {
            background-color: #ffebcc;
        }
        #managersList {
            background-color: #d9ffb3;
        }
        h1 {
            color: #3498db;
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
        }
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
        }
        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
        .logout-btn {
            position: fixed;
            top: 10px;
            right: 20px;
            padding: 8px 15px;
            background-color: #e74c3c;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <header>
        <h1>Business Admin Page</h1>
    </header>

    <div class="tabs">
        <button class="tab" onclick="openTab('users')">Users</button>
        <button class="tab" onclick="openTab('reports')">Reports</button>
        <button class="tab" onclick="openTab('reservations')">Reservations</button>
        <button class="tab" onclick="openTab('home')">Home</button>
        <button class="tab" onclick="openTab('logout')">Logout</button>
    </div>
    
    <div id="usersTab" class="tab-content">
        <h2>Users Tab</h2>
        <button onclick="createUser()">Create User</button>
        <button onclick="deleteUser()">Delete User</button>
        <button onclick="editUser()">Edit User</button>

        <div id="createUserForm" style="display:none;">
            <!-- Add a form for creating a user -->
            <h3>Create a User</h3>
            <form action="create_user.php" method="post">
                <!-- Add form fields for user creation -->
                <!-- Example: -->
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <br>
                <button type="submit">Create User</button>
            </form>
        </div>

        <div class="user-lists">
            <div class="user-list" id="customersList">
                <h3>Customers</h3>
                <ul>
                    <li onclick="showUserInfo('Customer 1')">Customer 1</li>
                    <li onclick="showUserInfo('Customer 2')">Customer 2</li>
                    <!-- Add more customer items as needed -->
                </ul>
            </div>

            <div class="user-list" id="employeesList">
                <h3>Employees</h3>
                <ul>
                    <li onclick="showUserInfo('Employee 1')">Employee 1</li>
                    <li onclick="showUserInfo('Employee 2')">Employee 2</li>
                    <!-- Add more employee items as needed -->
                </ul>
            </div>

            <div class="user-list" id="mechanicsList">
                <h3>Mechanics</h3>
                <ul>
                    <li onclick="showUserInfo('Mechanic 1')">Mechanic 1</li>
                    <li onclick="showUserInfo('Mechanic 2')">Mechanic 2</li>
                    <!-- Add more mechanic items as needed -->
                </ul>
            </div>

            <div class="user-list" id="managersList">
                <h3>Managers</h3>
                <ul>
                    <li onclick="showUserInfo('Manager 1')">Manager 1</li>
                    <li onclick="showUserInfo('Manager 2')">Manager 2</li>
                    <!-- Add more manager items as needed -->
                </ul>
            </div>
        </div>

    </div>

    <div id="usersTab" class="tab-content">
        <h2>Users Tab</h2>
        <button onclick="createUser()">Create User</button>
        <button onclick="deleteUser()">Delete User</button>
        <button onclick="editUser()">Edit User</button>

        <div id="createUserForm" style="display:none;">
            <!-- ... (your existing create user form) ... -->
        </div>

        <div class="user-lists">
            <div class="user-list" id="customersList">
                <h3>Customers</h3>
                <ul>
                    <?php foreach ($customers as $customer): ?>
                        <li onclick="showUserInfo('<?php echo $customer['name']; ?>')"><?php echo $customer['name']; ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="user-list" id="employeesList">
                <h3>Employees</h3>
                <ul>
                    <?php foreach ($employees as $employee): ?>
                        <li onclick="showUserInfo('<?php echo $employee['name']; ?>')"><?php echo $employee['name']; ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="user-list" id="mechanicsList">
                <h3>Mechanics</h3>
                <ul>
                    <?php foreach ($mechanics as $mechanic): ?>
                        <li onclick="showUserInfo('<?php echo $mechanic['name']; ?>')"><?php echo $mechanic['name']; ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="user-list" id="managersList">
                <h3>Managers</h3>
                <ul>
                    <?php foreach ($managers as $manager): ?>
                        <li onclick="showUserInfo('<?php echo $manager['name']; ?>')"><?php echo $manager['name']; ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal" id="userModal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">×</span>
            <h2>User Information</h2>
            <p id="userInfo"></p>
        </div>
    </div>

    <button class="logout-btn" onclick="location.href='login.php'">Logout</button>

    <footer>
        <p>&copy; <?php echo date('Y'); ?> My PHP Homepage</p>
    </footer>

    <script>
        function openTab(tabName) {
            // Hide all tab content
            var tabs = document.getElementsByClassName('tab-content');
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }

            // Show the selected tab content
            document.getElementById(tabName + 'Tab').classList.add('active');

            // Remove 'active' class from all tabs
            var tabButtons = document.getElementsByClassName('tab');
            for (var i = 0; i < tabButtons.length; i++) {
                tabButtons[i].classList.remove('active');
            }

            // Add 'active' class to the clicked tab
            event.currentTarget.classList.add('active');
        }

        function createUser() {
            // Hide other forms
            hideForms();
            // Show the create user form
            document.getElementById('createUserForm').style.display = 'block';
        }

        // Add similar functions for delete and edit users

        function hideForms() {
            // Hide all user-related forms
            var userForms = document.getElementsByClassName('user-form');
            for (var i = 0; i < userForms.length; i++) {
                userForms[i].style.display = 'none';
            }
        }

        function showUserInfo(userName) {
            // Display modal with user information
            document.getElementById('userInfo').textContent = 'User: ' + userName;
            document.getElementById('userModal').style.display = 'block';
        }

        function closeModal() {
            // Close the modal
            document.getElementById('userModal').style.display = 'none';
        }
    </script>
</body>
</html>
