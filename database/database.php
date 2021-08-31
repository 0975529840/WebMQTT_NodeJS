<?php
    $host="localhost";
    $username="root";
    $password="";
    $dtb_name="thietke_mysql";
    $connection=mysqli_connect($host,$username,$password,$dtb_name) or die("Lỗi kết nối");
    mysqli_set_charset($connection,"utf8");
?>