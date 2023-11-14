<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Handle task assignment
    $projectName = $_POST["projectName"];
    $taskDetails = $_POST["taskDetails"];
    $assignedTo = $_POST["assignedTo"];

    $sql = "INSERT INTO tasks (project_name, task_details, assigned_to) VALUES ('$projectName', '$taskDetails', '$assignedTo')";
    if ($conn->query($sql) === TRUE) {
        echo "Task assigned successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Handle fetching tasks
    $sql = "SELECT * FROM tasks";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $tasks = array();
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }
        echo json_encode($tasks);
    } else {
        echo "No tasks found";
    }
}

$conn->close();
?>
