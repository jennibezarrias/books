import qz from 'qz-tray';

const initialize = qz.websocket.connect().then(function() {
    let myPrinter = "TM-T20X";
    let config = qz.configs.create(myPrinter);
    let data = [
        'Teste\n',
        'Isso é muito legal\n',
        'Eu sou muito retardado :v'
    ]
    console.log(data)
    //qz.print(config, data);
})

export default initialize;

