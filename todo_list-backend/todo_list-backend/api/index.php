<?php
header('Access-Control-Allow-Origin: *');
error_reporting(1);

require_once('application/Application.php');


function router($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case 'registration': return $app->registration($params);
            case 'login': return $app->login($params);
            case 'logout': return $app->logout($params);
            case 'getuserbytoken': return $app->getUserByToken($params);
            case 'addtodo': return $app->addTodo($params);
            case 'getalltodos': return $app->getAllTodos($params);
            case 'deletetodo': return $app->deleteTodo($params);
            case 'counttodos': return $app->countTodos($params);
            case 'datelasttodo': return $app->dateLastTodo($params);
        }
    }
}

function answer($data){
    if(gettype($data) == 'array'){
        if($data[0]=='error') {
            return array('result'=>'error', 'data'=>'error');
        } elseif ($data[0] == 'error2') {
            return array('result'=>'error', 'data'=>'error2');
        } elseif ($data[0] == 'error3') {
            return array('result'=>'error', 'data'=>'error3');
        }
        return array('result'=>'ok', 'data'=>$data);
    }
    else if(!$data){
        return array('result'=>'error');
    }
    return array('result'=>'ok', 'data'=>$data);
}


if ($_POST) {
    echo json_encode(answer(router($_POST)));
} 
else if ($_GET) {
    echo json_encode(answer(router($_GET)));
}