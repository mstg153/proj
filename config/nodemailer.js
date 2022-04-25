const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port : 587,
    secure: 'false',
    auth:{
        user: '510518076.aadharsh@students.iiests.ac.in',
        pass : 'hari-hari'
    }
});

let renderTemplate = (data, relative) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relative),
        data,
        function(err,template){
            if(err){
                console.log("err in sending mail(rendering template)");
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}