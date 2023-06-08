<?php

namespace Models;

class DVD extends Product
{
  protected $sku;
  protected $name;
  protected $price;
  protected $product_type;
  protected $size;

  public function __construct(array $data)
  {
    $this->sku = $data['sku'];
    $this->name = $data['name'];
    $this->price = $data['price'];
    $this->product_type = $data['productType'];
    $this->size = $data['size'];
  }

  public function createProduct(\PDO $pdo)
  {
    try {
      $pdo->beginTransaction();

      $sql = "insert into products (sku, name, price, product_type)
              values (:sku, :name, :price, :product_type)";
      $stmt = $pdo->prepare($sql);
      $stmt->execute(["sku" => $this->sku, "name" => $this->name, "price" => $this->price, "product_type" => $this->product_type]);

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

  public static function fetchData(\PDO $pdo)
  {
    $sql = "select p.sku, p.name, p.price, p.product_type, dvd.size
            from products as p
            left join dvd
            on p.sku = dvd.sku
            where p.product_type = 'DVD'
            order by p.sku";

    $stmt = $pdo->query($sql);

    $data = $stmt->fetchAll();

    return $data;
  }
}
