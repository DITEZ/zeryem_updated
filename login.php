<?php
// connect to the database
$conn = mysqli_connect("localhost", "root", "root", "zeryam1");

// check if the form has been submitted
if (isset($_POST['submit'])) {
	// get the form data
	$username = $_POST['username'];
	$password = $_POST['password'];

	// check if the username and password are correct
	$sql = "SELECT * FROM customer WHERE username='$username' AND password='$password'";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) == 1) {
		// set session variables
		$_SESSION['username'] = $username;
		$_SESSION['loggedin'] = true;

		// redirect to the home page
		header("Location: home.php");
		exit();
	} else {
		// display an error message
		echo "Incorrect username or password.";
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Login Form</title>
	<link rel="stylesheet" type="text/css" href="mcss/login.css">
</head>
<body>
	<div class="form-wrapper">
		<h2>Login Form</h2>
		<form method="post" action="login.php">
			<label>Username:</label>
			<input type="text" name="username" required><br><br>
			<label>Password:</label>
			<input type="password" name="password" required><br><br>
			<input type="submit" name="submit" value="Login">
            <div class="signup-link">
			Don't have an account? <a href="register.php">Sign up</a>
		</div>
		</form>
	</div>
</body>
</html>
