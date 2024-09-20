<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "androiddb";
$user_id = $_GET["user_id"]; 

$conn = new mysqli($servername, $username, $password, $dbname);

// Create connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Use prepared statement to prevent SQL Injection
$sql = "DELETE FROM usertbpp WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user_id);

if ($stmt->execute()) {
    echo "Record deleted successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
