<?php 

// Создали три переменных
// во внутрь переменной $name закладываем $_POST['name']
// - тут написано что мы берём ИНПУТ у которого name = name
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

// Тут мы запускаем PHP скрипт
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output



// Настройки PHP скрипт скрипта
// Этому скрипту предоставляем свою "рабочую почту", дале он залогиниться
// и от неё будет отправлять письма
$mail->isSMTP();                                      // первую строчку оставляем (Set mailer to use SMTP)
$mail->Host = 'smtp.ukr.net';  // устанавливаем smtp сервер того почтового ресурса который мы будем использовать (Specify main and backup SMTP servers)
$mail->SMTPAuth = true;      // говориться что сейчас будем входить на почту при помощи этого аккаунта (Enable SMTP authentication)
$mail->Username = '@ukr.net';                 // Наш логин
$mail->Password = '4tos';                 // Наш пароль (нужен пароль для приложений) от ящика - сделать поиск в гугле "пароль для приложений gmail"
$mail->SMTPSecure = 'ssl';  //ssl защита (Enable TLS encryption, `ssl` also accepted)
$mail->Port = 465;  // Порт искать у smtp сервера (TCP port to connect to)
 


$mail->setFrom('@ukr.net', 'Pulse');   // в первых кавычках ('') - От кого письмо - напичать тоже самое что и в Username (написано выше)
// 'Pulse' - с какого ресурса или кто именно отправляет письмо (или имя или сервис)
$mail->addAddress('@gmail.com');  //   тут указываем куда именно будет приходить отправленное письмо (Add a recipient)
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true); // Указываем что письмо придёт в формате HTML (Set email format to HTML)


// Верстаем висьмо которое будет приходить на почту
$mail->Subject = 'Данные'; // цель или тема нашего письма
// далее используется синтаксис ПШП
$mail->Body    = ' 
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

// Далее нужно для того, чтобы AJAX запрос отработал	
if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>