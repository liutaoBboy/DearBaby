<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/2
 * Time: 16:44
 */
$ch = curl_init();
$phone = '18121879707';
$num = '666666';
$str = "【凯信通】您的验证码是".$num."，有效时间5分钟，请不要告诉他人";
$content = urlencode($str);
$url = "http://apis.baidu.com/kingtto_media/106sms/106sms?mobile=$phone&content=$content";
$header = array(
    'apikey: 0059e636eca97e3d32aaf1cf7250539c'
);
// 添加apikey到header
curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// 执行HTTP请求
curl_setopt($ch , CURLOPT_URL , $url);
$res = curl_exec($ch);

//var_dump($res);
echo $res;