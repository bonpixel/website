<?PHP 
$to = "nicholsbryan@gmail.com";
$subject = "Bonpixel request for info";
$headers = "From: Bonpixel Guest";
$forward = 1;
$location = "http://www.bonpixel.com";
$name_field = $_POST['name']; 
$email_field = $_POST['email']; 
$message = $_POST['message']; 

$date = date ("l, F jS, Y"); 
$time = date ("h:i A"); 

$msg = "Below is the result of your feedback form. It was submitted on $date at $time.\n\n"; 
$body = "From: $name_field\n E-Mail: $email_field\n Message:\n $message"; 

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    foreach ($_POST as $key => $value) { 
        $msg .= ucfirst ($key) ." : ". $value . "\n"; 
    }
}
else {
    foreach ($_GET as $key => $value) { 
        $msg .= ucfirst ($key) ." : ". $value . "\n"; 
    }
}

mail($to, $subject, $msg, $headers); 
if ($forward == 1) { 
    header ("Location:$location"); 
} 
else { 
    echo "Thank you for submitting our form. We will get back to you as soon as possible.";
	header ("Location:$location"); 
} 

?>
