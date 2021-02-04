<?php

require_once('DB/DB.php');
require_once('User/User.php');
require_once('Todos/Todos.php');

class Application {
    function __construct() {
        $this->user = new User();
        $this->todos = new Todos();
    }

    public function login($params) {
        if ($params['login'] && $params['password']) {
            return $this->user->login($params['login'], $params['password']);
        }
        return ['error'];
    }

    public function logout($params) {
        if ($params['token']) {
            return $this->user->logout($params['token']);
        }
        return ['error'];
    }

    public function getUserByToken($params) {
        if ($params['token']) {
            return $this->user->getUserByToken($params['token']);
        }
        return ['error'];
    }

    public function registration($params) {
        $login = $params['login'];
        $password = $params['password'];
        $password2 = $params['password2'];

        if (strlen($login) < 3 || strlen($login) > 30 ){
            return ['error'];
        }
        elseif ($password != $password2) {
            return ['error2'];
        }
        elseif (strlen($password) < 5) {
            return ['error']; 
        }

        return $this->user->registration($login, $password);
    }

    public function addTodo($params) {
        if ($params['id'] && $params['message'] && $params['about']) {
            return $this->todos->addTodo($params['id'], $params['message'], $params['about']);
        }
        return ['error'];
    }

    public function getAllTodos($params) {
        if ($params['id']) {
            return $this->todos->getAllTodos($params['id']);
        }
        return ['error'];
    }

    public function deleteTodo($params) {
        if ($params['id']) {
            return $this->todos->deleteTodo($params['id']);
        }
        return ['error'];
    }

    public function countTodos($params) {
        if ($params['id']) {
            return $this->todos->countTodos($params['id']);
        }
        return ['error'];
    }

    public function dateLastTodo($params) {
        if ($params['id']) {
            return $this->todos->dateLastTodo($params['id']);
        }
        return ['error'];
    }
}