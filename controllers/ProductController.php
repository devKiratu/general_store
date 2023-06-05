<?php

namespace Controllers;

class ProductController
{
  public function __construct(private \PDO $pdo)
  {
  }

  public function processRequest($method)
  {
    switch ($method) {
      case "GET":
        $this->get();
        break;
      case "POST":
        $this->create();
        break;
      case "DELETE":
        $this->delete();
        break;
    }
  }

  private function delete()
  {
    $data = (array) json_decode(file_get_contents("php://input"));
    foreach ($data['ids'] as $id) {
      var_dump($id);
    }
  }

  private function get()
  {
    $data = \Models\Product::getAll($this->pdo);
    echo json_encode($data);
  }

  private function create()
  {
    $data = (array) json_decode(file_get_contents("php://input"));
    $category = ucfirst($data['productType']);

    $r = new \ReflectionClass($category);

    if ($r->isSubclassOf(new \ReflectionClass("Product"))) {
      $product = new $category($data);
      $product->createProduct($this->pdo);
      http_response_code(201);
      echo json_encode([
        "message" => "Created successfully"
      ]);
    } else {
      http_response_code(422);
      echo json_encode([
        "message" => "Unrecognized product type",
      ]);
      exit;
    }
  }
}