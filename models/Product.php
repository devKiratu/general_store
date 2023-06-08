<?php

namespace Models;

abstract class Product
{
  protected $sku;
  protected $name;
  protected $price;
  protected $product_type;

  abstract public function createProduct(\PDO $pdo);
  abstract public static function fetchData(\PDO $pdo);

  public static function getAll(\PDO $pdo)
  {
    $books = Book::fetchData($pdo);
    $furniture = Furniture::fetchData($pdo);
    $dvds = DVD::fetchData($pdo);

    $data = array_merge($books, $furniture, $dvds);

    //order merged data by sku
    usort($data, fn ($a, $b) => $a->sku > $b->sku);

    return $data;
  }
}
