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
    	
		$_POST["mailit.php"];
	}
?>
