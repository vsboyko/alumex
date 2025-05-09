<?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = "boyko1396@gmail.com";
    $subject = "Заявка КВИЗ";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: no-reply@yourdomain.com" . "\r\n";

    $message = "<html><body>";
    $message .= "<h2>Заявка КВИЗ</h2>";

    foreach ($_POST as $key => $value) {
      if (is_array($value)) {
        $value = implode(", ", $value);
      } else {
        $value = htmlspecialchars(trim($value));
      }
      $message .= "<p><strong>" . ucfirst($key) . ":</strong> " . $value . "</p>";
    }

    $message .= "</body></html>";

    if (mail($to, $subject, $message, $headers)) {
      echo json_encode(["status" => "success", "message" => "Форма отправлена!"]);
    } else {
      echo json_encode(["status" => "error", "message" => "Ошибка отравки!"]);
    }
  }
?>
