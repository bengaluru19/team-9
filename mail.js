<html>
<head>
<script>
mailto()
{
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prsnprkh555@gmail.com',
    pass: 'narutouzumaki555'
  }
});

var mailOptions = {
  from: 'prsnprkh555@gmail.com',
  to: 'ritukm99@gmaik.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
</script>
</head>
<body>
<form action="" name="myForm" onsubmit="mailto();">
Enter babes : <input type="text" name="yup">
<input type="submit" name="submit">
</form> 
</body>
</html>