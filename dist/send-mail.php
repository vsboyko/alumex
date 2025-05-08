<?php
  header('Content-Type: application/json');

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $to = "boyko1396@gmail.com";
      $subject = isset($_POST['subject_form']) ? htmlspecialchars($_POST['subject_form']) : "Форма cайт";
      $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : "";
      $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : "";

      $message = "
          <html>
          <head><title>$subject</title></head>
          <body>
              <p><strong>Имя:</strong> $name</p>
              <p><strong>Телефон:</strong> $phone</p>
          </body></html>";

      $headers = "MIME-Version: 1.0\r\n";
      $headers .= "Content-type:text/html;charset=UTF-8\r\n";

      if (mail($to, $subject, $message, $headers)) {
          echo json_encode(['success' => true]);
      } else {
          echo json_encode(['success' => false]);
      }
  } else {
      echo json_encode(['success' => false]);
  }
?>