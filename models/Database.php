<?php

namespace Models;

class Database
{
  public function __construct(
    private $host,
    private $dbname,
    private $user,
    private $password = ""
  ) {
  }

  public function getConnection()
  {
    $dsn = "mysql:host=$this->host;dbname=$this->dbname;charset=UTF8";

    try {
      $pdo = new \PDO($dsn, $this->user, $this->password);
      if ($pdo) {
        return $pdo;
      }
    } catch (\PDOException $e) {
      die($e->getMessage());
    }
  }
}
