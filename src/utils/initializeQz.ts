import qz from 'qz-tray';

const initialize = qz.websocket.connect().then(() => {
    return qz.printers.find("TM-T20X");
}).then(function(found:String) {
    let config = qz.configs.create(found);
    
    let data = [
        {
            type: 'raw', format: 'html', flavor: 'file',
            data: 'path/to/sample.html',
            options: { language: "ESCPOS" } //, "pageWidth": ..., "pageHeight": ... },
         }
    ];
    return qz.print(config, data)

    }).catch(function(e:Error) {
        alert(e)
    })


export default initialize;
