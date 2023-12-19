import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'qrcode-terminal';
import pkg2 from 'whatsapp-web.js';

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


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});

const client = new pkg2.Client({
    authStrategy: new pkg2.LocalAuth()
});


client.on('qr', qr => {
    pkg.generate(qr, { small: true });
});

// @ts-ignore
function enviarMensaje(numero, mensaje) {
    numero += '@c.us';
    client.sendMessage(numero, mensaje);
}

client.initialize();
