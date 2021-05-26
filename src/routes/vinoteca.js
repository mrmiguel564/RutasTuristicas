const express = require('express');
const passport = require('passport');
const router = express.Router();
const conn = require('../database'); // Buscando el archivo de conf de la base de datos
const multer = require('multer');




router.get('/Getrutas/:id_ruta',(req,res) =>{
    const{id_ruta} = req.params
    conn.query('Select * from puntos_turisticos where ID = ?',  [id_ruta], (err,resp,campos) => {
        console.log(resp);
    });
});

router.get('/', (req,res) => {
    conn.query('Select * from rutas', (err,resp,campos) => {
        conn.query('Select ID, Numero_punto, Coord_X , Coord_Y, Icono, Direccion from puntos_turisticos', (err,resp1,campos) => {
        

            res.render('vinoteca.ejs',   { rutas: resp, puntos: resp1 });
        });
    });

});

router.get('/login', (req,res) =>{
    res.render('login.ejs');
    
});

router.get('/registro', (req,res) =>{
    res.render('RegistrarUsuario.ejs');
    
});

router.get('/direccionEnvio/:id_compra', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
    //res.render('index.ejs');
    },(req,res) =>{
    const{id_compra} = req.params
    conn.query('Select * from compra where id_compra = ?',[id_compra] ,(err,resp,campos) => {
        //console.log(resp);
        res.render('DireccionEnvio.ejs',   { datos: resp });
    });

});

router.get('/ingresarDireccion/:id_compra', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
    //res.render('index.ejs');
    },(req,res) =>{

    const{id_compra} = req.params
    conn.query('Select * from compra where id_compra = ?',[id_compra] ,(err,resp,campos) => {
        //console.log(resp);
        res.render('DireccionEnvio.ejs',   { datos: resp });
    });

});

router.post('/ingresa/Direccion/:id_compra',(req, res,next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res) =>{
    //console.log(req.body);
    const {numero_casa, provincia, comuna, numero_block, calle, comentarios} = req.body;
    const { id_compra} = req.params;
    conn.query('INSERT into direccion_envio SET? ',{
        id_compra: id_compra,
        numero_casa: numero_casa,
        provincia: provincia,
        comuna: comuna,
        numero_block: numero_block,
        calle: calle,
        comentarios: comentarios
    }, (err, result) => {
        if(!err) {
            
            res.redirect('/');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
});

router.get('/eliminarCompra/:id_compra', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
   

    const { id_compra } = req.params;
    conn.query('DELETE from compra WHERE id_compra = ?', [id_compra], (err, resp, campos) => {
        if(!err){
            console.log("persona eliminada")
            res.redirect('/')
        }else{
            console.log(err);
        }
    });
});
router.post('/registrarUsuario',(req,res) =>{
    //console.log(req.body);
    
   
    const {correo, nombre, password, fecha_nacimiento, telefono} = req.body;
    conn.query('INSERT into usuario SET? ',{
        correo: correo,
        nombre: nombre,
        password: password,
        fecha_nacimiento: fecha_nacimiento,
        telefono, telefono
    }, (err, result) => {
        if(!err) {
            res.redirect('/login');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
});

// router.post('/login',passport.authenticate('local',{  
//     successRedirect: "/listo",
//     failureRedirect: "/login"
// }));

// router.get('/listo/', (req,res,next)=>{
//     if(req.isAuthenticated()) return next();
    
//     res.redirect('/login');
// },(req,res) =>{
    
//     let op = require("../index.js")
//     let tipo_usuario = op.rol1;
//     if(tipo_usuario==="administrador"){
//         res.redirect('/admin');
//     }else if(tipo_usuario==="cliente"){
//         res.redirect('/');
//     }   
// });
router.get('/login', (req,res) =>{
    res.render('login.ejs');
});

router.post('/login',passport.authenticate('local',{
    successRedirect: "/correcto",
    failureRedirect: "/login"
}));



module.exports = router;
router.get('/modificarCompras/:id_compra', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const { id_compra } =  req.params;
    conn.query('Select * from compra where id_compra = ?', [id_compra] , (err,resp,campos) => {
        //console.log(resp);
        res.render('ModificarCompras.ejs',   { datos: resp });
    });
});

router.get('/modificarrutas/:id_ruta', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {id_ruta} =  req.params;
    conn.query('Select * from rutas where id_ruta = ?', [id_ruta] , (err,resp,campos) => {
        //console.log(resp);
        res.render('Modificarrutas.ejs',   { datos: resp });
    });
});

router.get('/modificarPersonas/:correo', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {correo} =  req.params;
    conn.query('Select * from usuario where correo = ?', [correo] , (err,resp,campos) => {
        //console.log(resp);
        res.render('ModificarPersonas.ejs',   { datos: resp });
    });
});


router.get('/admin', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
    
    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    conn.query('SELECT usuario.correo, Count(ruta_carrito.id_ruta) AS NumeroPedidos FROM ruta_carrito LEFT JOIN usuario ON ruta_carrito.correo=usuario.correo GROUP BY usuario.nombre', (err,resp,campos) => {
        conn.query('SELECT MIN(rutas.precio) as MenorPrecio from rutas join stock on rutas.id_ruta = stock.id_ruta', (err,resp1,campos) => {
            conn.query('SELECT MAX(rutas.precio) as MayorPrecio from rutas join stock on rutas.id_ruta = stock.id_ruta', (err,resp2,campos) => {
                conn.query('SELECT AVG(rutas.precio) as ElPromedioDeLosPrecios from rutas join stock on rutas.id_ruta = stock.id_ruta', (err,resp3,campos) => {
                    conn.query('select * , max(cantidad_ruta) as rutaMaximo from (ruta_carrito INNER JOIN rutas)', (err,resp4,campos) => { 
                        conn.query('SELECT * FROM rutas WHERE id_ruta NOT IN (SELECT id_ruta FROM rutas_compra)', (err,resp5,campos) => {     
                     res.render('admin.ejs',   { datos: resp, datos1: resp1, datos2: resp2, datos3: resp3, datos4: resp4, datos5:resp5});
                });
            });
        });
         });
        });
    });
    
    
});

router.get('/admin/rutas', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    conn.query('Select * from rutas', (err,resp,campos) => {
        //console.log(resp);
        res.render('rutas.ejs',   { datos: resp });
    });
});

