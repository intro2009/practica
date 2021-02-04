<?php


class User {
    function __construct() {
        $this->db = new DB();
        $this->secret = "qpalzm10";
    }

    public function login($login, $password) {
        $user = $this->db->getUserByLogin($login); 
        if ($user) {
            if (md5($login . $password . $this->secret) === $user['password']) {
                $rand = rand(0, 100000);
                $token = md5($user['password'] . $rand);
                $this->db->updateToken($user['id'], $token);
                return $token;
            }
            return ['error3'];
        }
        return ['error3'];
    }

    public function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user['id'], null);
            return true;
        }
        return ['error'];
    }

    public function registration($login, $password) {
        if ($this->db->getUserByLogin($login)) {
            return ['error'];
        }  
        $password = md5($login . $password . $this->secret);
        return $this->db->registrationUser($login, $password, null);
    }

    public function getUserByToken($token) {
        return $this->db->getUserByToken($token);
    }

}