<?php
include "conn.php";

if(isset($_POST['username'])){
    $user = $_POST['username'];
    $result = $conn->query("select * from registry1903 where username='$user");
    if($result->fetch_assoc()){//存在
        echo true;
    }else{
        echo false;//空
    }
}