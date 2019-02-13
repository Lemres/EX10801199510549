var express = require('express');
var router = express.Router();

var fileModel = require('./jsonmodel');
var data = null;

var cosas = {
  'RTN':'',
  'Empresa':'',
  'Correo':'',
  'Rubro':'',
  'Direccion':'',
  'Telefono':''
};

router.get('/', function( req, res, next) {
  if(!data){
    fileModel.read(function(err, filedata){
      if(err){
        console.log(err);
        data = [];
        return res.status(500).json({'error':'Error al Obtener Data'});
      }
      data = JSON.parse(filedata);
      return res.status(200).json(data);
    });
  } else {
    return res.status(200).json(data);
  }
});//Obtener

module.exports = router;
