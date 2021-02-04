<?php


class Todos {
    function __construct() {
        $this->db = new DB();
    }

    public function addTodo($id, $message, $about) {
        return $this->db->addTodo($id, $message, $about);
    }

    public function getAllTodos($id) {
        return $this->db->selectAllTodosByUserId($id);
    }

    public function deleteTodo($todoId) {
        return $this->db->deleteTodoById($todoId);
    }

    public function countTodos($id) {
        return $this->db->countTodosByUserId($id);
    }

    public function dateLastTodo($id) {
        return $this->db->getDateLastTodo($id);
    }

}