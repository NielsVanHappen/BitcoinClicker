<?php
if (isset($_POST["signup"])) {
    $username = $_POST["uid"];
    $email = $_POST["email"];
    $pwd = $_POST["pwd"];
    $pwdRepeat = $_POST["pwdrepeat"];
    
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    if (invalidUid($username) !== false) {
        header("location: ../#signup/?invaliduid");
        exit();
    }
    if (invalidEmail($email) !== false) {
        header("location: ../#signup/?invalidemail");
        exit();
    }
    if (pwdMatch($pwd, $pwdRepeat) !== false) {
        header("location: ../#signup/?diffpwds");
        exit();
    }
    if (uidExists($conn, $username, $email) !== false) {
        header("location: ../#signup/?usernametaken");
        exit();
    }

    createUser($conn, $username, $email, $pwd);
}
else {
    header("location: ../#signup");
}