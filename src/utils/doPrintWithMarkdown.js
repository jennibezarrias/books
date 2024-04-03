import receiptline from 'receiptline';

export default function printMarkdown(markdown) {
    
    let command
    if (markdown) {
       const command = receiptline.transform(markdown, {
            cpl: 42,
            encoding: 'multilingual',
            spacing: false,
            command: 'escpos',
            upsideDown: false,
            gamma: 1.8
        })
        console.log(command)
    }
    
}