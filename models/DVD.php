<?php

namespace Models;

class DVD extends Product
{
  protected $sku;
  protected $name;
  protected $price;
  protected $size;

  public function __construct(array $data)
  {
    $this->sku = $data['sku'];
    $this->name = $data['name'];
    $this->price = $data['price'];
    $this->size = $data['size'];
  }

  public function createProduct(\PDO $pdo)
  {
    try {
      $pdo->beginTransaction();

      $sql = "insert into products (sku, name, price)
              values (:sku, :name, :price)";
      $stmt = $pdo->prepare($sql);
      $stmt->execute(["sku" => $this->sku, "name" => $this->name, "price" => $this->price]);

      $sql2 = "insert into dvd (sku, size)
              values (:sku, :size)";
      $stmt = $pdo->prepare($sql2);
      $stmt->execute(["sku" => $this->sku, "size" => $this->size]);

      $pdo->commit();
    } catch (\PDOException $e) {
      $pdo->rollBack();

      die($e->getMessage());
    }
  }
}
