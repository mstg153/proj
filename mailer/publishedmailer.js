const nodemailer = require('../config/nodemailer');
const User = require('../models/user');


exports.published = (exp_id,usr)=>{
    console.log("in recieved mailer" ,usr);
    let htmlString = nodemailer.renderTemplate({exp_id:exp_id,user:usr},'/publish.ejs');

    nodemailer.transporter.sendMail({
        from:'510518083.sai@students.iiests.ac.in   ',
        to: usr,
        subject: "Your Interview Experience Got Published over CareerBuddy",
        html:htmlString,
    },(err,info)=>{
        if(err){
            console.log("err in Publisher mailer",err);
            return;
        }
        console.log('email Sent');
        return;
    })
}