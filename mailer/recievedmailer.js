const nodemailer = require('../config/nodemailer');


exports.received = (user)=>{
    // console.log("in recieved mailer" ,exp);
    nodemailer.transporter.sendMail({
        from:'510518083.sai@students.iiests.ac.in   ',
        to: user.email,
        subject: "We have recieved your Experience",
        html:'<h1>We have recieved your Article !!</h1>',
    },(err,info)=>{
        if(err){
            console.log("err in reciever mailer");
            return;
        }
        console.log('email Sent',info);
        return;
    })
}