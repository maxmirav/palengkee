<?php
/**
 * Returns all grocerific products as JSON
 *
 * @package all.php
 * @author Raf <raffylopez@gmail.com>
 * @version 0.1
 * @copyright Raf <raffylopez@gmail.com>
 * @license MIT
 */

  require("includes.inc");
  $productId = $_REQUEST["id"];
  $query = "SELECT id, description, size, price  from products WHERE id=? LIMIT 1";
  if ($conn->connect_error) {
    die(DB_CONNECT_ERROR_NOTIF);
    }

  $stmt = $conn->prepare($query);
  $stmt->bind_result($id, $description, $size, $price);
  $stmt->bind_param("i", $productId);
  $stmt->execute();
  $stmt->store_result();

  $row = [];
  $acc = [];
  $rowCount = $stmt->num_rows;
  if ($rowCount > 0) {
    while($stmt->fetch()) {
      $row["id"] = $id;
      $row["description"] = $description;
      $row["size"] = $size;
      $row["price"] = $price;
    
      $acc[] = $row;
    }
  }
  $stmt->close();
  $conn->close();
  echo json_encode($acc);

