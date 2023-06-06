<?php

namespace Models;

abstract class Product
{
  protected $sku;
  protected $name;
  protected $price;

  abstract public function createProduct(\PDO $pdo);

  public static function getAll(\PDO $pdo)
  {
    $sql = "select p.sku, p.name, p.price, p.product_type, b.weight, dvd.size, f.length, f.width, f.height
            from products as p
            left join books as b
            on p.sku = b.sku
            left join dvd
            on p.sku = dvd.sku
            left join furniture as f
            on f.sku = p.sku
            order by p.sku";

    $stmt = $pdo->query($sql);

    $data = $stmt->fetchAll();

    return $data;

    //TODO fetch inidvidual products, aggregate results and return to avoid null columns and unrelated entries
  }
}
