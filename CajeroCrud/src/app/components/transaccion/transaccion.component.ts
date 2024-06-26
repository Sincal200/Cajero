import { Component , OnInit} from '@angular/core';
import { TransaccionModel } from '../../model/transaccion-model';
import { TransaccionService } from '../../service/transaccion.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';




@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrl: './transaccion.component.sass'
})
export class TransaccionComponent { 

  listTransacciones: TransaccionModel [] = [];
  formTransacciones: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  constructor(private transaccionService: TransaccionService){}

  ngOnInit():void{
    this.list();
    this.formTransacciones = new FormGroup({
      transaccionId: new FormControl(''),
      fecha: new FormControl(''),
      tipo: new FormControl(''),
      cuentaId: new FormControl(''),
      cuentaDestino: new FormControl(''),
      numeroDepositoID: new FormControl(''),
      cajeroID: new FormControl(''),
      monto: new FormControl('')
    });
  }

  list(){
    this.transaccionService.getTransacciones().subscribe(resp=>{
      if(resp){
        this.listTransacciones = resp;
      }
    });
  }

  saveDeposito(){
    this.list();
    let maxId = Math.max(...this.listTransacciones.map(t => t.transaccionId));
    this.formTransacciones.controls['transaccionId'].setValue(maxId + 1);
    this.formTransacciones.controls['fecha'].setValue(new Date().toISOString());
    this.formTransacciones.controls['tipo'].setValue('Deposito');
    this.formTransacciones.controls['cuentaDestino'].setValue(0);
    this.formTransacciones.controls['numeroDepositoID'].setValue(0);
    this.formTransacciones.controls['cajeroID'].setValue(1);
    this.transaccionService.saveTransacciones(this.formTransacciones.value).subscribe(resp =>{
    this.list();
    alert("La operación se realizó con éxito");
      if(resp){
        this.list();
        this.formTransacciones.reset();
      }
    },
    error => {
      let customErrorMessages = ["La cuenta especificada no existe"];
      let found = customErrorMessages.find(message => error.error.includes(message));
    
      if (found) {
        alert(found);
      } else {
        let parts = error.error.split(':');
        if (parts.length >= 2) {
          alert(parts[1].trim());
        } else {
          alert(error.error);
        }
      }
    }   
  );
    this.list();
    this.formTransacciones.reset();
  }

  saveRetiro(){
    this.list();
    let maxId = Math.max(...this.listTransacciones.map(t => t.transaccionId));
    this.formTransacciones.controls['transaccionId'].setValue(maxId + 1);
    this.formTransacciones.controls['fecha'].setValue(new Date().toISOString());
    this.formTransacciones.controls['tipo'].setValue('Retiro');
    this.formTransacciones.controls['cuentaDestino'].setValue(0);
    this.formTransacciones.controls['numeroDepositoID'].setValue(0);
    this.formTransacciones.controls['cajeroID'].setValue(1);
    this.transaccionService.saveTransacciones(this.formTransacciones.value).subscribe(resp =>{
    this.list();
    alert("La operación se realizó con éxito");
      if(resp){
        this.formTransacciones.reset();
        this.list();
      }
    },
    error => {
      let customErrorMessages = ["El saldo es insuficiente","La cuenta especificada no existe"];
      let found = customErrorMessages.find(message => error.error.includes(message));
    
      if (found) {
        alert(found);
      } else {
        let parts = error.error.split(':');
        if (parts.length >= 2) {
          alert(parts[1].trim());
        } else {
          alert(error.error);
        }
      }
    }   
  );
    this.list();
    this.formTransacciones.reset();
  }

  saveDepositoTercero(){
    this.list();
    let maxId = Math.max(...this.listTransacciones.map(t => t.transaccionId));
    this.formTransacciones.controls['transaccionId'].setValue(maxId + 1);
    this.formTransacciones.controls['fecha'].setValue(new Date().toISOString());
    this.formTransacciones.controls['tipo'].setValue('DepositoTercero');
    this.formTransacciones.controls['numeroDepositoID'].setValue(0);
    this.formTransacciones.controls['cajeroID'].setValue(1);
    this.transaccionService.saveTransacciones(this.formTransacciones.value).subscribe(resp =>{
    this.list();
    alert("La operación se realizó con éxito");
      if(resp){
        this.list();
        this.formTransacciones.reset();
      }
    },
    error => {
      let customErrorMessages = ["El saldo es insuficiente","La cuenta especificada no existe","La cuenta de destino especificada no existe"
    ,"Debe ingresar almenos un destinatario"];
      let found = customErrorMessages.find(message => error.error.includes(message));
    
      if (found) {
        alert(found);
      } else {
        let parts = error.error.split(':');
        if (parts.length >= 2) {
          alert(parts[1].trim());
        } else {
          alert(error.error);
        }
      }
    }   
  );
    this.list();
    this.formTransacciones.reset();
  }

  saveDepositoCelular(){
    this.list();
    let maxId = Math.max(...this.listTransacciones.map(t => t.transaccionId));
    this.formTransacciones.controls['transaccionId'].setValue(maxId + 1);
    this.formTransacciones.controls['fecha'].setValue(new Date().toISOString());
    this.formTransacciones.controls['tipo'].setValue('DepositoCelular');
    this.formTransacciones.controls['cuentaDestino'].setValue(0);
    this.formTransacciones.controls['cajeroID'].setValue(1);
    this.transaccionService.saveTransacciones(this.formTransacciones.value).subscribe(resp =>{
    this.list();
    alert("La operación se realizó con éxito");
      if(resp){
        this.list();
        this.formTransacciones.reset();
      }
    },
    error => {
      let customErrorMessages = ["El saldo es insuficiente","La cuenta especificada no existe","La cuenta de destino especificada no existe"
    ,"Debe ingresar almenos un destinatario"];
      let found = customErrorMessages.find(message => error.error.includes(message));
    
      if (found) {
        alert(found);
      } else {
        let parts = error.error.split(':');
        if (parts.length >= 2) {
          alert(parts[1].trim());
        } else {
          alert(error.error);
        }
      }
    }   
  );
    this.list();
    this.formTransacciones.reset();
  }


  newTransaccion(){
    this.formTransacciones.reset();
    this.list();
  }

}


