<?php

if (isset($_POST["login"])) {
    $username = $_POST["uid"];
    $pwd = $_POST["pwd"];

    include_once 'dbh.inc.php';
    include_once 'functions.inc.php';

    loginUser($conn, $username, $pwd);
}
else {
    header("location: ../#login");
}