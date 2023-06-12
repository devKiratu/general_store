<?php
require_once('utils.php');
spl_autoload_register('load_class');
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");

$url_parts = explode("/", $_SERVER['REQUEST_URI']);

if ($url_parts[1] != "products") {
  http_response_code(404);
  exit;
}

$host = "localhost";
$dbname = "demo-app";
$user = "root";
$password = "";

$database = new \Models\Database($host, $dbname, $user, $password);
$pdo = $database->getConnection();
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

$controller = new Controllers\ProductController($pdo);

$controller->processRequest($_SERVER['REQUEST_METHOD']);
