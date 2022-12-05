"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
//conexion db
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});
const GetRecetas = (req, res) => {
    let listaRecetas = new Array();
    pool.query(`SELECT r.id_receta, r.nombre, convert_from(decode((encode(r.imagen::bytea, 'base64')),'base64'),'UTF8') as imagen, 
      r.valoracion, r.porcion, r.valor, r.tiempo, d.dificultad, tr.tipo_receta, r.calorias, r.descripcion, r.url 
      FROM recetas r 
      JOIN tipos_receta tr on r.tipo_receta = tr.id_tipo_receta 
      JOIN dificultades d on r.dificultad = d.id_dificultad`, (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        for (let row of respuesta.rows) {
            listaRecetas.push(row);
        }
        res.send(JSON.stringify({ "items": listaRecetas }));
    });
};
const GetReceta = (req, res) => {
    let url = req.params.url;
    let receta;
    pool.query(`SELECT r.id_receta, r.nombre, convert_from(decode((encode(r.imagen::bytea, 'base64')),'base64'),'UTF8') as imagen, 
                  r.valoracion, po.porcion, r.valor,r.tiempo, d.dificultad, tr.tipo_receta, r.calorias , r.descripcion,r.url 
                  FROM recetas r 
                  JOIN tipos_receta tr on r.tipo_receta = tr.id_tipo_receta 
                  JOIN porciones po on r.porcion = po.id_porcion
                  JOIN dificultades d on r.dificultad = d.id_dificultad
                  WHERE url = '${url}'`, (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        for (let row of respuesta.rows) {
            receta = respuesta = row;
        }
        res.send(JSON.stringify({ "item": receta }));
    });
};
const GetPasosReceta = (req, res) => {
    let id = req.params.id;
    let pasos = new Array;
    pool.query(`SELECT * FROM pasos_recetas WHERE id_receta = ${id}`, (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        for (let row of respuesta.rows) {
            pasos.push(row);
        }
        res.send(JSON.stringify({ "items": pasos }));
    });
};
const GetTiposReceta = (req, res) => {
    let tipos = new Array;
    pool.query(`SELECT * FROM tipos_receta`, (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        else {
            for (let row of respuesta.rows) {
                tipos.push(row);
            }
            res.send(JSON.stringify({ "items": tipos }));
        }
    });
};
const GetDificultades = (req, res) => {
    let dificultades = new Array();
    pool.query(`SELECT * FROM dificultades`, (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        for (let row of respuesta.rows) {
            dificultades.push(row);
        }
        res.send(JSON.stringify({ "items": dificultades }));
    });
};
const GetPorciones = (req, res) => {
    let porciones = new Array();
    pool.query(`SELECT * FROM porciones`, (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        for (let row of respuesta.rows) {
            porciones.push(row);
        }
        res.send(JSON.stringify({ "items": porciones }));
    });
};
const InsertReceta = (req, res) => {
    console.log(req.body);
    pool.query(`INSERT INTO recetas (nombre,imagen,valoracion,porcion,valor,tiempo,dificultad,tipo_receta,calorias,descripcion,url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`, [req.body.nombre, req.body.imagen, req.body.valoracion, req.body.porcion, req.body.valor, req.body.tiempo, req.body.dificultad, req.body.tipo_receta, req.body.calorias, req.body.descripcion, req.body.url], (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        else {
            console.log(respuesta.rows[0].id_receta);
            res.send(JSON.stringify({ "status": "ok", "item": respuesta.rows[0].id_receta }));
        }
    });
};
const DeleteReceta = (req, res) => {
    let id = req.params.id;
    pool.query(`DELETE FROM recetas WHERE id_receta = ${id} RETURNING *`, (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        else {
            console.log(respuesta.rows[0].id_receta);
            res.send(JSON.stringify({ "status": "deleted", "item": respuesta.rows[0].id_receta }));
        }
    });
};
const PutReceta = (req, res) => {
    let id = req.params.id;
    pool.query(`UPDATE recetas SET nombre=$1, imagen=$2, valoracion=$3, porcion=$4, valor=$5,tiempo=$6, dificultad=$7, 
  tipo_receta=$8, calorias=$9, descripcion=$10, url=$11 WHERE id_receta = ${id} RETURNING *`, [req.body.nombre, req.body.imagen, req.body.valoracion, req.body.porcion, req.body.valor, req.body.tiempo, req.body.dificultad, req.body.tipo_receta, req.body.calorias, req.body.descripcion, req.body.url], (error, respuesta) => {
        if (error) {
            console.log(error);
            return;
        }
        else {
            console.log(respuesta.rows[0].id_receta);
            res.send(JSON.stringify({ "status": "updated", "item": respuesta.rows[0].id_receta }));
        }
    });
};
const InsertUsuario = (req, res) => {
    console.log(req.body);
    pool.query(`INSERT INTO usuarios(email,pass) VALUES($1,PGP_SYM_ENCRYPT ($2,'AES_KEY')) RETURNING *`, [req.body.email, req.body.pass], (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        else {
            console.log(respuesta.rows[0].id_usuario);
            res.send(JSON.stringify({ "status": "registered", "usuario": respuesta.rows[0].id_usuario }));
        }
    });
};
const Login = (req, res) => {
    console.log(req.body);
    pool.query(`SELECT id_usuario FROM usuarios WHERE email = $1 and PGP_SYM_DECRYPT( pass::bytea,'AES_KEY') = $2`, [req.body.email, req.body.pass], (error, respuesta) => {
        if (error) {
            console.error(error);
            return;
        }
        else {
            console.log(respuesta.rows[0].id_usuario);
            res.send(JSON.stringify({ "status": "loged", "usuario": respuesta.rows[0].id_usuario }));
        }
    });
};
module.exports = {
    GetDificultades,
    GetRecetas,
    GetReceta,
    GetPasosReceta,
    GetTiposReceta,
    GetPorciones,
    InsertReceta,
    DeleteReceta,
    PutReceta,
    InsertUsuario,
    Login
};
