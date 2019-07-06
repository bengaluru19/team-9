<script src="https://smtpjs.com/v3/smtp.js">
</script>

Email.send({
    SecureToken : "8f673b42-6ee9-4718-80df-69bc2c15ee83",
    To : 'volunteer@gmail.com',
    From : "confirm@careworks.com",
    Subject : "This is the subject",
    Body : "And this is the body"
}).then(
  message => alert(message)
);
