<?php
  require_once('recaptchalib.php');
  $privatekey = "your_private_key";
  $resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);

  if (!$resp->is_valid) {
    // What happens when the CAPTCHA was entered incorrectly
    die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." .
         "(reCAPTCHA said: " . $resp->error . ")");
  } else {
    if(isset($_POST['submit'])) { 
	
	$to = "bonpixel@gmail.com"; 
    $subject =  "Bonpixel Request"; 
    $name_field = $_POST['name']; 
    $email_field = $_POST['email']; 
    $message =  $_POST['message'];
	$headers = 'From: '."$name_field <$email_field>" . "\r\n" ;
	$date = date ("l, F jS, Y"); 
	$time = date ("h:i A"); 
	
	
	
	
    $body = "From: $name_field\n E-Mail: $email_field\n Message:\n  $message"; 
	
	$msg = "Below is the result of your feedback form. It was submitted on $date at $time.\n\n"; 
	
    foreach ($_POST as $key => $value) { 
        $msg .= ucfirst ($key) ." : ". $value . "\n"; 
    }
	
  
    if(mail($to, $subject, $msg, $headers)){
         // If the mail was sent, then redirect
         header("Location:  http://www.bonpixel.com");  
    }else{
       // Else display a message
       echo 'An error occured while sending your message. Try again later';
    } 

} else { 

    //Display Form here

} 
  }
?>
