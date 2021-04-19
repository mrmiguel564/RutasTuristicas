const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const conn = require('./database');
const { json } = require('body-parser');
const PassportLocal = require('passport-local').Strategy;
const multer = require('multer');

const storage = multer.diskStorage({
     destination: path.join(__dirname,'imagen') ,
     filename: (req, file, cb) => {
          cb (null, file.originalname)
     }
})
// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs'); 


// Middleware (funciones que se procesan antes de llegar a rutas)
app.use(multer({
     storage,
     dest: path.join(__dirname,'imagen')
 //    fileFilter: (req, file, cb)=>{
  //   const filetype = /jpeg|jpg|png|gif/;
  //   }
}).any('jpg'));
app.use(express.static(path.join(__dirname, "imagen") ));
app.use(express.urlencoded({ extended: true}))
app.use(express.json()); //Transfomar a formato JSON 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('el secreto'));
app.use(session({
     secret: 'el secreto',
     resave: true, //la sesión se guardar cada vez
     saveUninitialized: true    //Si inicializamos y no le guardamos nada igual va a guardar
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(function(username,password,done){
     conn.query('select * From admin Where Usuario=? and Contraseña=?',[username,password],(err,resp,campos)=>{
     try{ 
         var user;
         var pass;
 
         if(resp==null){
             user="xdxd";
             pass="xdxd";
         }
         else{
             user = resp[0].Usuario;
             pass = resp[0].Contraseña;
         }
 
     if(username === user && password === pass){
         console.log(resp);
      return done(null,{id:resp[0].Usuario, name: resp[0].Usuario});
     }
 }catch(e){
     done(null,false);
 }})
     
      
 }));


    
/*
     conn.query('Select * from usuario where correo = ? and password = ? and rol = "administrador"', [username, password] , (err,resp,campos) => {
          console.log(resp)
          if(resp){
     return done(null,{id:1, name: resp.name});
    }else{
      done(null,false);
    }
     }
)})); 




     done(null,false);
}));
*/
//Serialización, parar la información para identificar usuario en passport
passport.serializeUser(function(user,done){
     done(null,user.id);
});
//Deserializacion
passport.deserializeUser(function(id,done){
     done(null, {id:1, name: 'mauricio'})
});


// Rutas (URL)
app.use(require('./routes/vinoteca'));

// Iniciando Servidor
app.listen(app.get('port'), () => {
     console.log('Servidor en puerto ',app.get('port'))
});
