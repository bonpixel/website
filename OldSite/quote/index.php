<?php require("quote_metadata.php"); ?>
<?php require("../header.php"); ?>
<!-- About/Contact -->

					<div id="actualcontent" class="center">
					<form method="POST" action="http://www.bonpixel.com/php/verify.php">
								<p>Please feel free to fill in any pertinent information about the project. If you have any specific ideas already, please leave more detailed comments at the bottom to tell Me a little of what you had in mind...</p>
								
								Name (First, Last): <input type="text" name="name" /><br />
								E-mail: <input type="text" name="email" /><br /><br />
								Comment:<br /> <textarea name="message" rows="20" cols="40"></textarea><br />
								
								Are you human?
								<?php 
									require_once('../php/recaptchalib.php');
									$publickey = "6LcCSb0SAAAAAEPIUOyfjDHnbwu_hKM2cayj477_"; // you got this from the signup page
									echo recaptcha_get_html($publickey); 
								?>
								
								<input type="submit" value="Submit" name="submit"/><input type="reset" value="Reset"><br /><br /><br />
							</form>
					</div>
				
<?php require("../footer.php"); ?>
