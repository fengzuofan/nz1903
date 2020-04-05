<?php
include "conn.php";

$pagesize = 5;//单个页面数据数

$sql = "select * from taobaogoods";//获取所有数据
$result = $conn->query($sql); //获取数据的结果集(记录集)

$num = $result->num_rows;

$pagenum = ceil($num/$pagesize);

//获取前端页码查询数据并返回
if(isset($_GET['page'])){
    $pagevalue = $_GET['page'];
}else{
    $pagevalue = 1;
}
$page = ($pagevalue-1)*$pagesize;

$sql1 = "select * from taobaogoods limit $page,$pagesize";
$res = $conn->query($sql1);

//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}

echo json_encode($arr);//输出接口