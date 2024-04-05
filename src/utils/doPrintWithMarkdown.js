import qz from 'qz-tray';

export default function printMarkdown(markdown) {
    if (markdown) {
        markdown = `^^^Flo's Clothes
        Apr 3, 2024
        ^Sales Invoice
        SINV-3638
        ---
        To
        Maxwell
        
        From
        Flo's Clothes
        1st Column, Fitzgerald Bridge, Pune, Maharashtra, India, 411001
        GSTIN: 27LIN180000A1Z5
        
        ---
        HSN/SAC | Item | Qty | Rate ₹ | Amount ₹ 
        640520 | Jade Slipers | 1.00 |  2,999.00 | 2,999.00
        ---
        Subtotal | ₹ 2,999.00  
        CGST | ₹ 269.91  
        SGST | ₹ 269.91   
        Grand Total | ₹ 3,538.82

        ^Zatca
        `;
        debugger;
        const receipt = Receipt.from(markdown, '-p escpos -c 42');
        receipt.toText().then(data => {
            console.log(data)
            qz.websocket.connect().then(function(){
                return qz.printers.find('TM-T20X')
            }).then(function(printer){
                let config = qz.configs.create(printer)
                qz.print(config, [{
                    type: 'raw',
                    format: 'command',
                    flavor: 'plain',
                    data: ['r2 testando']
                }]);
            })    
        });
    }
}