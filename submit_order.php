<?php
//-- POST are variables from details.js
$names    = $_POST['names'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$cat    = $_POST['cat'];
 
//-- clean up the javascript array
$titels = str_replace('"','',substr(substr(stripslashes($_POST['titels']),1),0,-1));
$titels = explode(",\n", $titels);
 
//-- Where the order will be sent
$to = "em_b_@hotmail.com";
$subject = "Bestelling Free Record Shop";
$message = "Een bestelling werd geplaatst door: <br/>";
$message .= $names."<br/>";
$message .= $address1 . "<br/>";
$message .= $address2 . "<br/><br/>";
$message .= $cat . "<br/>";
 
$message .= "<ul>";
if (strlen($titels[0]) == 1)
{
    $message .= "<li>Lege bestelling</li>";
}
else
{
    for ($i = 0; $i < count($titels); $i++)
    {
        $message .= "<li>" . $titels[$i] . "</li>";
    }
}
$message .= "</ul>";
 
//-- The headers will let us send HTML code as an email
$headers = "From: noreply@freerecordshop.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
 
//-- if mail gets sent, return true, else return false. This gets handed off the our onload method in details.js
if (mail($to,$subject,$message,$headers))
{
    $response = array('mail' => true);
}
else
{
    $response = array('mail' => false);
}
 
echo json_encode($response);
?>