<?php

namespace Models;

class Furniture extends Product
{
  protected $sku;
  protected $name;
  protected $price;
  protected $length;
  protected $width;
  protected $height;

  public function __construct(array $data)
  {
    $this->sku = $data['sku'];
    $this->name = $data['name'];
    $this->price = $data['price'];
    $this->length = $data['length'];
    $this->width = $data['width'];
    $this->height = $data['height'];
  }


  public function createProduct(\PDO $pdo)
  {
    try {
      $pdo->beginTransaction();

      $sql = "insert into products (sku, name, price)
                values (:sku, :name, :price)";
      $stmt = $pdo->prepare($sql);
      $stmt->execute(["sku" => $this->sku, "name" => $this->name, "price" => $this->price]);

      $sql2 = "insert into furniture (sku, length, width, height)
                values (:sku, :length, :width, :height)";
      $stmt = $pdo->prepare($sql2);
      $stmt->execute([
        "sku" => $this->sku,
        "length" => $this->length,
        "width" => $this->width,
        "height" => $this->height
      ]);

      $pdo->commit();
    } catch (\PDOException $e) {
      $pdo->rollBack();

      die($e->getMessage());
    }
  }
}