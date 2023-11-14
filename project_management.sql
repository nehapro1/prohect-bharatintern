CREATE DATABASE project_management;
USE project_management;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255),
    task_details VARCHAR(255),
    assigned_to VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
