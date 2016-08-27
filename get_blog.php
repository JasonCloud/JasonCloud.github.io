<?php
require 'confing.php';
$query =mysql_query("SELECT title,content,date FROM blog_blog ORDER BY date DESC ") or die('SQL数据错误！');
while(!!$row=mysql_fetch_array($query,MYSQL_ASSOC)){
	$json .=json_encode($row).',';
}

echo '['.substr($json,0,strlen($json)-1).']';
mysql_close();
?>