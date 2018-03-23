import * as _ from 'lodash';

// Twilio Credentials
const accountSid = 'AC3d3d8a7c32635ea699c3bad8025064bc';
const authToken = '6976ce889cd8a207fd1463df194183b7';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

export default class SMS {

    /**
     * Send sms notification using Twilio account
     * @param {string} type
     * @param {object} notifyObj
     * */
    fnSendSMS(type, notifyObj) {
        let sms = '';
        sms += 'Parcel Port\n';
        sms += 'Your package ' + type + ' code is ' + notifyObj.code + '\n\n';
        sms += 'Package Detail\n';
        _.forEach(notifyObj.packages, (item, index) => {
            sms += '#' + (index + 1) + ' Package\n';
            sms += 'Status: ' + item.status + '\n';
            sms += 'Label: ' + item.label + '\n';
            sms += 'Size: ' + item.size + '\n';
        });

        client.messages.create({
            body: sms,
            to: notifyObj.phone,
            from: '+16475591649'
        }).then((message) => {
            // console.log('SMS MESSAGE ----> ', message)
        }).catch((e) => {
            // console.error('Twilio SMS ERROR ----------> ', e.code, e.message)
        });
    }
}

