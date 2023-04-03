<?php
// connect to the database
$conn = mysqli_connect("localhost", "root", "root", "zeryam1");

// check if the form has been submitted
if (isset($_POST['submit'])) {
	// get the form data
	$username = $_POST['username'];
	$email = $_POST['email'];
	$password = $_POST['password'];

	// insert the user into the database
	$sql = "INSERT INTO customer (username, email,password ) VALUES ('$username', '$email', '$password')";
	mysqli_query($conn, $sql);

	// redirect to the login page
	header("Location: login.php");
	exit();
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Registration Form</title>
	<link rel="stylesheet" type="text/css" href="mcss/register.css">
</head>
<body>
	<div class="form-wrapper">
		<h2>Registration Form</h2>
		<form method="post" action="register.php">
			<label>Username:</label>
			<input type="text" name="username" required><br><br>
			<label>Email:</label>
			<input type="email" name="email" required><br><br>
			<label>Password:</label>
			<input type="password" name="password" required><br><br>
			<input type="submit" name="submit" value="Register">
		</form>
	</div>
</body>
</html>
