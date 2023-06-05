<?php
require_once('utils.php');
spl_autoload_register('load_class');

$database = new \Models\Database("localhost", "demo-app", "root");
$pdo = $database->getConnection();
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
