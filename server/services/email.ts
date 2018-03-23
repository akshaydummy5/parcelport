import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as _ from 'lodash';

export default class EMAIL {

    /**
     * Send email notification using gmail account
     * @param {string} type
     * @param {object} notifyObj
     * */
    fnSendEmail = (type, notifyObj) => {

        let template = '';
        template += '<h1>Parcel Port</h1>';
        template += '<p>Your package ' + type + ' code is <strong>' + notifyObj.code + '</strong></p><br>';
        template += '<h2>Package Detail</h2>';
        template += '<hr>';
        _.forEach(notifyObj.packages, (item, index) => {
            template += '<h3>#' + (index + 1) + ' Package</h3>';
            template += '<strong>Status: </strong>' + item.status + '<br>';
            template += '<strong>Label: </strong>' + item.label + '<br>';
            template += '<strong>Size: </strong>' + item.size + '<br><br>';
        });

        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: 'wo.dev01@gmail.com',
                pass: 'wo@dev2017'
            },
            tls: {
                rejectUnauthorized: false
            }
        }));

        const mailOptions = {
            from: '"Parcel Port" <wo.dev01@gmail.com>',
            to: notifyObj.email,
            subject: 'Parcel Port',
            html: template
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    };
}

