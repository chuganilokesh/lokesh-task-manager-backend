

//const sendgridAPIkey='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'
const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:"chuganilokesh@gmail.com",
        subject:"Welcome to the App",
        text:`Welcome to the App,${name}. Let me know how you get along with the app.`
    })
}
const sendCancellationEmail=(email,name)=>{
 sgMail.send({
     to:email,
     from:"chuganilokesh@gmail.com",
     subject:"sorry to see you go!",
     text:`Goodbye, ${name}. I hope to see you back sometime soon`
 
 })
}
module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}