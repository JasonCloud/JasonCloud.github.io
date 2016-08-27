<?php
	require 'confing.php';
	
	$_birthday = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
	
	$query = "INSERT INTO blog_used (user, pass, quest, ans, mesg, birthday, ps) 
												VALUES ('{$_POST['user']}', sha1('{$_POST['pass']}'), '{$_POST['quest']}', '{$_POST['ans']}', '{$_POST['mesg']}', '{$_birthday}', '{$_POST['ps']}')";

	mysql_query($query) or die('新增失败！'.mysql_error());

	echo mysql_affected_rows();
	
	mysql_close();
?>