router.get('/admin/personas', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
  
    conn.query('Select * from usuario', (err,resp,campos) => {
        //console.log(resp);
        res.render('personas.ejs',   { datos: resp });
    });
});





router.get('/login', (req,res) => {
    res.render('login.ejs',{title: 'chequeo del login'});
});

router.get('/eliminar/:id_ruta', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
  
    const { id_ruta } = req.params;
    conn.query('DELETE from rutas WHERE id_ruta = ?', [id_ruta], (err, resp, campos) => {
        if(!err){
            console.log("rutas eliminado")
            res.redirect('/admin/rutas')
        }else{
            console.log(err);
        }
    });
});


router.post('/ingresa/rutas', (req, res,next) => {
        
    //console.log(req.files[0].filename);

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{

 

    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
  
    const {nombre, precio, activo, descripcion, jpg} = req.body;
    conn.query('INSERT into rutas SET? ',{
        nombre: nombre,
        Estado: Estado,
        descripcion : descripcion,
        Material_visual        : req.files[0].filename,
    
    }, (err, result) => {
        if(!err) {
            res.redirect('/admin/rutas');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log(err);
        }
    });
    
});

router.post('/ingresa/personas',(req, res, next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    //console.log(req.body);
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
   
    const {correo, nombre, password, fecha_nacimiento, rol, telefono} = req.body;
    conn.query('INSERT into usuario SET? ',{
        correo: correo,
        nombre: nombre,
        password: password,
        fecha_nacimiento: fecha_nacimiento,
        rol: rol,
        telefono, telefono
    }, (err, result) => {
        if(!err) {
            res.redirect('/admin/personas');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
});

//Ingreso RUTAS Y CUALQUIER COSA QUE TENGA QUE VER CON LA PAG MODIFICAR ELIMINAR!!!
router.get('/A', (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
},(req,res) => {
    conn.query('Select * from rutas', (err,resp,campos) => {
        conn.query('Select ID, Numero_punto, Coord_X , Coord_Y, Icono, Direccion from puntos_turisticos', (err,resp1,campos) => {
        

            res.render('vinotecaA.ejs',   { rutas: resp, puntos: resp1 });
        });
    });

});
router.get('/ingresorutas', (req,res) => {
    conn.query('Select * from rutas', (err,resp,campos) => {
        conn.query('Select ID, Numero_punto, Coord_X , Coord_Y, Icono, Direccion from puntos_turisticos', (err,resp1,campos) => {
        
            console.log(resp);
            console.log(resp1);
            res.render('ingresorutas.ejs',   { rutas: resp, puntos: resp1 });
        });
    });

});
router.post('/ingresorutas',(req, res,next) => {
    const {Nombre,Descripcion,Material_visual}=req.body;
    conn.query('insert into rutas SET?',{
        Nombre:Nombre,
        Descripcion:Descripcion,
        Material_visual:req.files[0].filename,
    },(err,resp,campos) =>{
        if(!err) {
            

                console.log(resp);
                console.log("xddd");
                console.log(resp.insertId);
                var sql = 'insert into puntos_turisticos(ID,Numero_punto,Coord_x,Coord_y,Nombre,Descripcion,Icono,Direccion) VALUES ?';
                const {Numero_punto,Coord_x,Coord_y,NombreP,DescripcionP,Icono,Direccion}=req.body;
                var values=[];
                for(var i=0;i<Numero_punto.length;i++){
                    values.push([resp.insertId,Numero_punto[i],Coord_x[i],Coord_y[i],NombreP[i],DescripcionP[i],Icono[i],Direccion[i]])
                };
                console.log(values);
                conn.query(sql,[values],function(err){
                    console.log(err);
                
            
            
               
            
                    });
                res.render("ingresorutas.ejs");

           
          } else {
            console.log(err);
          }
        
    
});
});
router.get('/ingresorutasA', (req,res,next)=>{
        if(req.isAuthenticated()) return next();
        res.redirect('/login');
    },(req,res) => {
    conn.query('Select * from rutas', (err,resp,campos) => {
        conn.query('Select ID, Numero_punto, Coord_X , Coord_Y, Icono, Direccion from puntos_turisticos', (err,resp1,campos) => {
        
            console.log(resp);
            console.log(resp1);
            res.render('ingresorutasA.ejs',   { rutas: resp, puntos: resp1 });
        });
    });

});
router.post('/ingresorutasA',(req, res,next) => {
    const {Nombre,Descripcion,Material_visual}=req.body;
    console.log(req.body);
    console.log(req.files.filename);
    conn.query('insert into rutas SET?',{
        Nombre:Nombre,
        Descripcion:Descripcion,
        Material_visual : req.files[0].filename,
    },(err,resp,campos) =>{
        if(!err) {
            

                console.log(resp);
                console.log("rutas A");
                console.log(resp.insertId);
                var sql = 'insert into puntos_turisticos(ID,Numero_punto,Coord_x,Coord_y,Nombre,Descripcion,Icono,Direccion) VALUES ?';
                const {Numero_punto,Coord_x,Coord_y,NombreP,DescripcionP,Icono,Direccion}=req.body;
                var values=[];
                for(var i=0;i<Numero_punto.length;i++){
                    values.push([resp.insertId,Numero_punto[i],Coord_x[i],Coord_y[i],NombreP[i],DescripcionP[i],Icono[i],Direccion[i]])
                };
                console.log(values);
                conn.query(sql,[values],function(err){
                    console.log(err);
                
            
            
               
            
                    });
                res.render("ingresorutasA.ejs");

           
          } else {
            console.log(err);
          }
        
    
});
});

router.get('/correcto', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
},(req,res) =>{
    //res.render('index.ejs');
    conn.query('Select ID, Nombre, Estado, Descripcion, Material_visual FROM rutas', (err,resp,campos) => {
            
            res.render('admin.ejs'
            ,{
            datos : resp
            
            });
            console.log(resp);

        });
    


    });
    router.get('/mostrar/:ID', (req,res,next)=>{
        if(req.isAuthenticated()) return next();
        res.redirect('/login');
    },(req,res) => {
        //res.render('index.ejs');
        const { ID } = req.params;
        conn.query('Select * from rutas Where ID=?', [ID] , (err,resp,campos) => {
            console.log(resp);
            if(!err){
            conn.query('Select * from puntos_turisticos WHERE ID=?',[ID],(err,resp1,campos)=>{
                console.log(resp1);
            res.render('Modifcar.ejs',{
                datos: resp,datos1:resp1
            });
            console.log(resp)
        });
            }else{
                console.log(err);
            }
        
    
});
});
router.post('/modificarruta/:ID',(req, res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
},(req,res,err) =>{
    const {Estado,Nombre,Descripcion,Material_visual}=datitos=req.body;
    const {ID} = req.params;
    conn.query('UPDATE rutas SET? WHERE ID=?',[datitos,req.params.ID],(err,resp,campos) =>{
        if(!err) {
            res.redirect('/mostrar/'+req.params.ID);
          } else {
            console.log(err);
          }
    });
});
router.post('/modificarpunto/:ID,:Numero_punto',(req, res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
},(req,res,err) =>{
    const {Nombre,Coord_X,Coord_Y,Descripcion,Icono,Direccion}=datitos=req.body;
    const {ID,Numero_punto} = req.params;
    conn.query('UPDATE Puntos_turisticos SET? WHERE ID=? and Numero_punto=?',[datitos,req.params.ID,req.params.Numero_punto],(err,resp,campos) =>{
        if(!err) {
            res.redirect('/mostrar/'+req.params.ID);
          } else {
            console.log(err);
          }
    });
});
    router.get('/delete/:ID',(req,res,next)=>{
        if(req.isAuthenticated()) return next();
        res.redirect('/login');
    },(req,res)=> {
        const { ID } = req.params;
        conn.query('DELETE FROM rutas WHERE ID=?',[ID],(err,resp,campos)=>{
            console.log(resp);
            if(!err){
                conn.query('DELETE FROM puntos_turisticos WHERE ID=?',[ID],(err,resp,campos) =>{
                    
                });
                res.redirect('/correcto');
            }else{
                console.log(err);
            }
            });
        });
       
    

/* router.post('/ingresa/sucursal',(req, res, next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    //console.log(req.body);
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
   
    const {nombre, ubicacion} = req.body;
    conn.query('INSERT into sucursal SET? ',{
        nombre: nombre,
        ubicacion: ubicacion
    }, (err, result) => {
        if(!err) {
            res.redirect('/admin/sucursales');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
}); */
/* 
router.post('/ingresa/compras',(req, res,next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res) =>{
    //console.log(req.body);
    const {correo, pago_total, nombre_receptor} = req.body;
    conn.query('INSERT into compra SET? ',{
        correo: correo,
        pago_total: pago_total,
        nombre_receptor: nombre_receptor
    }, (err, result) => {
        if(!err) {
            
            res.redirect('/direccionEnvio/'+result.insertId);
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
}); */

/* router.post('/modificar2/:id_compra', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {correo, pago_total, nombre_receptor}= datitos =  req.body;
    const {id_compra} = req.params;
    conn.query('UPDATE compra SET? WHERE id_compra = ?', [datitos, req.params.id_compra], (err, resp, campos) => {
        if(!err){
            console.log("persona actualizada")
            res.redirect('/admin/compras')
        }else{
            console.log(err);
        }
    });
}); */

router.post('/modificar3/:id_ruta', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {nombre, precio, activo, descripcion, jpg }= datitos =  req.body;
    const {id_ruta} = req.params;
    conn.query('UPDATE rutas SET? WHERE id_ruta = ?', [datitos, req.params.id_ruta], (err, resp, campos) => {
        if(!err){
            console.log("rutas actualizado")
            res.redirect('/admin/rutas')
        }else{
            console.log(err);
        }
    });
});

router.post('/modificar4/:correo', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {nombre, password, fecha_nacimiento, rol, telefono}= datitos =  req.body;
    const {correo} = req.params;
    conn.query('UPDATE usuario SET? WHERE correo = ?', [datitos, req.params.correo], (err, resp, campos) => {
        if(!err){
            console.log("Persona actualizada")
            res.redirect('/admin/personas')
        }else{
            console.log(err);
        }
    });
});

router.post('/modificar5/:nombre', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {ubicacion}= datitos =  req.body;
    const {nombre} = req.params;
    conn.query('UPDATE sucursal SET? WHERE nombre = ?', [datitos, req.params.nombre], (err, resp, campos) => {
        if(!err){
            console.log("Sucursal actualizada")
            res.redirect('/admin/sucursales')
        }else{
            console.log(err);
        }
    });
});



module.exports = router;
