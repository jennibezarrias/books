import qz from 'qz-tray';

export default function printMarkdown(markdown) {
    if (markdown) {
        debugger;
        const receipt = Receipt.from(markdown, '-p epson -c 42');
        const command = receipt.toCommand().then(data => {
            console.log(data)
            qz.websocket.connect().then(function(){
                return qz.printers.find('TM-T20X')
            }).then(function(printer){
                let config = qz.configs.create(printer)
                qz.print(config, [data]);
            })
        });
    }
}