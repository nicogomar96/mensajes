const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const datos = req.body;
    const numero = datos.numero;
    const mensaje = datos.mensaje;
    enviarMensaje(numero, mensaje);
    res.send("Mensaje enviado");
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});


const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

function enviarMensaje(numero, mensaje) {
    numero += '@c.us';
    client.sendMessage(numero, mensaje);
}

client.initialize();