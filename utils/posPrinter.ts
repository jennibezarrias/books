import { ipcMain } from 'electron';
import {PosPrinter, PosPrintOptions, PosPrintData} from 'electron-pos-printer';
ipcMain.on('print-pos', printPos);

function printPos() {

const options: PosPrintOptions = {
    preview: false,
    margin: '0 0 0 0',
    copies: 1,
    printerName: 'XP-80C',
    timeOutPerLine: 400,
    pageSize: '80mm'
}

const data: PosPrintData[] = [
    {
        type: 'image',
        url: 'https://randomuser.me/api/portraits/men/43.jpg',     // file path
        position: 'center',                                  // position of image: 'left' | 'center' | 'right'
        width: '160px',                                           // width of image in px; default: auto
        height: '60px',                                          // width of image in px; default: 50 or '50px'
    },{
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: 'SAMPLE HEADING',
        style: {fontWeight: "700", textAlign: 'center', fontSize: "24px"}
    },{
        type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
        value: 'Secondary text',
        style: {textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red"}
    },{
        type: 'barCode',
        value: '023456789010',
        height: 40,                     // height of barcode, applicable only to bar and QR codes
        width: 2,                       // width of barcode, applicable only to bar and QR codes
        displayValue: true,             // Display value below barcode
        fontsize: 12,
    },{
        type: 'qrCode',
        value: 'https://github.com/Hubertformin/electron-pos-printer',
        height: 55,
        width: 55,
        style: { margin: '10 20px 20 20px' }
    },{
        type: 'table',
        // style the table
        style: {border: '1px solid #ddd'},
        // list of the columns to be rendered in the table header
        tableHeader: ['Animal', 'Age'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            ['Cat', 2],
            ['Dog', 4],
            ['Horse', 12],
            ['Pig', 4],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: ['Animal', 'Age'],
        // custom style for the table header
        tableHeaderStyle: { backgroundColor: '#000', color: 'white'},
        // custom style for the table body
        tableBodyStyle: {'border': '0.5px solid #ddd'},
        // custom style for the table footer
        tableFooterStyle: {backgroundColor: '#000', color: 'white'},
    }
]

    PosPrinter.print(data, options)
        .then(console.log)
        .catch((err: Error) => {
            console.error(err)
        })
}
