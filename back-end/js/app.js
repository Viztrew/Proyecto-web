"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const dataBase = require('./dbConection');
require('dotenv').config();
let configuracion = {
    hostname: process.env.SV_HOST,
    port: process.env.SV_PORT,
};
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.get('/recetas', dataBase.GetRecetas);
app.get('/receta/:url', dataBase.GetReceta);
app.get('/pasos-receta/:id', dataBase.GetPasosReceta);
app.get('/tipos-receta/', dataBase.GetTiposReceta);
app.get('/dificultades', dataBase.GetDificultades);
app.get('/porciones', dataBase.GetPorciones);
app.post('/insertar-receta', bodyParser.json(), dataBase.InsertReceta);
app.delete('/eliminar-receta/:id', dataBase.DeleteReceta);
app.put('/actualizar-receta/:id', bodyParser.json(), dataBase.PutReceta);
app.post('/registrar-usuario', bodyParser.json(), dataBase.InsertUsuario);
app.post('/login', bodyParser.json(), dataBase.Login);
app.listen(configuracion, () => {
    console.log(`El servidor se está ejecutando en http://${configuracion.hostname}:${configuracion.port}`);
});
