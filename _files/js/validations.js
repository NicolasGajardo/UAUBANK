(function (win, doc) {
  var methods = (function (win, doc) {
    //TODO: msj functionality (use clousures)
    function _validateField(field, fn, msj) {
      function _changeInputColor(field, bol){
        field.style.outlineStyle = "solid";
        if(bol){
            field.style.outlineColor = "green";
        } else {
          field.style.outlineColor = "red";
        }
      }
      //return the validated Field 
      var r = fn(field.value);
      _changeInputColor(field, r);
      return r;
    }

    function checkRut() {
      _validateField(doc.getElementById('rut'), function(value){
        return /^([0-9]{7,8}-([0-9]|k|K))$/.test(value);
      });
    }
    
    function checkPassword(){
      _validateField(doc.getElementById('password'), function(value){
        var reg = /^\d+$/;
        return value && value.length === 4 && reg.test(value);
      });
    }
    
    function checkMount(){
      _validateField(doc.getElementById('mount'), function(value){
        return value && value >= 1;
      });
    }
    
    function checkSimulateButton(){
      _validateField(doc.getElementById('simulate'), function(value){
        return _checkAllSimularContent();
      });
      
      function _checkAllSimularContent(){
        function _checkSelects(ids){
          var arrSelects = [];
          
          for (var i = 0; i < ids.length; i++) {
            var isSelectCorrect = _validateField(doc.getElementById(ids[i]), function(value){
              return value !== "Select";
            });
            arrSelects.push(isSelectCorrect);
          }
          
          for (var j = 0; j < arrSelects.length; j++) {
            if(!arrSelects[j]){
              return arrSelects[j];
            }
          }
          return true;
        }
        
        _checkSelects(["select_PlazoPagar",
            "select_PrimeraCuota",
            "select_MesesNoPagoInicio",
            "select_MesesNoPagoFin"]);
            
        checkRut();
        checkMount();
        
        return false;
      }
    }
    
    function checkIngresar(){
      return checkPassword() && checkRut();
    } 
    
    return {
      checkRut: checkRut,
      checkPassword: checkPassword,
      checkMount: checkMount,
      checkSimulateButton: checkSimulateButton,
      checkIngresar: checkIngresar
    };
  }(win, doc));
  
  win.checkRut = methods.checkRut;
  win.checkPassword = methods.checkPassword;
  win.checkMount = methods.checkMount;
  win.checkSimulateButton = methods.checkSimulateButton;
  win.checkIngresar = methods.checkIngresar;

  
}(window, document));
