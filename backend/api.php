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

function getRole($roleID){

    $sql = "SELECT rName FROM roles WHERE roleID = '$roleID'";
    $result = $conn->query("$sql");

    return $result;

}

function getRoleDescription($roleID){

    $sql = "SELECT description FROM roles WHERE roleID = '$roleID'";
    $result = $conn->query("$sql");

    return $result;

}

function getfName($customerID){

    $sql = "SELECT fName FROM customer WHERE customerID = '$customerID'";
    $result = $conn->query("$sql");

    return $result;

}

function getmIntitial($customerID){

    $sql = "SELECT mInitial FROM customer WHERE customerID = '$customerID'";
    $result = $conn->query("$sql");

    return $result;

}

function getlName($customerID){

    

}
?>