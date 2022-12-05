import { dificultades, recetas, pasos, tipos,porciones } from "./dataTypes";
require('dotenv').config();

//conexion db
const Pool=require('pg').Pool;
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

const GetRecetas = (req:any, res:any) =>{
  
    let listaRecetas=new Array<recetas>();
    
    pool.query(`SELECT r.id_receta, r.nombre, convert_from(decode((encode(r.imagen::bytea, 'base64')),'base64'),'UTF8') as imagen, 
      r.valoracion, r.porcion, r.valor, r.tiempo, d.dificultad, tr.tipo_receta, r.calorias, r.descripcion, r.url 
      FROM recetas r 
      JOIN tipos_receta tr on r.tipo_receta = tr.id_tipo_receta 
      JOIN dificultades d on r.dificultad = d.id_dificultad`, (error:any, respuesta:any) => {
        if (error){
          console.error(error);
          return;
        }
        for (let row of respuesta.rows){
          listaRecetas.push(row);
        }
        res.send(JSON.stringify({"items":listaRecetas}))
      })
  }

const GetReceta = (req:any, res:any) =>{
  
    let url = req.params.url
    let receta:recetas;
    
      pool.query(`SELECT r.id_receta, r.nombre, convert_from(decode((encode(r.imagen::bytea, 'base64')),'base64'),'UTF8') as imagen, 
                  r.valoracion, po.porcion, r.valor,r.tiempo, d.dificultad, tr.tipo_receta, r.calorias , r.descripcion,r.url 
                  FROM recetas r 
                  JOIN tipos_receta tr on r.tipo_receta = tr.id_tipo_receta 
                  JOIN porciones po on r.porcion = po.id_porcion
                  JOIN dificultades d on r.dificultad = d.id_dificultad
                  WHERE url = '${url}'`, (error:any, respuesta:any) => {
        if (error){
          console.error(error);
          return;
        }
        for (let row of respuesta.rows){
          receta = respuesta=row;
        }
        res.send(JSON.stringify({"item":receta}))
      })
  }

const GetPasosReceta = (req:any, res:any) =>{
  
    let id:number = req.params.id
    let pasos = new Array<pasos>;
    
    pool.query(`SELECT * FROM pasos_recetas WHERE id_receta = ${id}`, (error:any, respuesta:any) => {
        if (error){
          console.error(error);
          return;
        }
        for (let row of respuesta.rows){
          pasos.push(row)
        }
        res.send(JSON.stringify({"items":pasos}))
      })
  }

const GetTiposReceta = (req:any, res:any)=>{
    let tipos = new Array<tipos>;
  
    pool.query(`SELECT * FROM tipos_receta`, (error:any, respuesta:any) => {
      if (error){
        console.error(error);
        return;
      }else{
        for (let row of respuesta.rows){
            tipos.push(row)
          }
          res.send(JSON.stringify({"items":tipos}))
      }
      
    })
  
}
const GetDificultades = (req:any, res:any) =>{
  
  let dificultades=new Array<dificultades>();
  pool.query(`SELECT * FROM dificultades`, (error:any, respuesta:any) => {
      if (error){
        console.error(error);
        return;
      }
      for (let row of respuesta.rows){
        dificultades.push(row);
      }
      res.send(JSON.stringify({"items":dificultades}))
    })
}
const GetPorciones = (req:any, res:any) =>{
  
  let porciones=new Array<porciones>();
  pool.query(`SELECT * FROM porciones`, (error:any, respuesta:any) => {
      if (error){
        console.error(error);
        return;
      }
      for (let row of respuesta.rows){
        porciones.push(row);
      }
      res.send(JSON.stringify({"items":porciones}))
    })
}

const InsertReceta = (req:any, res:any) =>{
    console.log(req.body)
    
    pool.query(`INSERT INTO recetas (nombre,imagen,valoracion,porcion,valor,tiempo,dificultad,tipo_receta,calorias,descripcion,url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [req.body.nombre,req.body.imagen,req.body.valoracion,req.body.porcion,req.body.valor,req.body.tiempo,req.body.dificultad,req.body.tipo_receta,req.body.calorias,req.body.descripcion,req.body.url], (error:any, respuesta:any) =>{
        if (error){
            console.error(error);
            return;
        }else{
            console.log(respuesta.rows[0].id_receta)
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows[0].id_receta}))
        }
    })
  }

const DeleteReceta = (req:any, res:any) =>{
  let id = req.params.id
  pool.query(`DELETE FROM recetas WHERE id_receta = ${id} RETURNING *`, (error:any, respuesta:any) =>{
    if (error){
      console.error(error);
      return;
    }
    else{
      console.log (respuesta.rows[0].id_receta)
      res.send(JSON.stringify({"status":"deleted","item":respuesta.rows[0].id_receta}))
    }
  })
  
}
const PutReceta = (req:any, res:any) =>{
  let id = req.params.id
  pool.query(`UPDATE recetas SET nombre=$1, imagen=$2, valoracion=$3, porcion=$4, valor=$5,tiempo=$6, dificultad=$7, 
  tipo_receta=$8, calorias=$9, descripcion=$10, url=$11 WHERE id_receta = ${id} RETURNING *`,
  [req.body.nombre,req.body.imagen,req.body.valoracion,req.body.porcion,req.body.valor,req.body.tiempo,req.body.dificultad,req.body.tipo_receta,req.body.calorias,req.body.descripcion,req.body.url], 
  (error:any, respuesta:any)=>{
    if(error){
      console.log(error);
      return;
    }else{
      console.log(respuesta.rows[0].id_receta)
      res.send(JSON.stringify({"status":"updated","item":respuesta.rows[0].id_receta}))
    }
  })
}

const InsertUsuario= (req:any, res:any) =>{
  console.log(req.body)
  
  pool.query(`INSERT INTO usuarios(email,pass) VALUES($1,PGP_SYM_ENCRYPT ($2,'AES_KEY')) RETURNING *`,
  [req.body.email,req.body.pass], (error:any, respuesta:any) =>{
      if (error){
          console.error(error);
          return;
      }else{
          console.log(respuesta.rows[0].id_usuario)
          res.send(JSON.stringify({"status":"registered","usuario":respuesta.rows[0].id_usuario}))
      }
  })
}

const Login= (req:any, res:any) =>{
  console.log(req.body)
  
  pool.query(`SELECT id_usuario FROM usuarios WHERE email = $1 and PGP_SYM_DECRYPT( pass::bytea,'AES_KEY') = $2`,
  [req.body.email,req.body.pass], (error:any, respuesta:any) =>{
      if (error){
          console.error(error);
          return;
      }else{
          console.log(respuesta.rows[0].id_usuario)
          res.send(JSON.stringify({"status":"loged","usuario":respuesta.rows[0].id_usuario}))
      }
  })
}

module.exports={
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
}