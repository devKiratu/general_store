<?php

namespace Models;

class Book extends Product
{
  protected $sku;
  protected $name;
  protected $price;
  protected $product_type;
  protected $weight;

  public function __construct(array $data)
  {
    $this->sku = $data["sku"];
    $this->name = $data["name"];
    $this->price = $data["price"];
    $this->product_type = $data["productType"];
    $this->weight = $data["weight"];
  }

  public function createProduct(\PDO $pdo)
  {
    try {
      $pdo->beginTransaction();

      $sql = "insert into products (sku, name, price, product_type) values (:sku, :name, :price, :product_type)";
      $stmt = $pdo->prepare($sql);
      $stmt->execute(["sku" => $this->sku, "name" => $this->name, "price" => $this->price, "product_type" => $this->product_type]);

      $sql2 = "insert into books (sku, weight) values (:sku, :weight)";
      $stmt2 = $pdo->prepare($sql2);
      $stmt2->execute(["sku" => $this->sku, "weight" => $this->weight]);

      $pdo->commit();
    } catch (\PDOException $e) {
      $pdo->rollBack();

      die($e->getMessage());
    }
  }

  public static function fetchData(\PDO $pdo)
  {
    $sql = "select p.sku, p.name, p.price, p.product_type, b.weight
            from products as p
            left join books as b
            on p.sku = b.sku
            where p.product_type = 'book'
            order by p.sku";

    $stmt = $pdo->query($sql);

    $data = $stmt->fetchAll();

    return $data;
  }
}
