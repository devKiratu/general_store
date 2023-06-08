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
      case "POST": {
          if (str_contains($_SERVER['REQUEST_URI'], "delete")) {
            $this->delete();
          } else {

            $this->create();
          }
          break;
        }
      default:
        http_response_code(405);
        header("Allow: GET, POST");
    }
  }

  private function delete()
  {
    $data = (array) json_decode(file_get_contents("php://input"));
    foreach ($data['ids'] as $id) {
      $sql = "delete from products where sku = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->execute(["id" => $id]);
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

    $cls = "\Models\\" . $category;
    $r = new \ReflectionClass($cls);

    if ($r->isSubclassOf(new \ReflectionClass("\Models\Product"))) {
      $product = new $cls($data);
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
