import qz from 'qz-tray';

export default function printMarkdown(markdown) {
    let qrCode = markdown.slice(markdown.indexOf('qr_code:'));
    markdown = markdown.replace(qrCode, '');
    qrCode = qrCode.replace('qr_code:data:image/png;base64,', '');

    let logo = markdown.slice(0, markdown.indexOf('/endlogo'));
    markdown = markdown.replace(logo, '').replace('/endlogo', '');
    logo = logo.replace('data:image/jpeg;base64,', '');

    const receipt = Receipt.from(markdown, '-p generic -c 42');
    receipt.toText().then(data => {
        qz.websocket.connect().then(function(){
            return qz.printers.find('TM-T20X')
        }).then(function(printer){
            let config = qz.configs.create(printer)
            qz.print(config, [{
                type: 'raw',
                format: 'image',
                flavor: 'base64',
                data: logo,
                options: {language: 'ESCPOS', dotDensity: 'double'}
            }, {
                type: 'raw',
                format: 'command',
                options: {'language': 'ESCPOS'},
                data:  '\x1B' + '\x40' + 
                       data            
                }, {
                type: 'raw',
                format: 'image',
                flavor: 'base64',
                data: qrCode +     
                      '\x1B' + '\x69' + // cut paper
                      '\x1B' + '\x40'
                ,
                options: {language: 'ESCPOS', dotDensity: 'double'}
            }]);
        })    
    });
}