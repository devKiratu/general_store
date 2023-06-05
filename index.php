<?php
require_once('utils.php');
spl_autoload_register('load_class');
header("Content-type: application/json; charset=UTF-8");

$database = new \Models\Database("localhost", "demo-app", "root");
$pdo = $database->getConnection();
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

$controller = new Controllers\ProductController($pdo);

$controller->processRequest($_SERVER['REQUEST_METHOD']);
