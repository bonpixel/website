<?php
	require_once('recaptchalib.php');
	$privatekey = "6LcCSb0SAAAAAGmejECMjNNG38RfNKzcBeigS3H8";
	$resp = recaptcha_check_answer ($privatekey,
								$_SERVER["REMOTE_ADDR"],
								$_POST["recaptcha_challenge_field"],
								$_POST["recaptcha_response_field"]);
//echo "<pre>";
//print_r($resp);
//print_r($_POST);
//echo "</pre>";
	if (!$resp->is_valid) {
		// What happens when the CAPTCHA was entered incorrectly
		die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." . "(reCAPTCHA said: " . $resp->error . ")");
	}
	else {
    	if(isset($_POST['submit'])) { 

    $to = "nicholsbryan@gmail.com"; 
    $subject =  "Bonpixel Request"; 
	
    $name_field = $_POST['name']; 
    $email_field = $_POST['email']; 
	$website_field = $_POST['website'];
	$budget_field = $_POST['budget'];
	$timeframe_field = $_POST['timeframe'];
    $message =  $_POST['message'];
	
	$headers = 'From: '."$name_field <$email_field>" . "\r\n" ;
	$date = date ("l, F jS, Y"); 
	$time = date ("h:i A"); 
  
    $body = "From: $name_field\n 
			E-Mail: $email_field\n 
			Website: $website_field\n
			Budget: $budget_field\n
			Timeframe: $timeframe_field\n
			Message:\n  $message"; 
	
	$msg = "Below is the result of your feedback form. It was submitted on $date at $time.\n\n"; 
	
    foreach ($_POST as $key => $value) { 
		if( ucfirst ($key) == 'Recaptcha_challenge_field' || ucfirst ($key) == 'Recaptcha_response_field' || ucfirst ($key) == 'Submit')
		{
			break;
		}
		else
		{
			$msg .= ucfirst ($key) ." : ". $value . "\n";
		}
    }
	
  
    if(mail($to, $subject, $msg, $headers)){
         // If the mail was sent, then redirect
         header("Location:http://www.bonpixel.com/contact");  
    }else{
       // Else display a message
       echo 'An error occured while sending your message. Try again later';
    } 

} else { 

    //Display Form here

} 
  }
?>
