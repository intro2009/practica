<?php

class DB {
    function __construct() {
        $host = "todolist";
        $user = "root";
        $pass = "root";
        $name = "todolist";
        try {
            $this->db = new PDO('mysql:host='.$host.';dbname='.$name, $user, $pass);
        } catch (PDOException $e) {
            print "Ошибка!: " . $e->getMessage();
            die();
        }
    }

    function __destruct() {
        $this->db = null;
    }


    public function updateToken($id, $token) {
        $stmt = $this->db->prepare("UPDATE users SET token = '$token' WHERE id = '$id'");
        $stmt->execute();
        return $stmt->execute();
    }

    public function registrationUser($login, $password, $token) {
        $stmt =  $this->db->prepare("INSERT INTO `users` (`login`, `password`, `token`) 
            VALUES ('$login', '$password', '$token')");
        return $stmt->execute();
    }

    public function getUserByLogin($login) {
        $stmt = $this->db->prepare("SELECT * FROM `users` WHERE `login` = '$login'");
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByToken($token) {
        $stmt = $this->db->prepare("SELECT * FROM `users` WHERE token='$token'");
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function addTodo($id, $message, $about) {
        $messageDate = date('Y-m-j H:i:s');
        $stmt = $this->db->prepare("INSERT INTO `todos` (`about`, `message`, `messageDate`, `userId`) 
            VALUES ('$about', '$message', '$messageDate', '$id')");
        if ($stmt->execute()) {
            $stmt = $this->db->prepare("SELECT * FROM `todos` WHERE `messageDate`='$messageDate'");
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        return false;
    }
    
    public function selectAllTodosByUserId($id) {
        $stmt = $this->db->prepare("SELECT * FROM `todos` WHERE `userId`= '$id'");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteTodoById($todoId) {
        $stmt = $this->db->prepare("DELETE FROM `todos` WHERE `id`='$todoId'");
        return $stmt->execute();
    }

    public function countTodosByUserId($id) {
        $stmt = $this->db->prepare("SELECT COUNT(*) AS `count` FROM `todos` WHERE `userId`='$id'");
        if ($stmt->execute()) {
            return $stmt->fetch(PDO::FETCH_ASSOC)['count'];
        }
        return false;
    }

    public function getDateLastTodo($id) {
        $stmt = $this->db->prepare("SELECT MAX(`messageDate`) AS lastTodos FROM  `todos` WHERE `userId`='$id'");
        if ($stmt->execute()) {
            return $stmt->fetch(PDO::FETCH_ASSOC)['lastTodos'];
        }
        return false;
    }
}