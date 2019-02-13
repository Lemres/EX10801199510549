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

router.post('/new', function(req, res, next){
  var info = Object.assign({} , cosas, req.body);
  if(!data){
    data = [];
  }
  data.push(info);
  fileModel.write(data, function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ 'error': 'Error al Obtener Data' });
    }
    return res.status(200).json(_thingsData);
  });
});//Nuevo

router.delete('/delete/:empresa', function(req, res, next){
  var _Correo = req.params.Correo;
  var newData = data.filter(
    function (doc, i) {
      if (doc._Correo == _Correo) {
        return false;
      }
      return true;
    }
  );
  data = newData;
  fileModel.write(data, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ 'error': 'Error al Guardar Data' });
    }
    return res.status(200).json({"delete": _Correo});
  });
}); // Borrar

fileModel.read(function(err , filedata){
  if(err){
    console.log(err);
  } else{
    data = JSON.parse(filedata);
  }
});

module.exports = router;
