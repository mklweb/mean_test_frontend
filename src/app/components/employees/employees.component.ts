import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
//Para el toast
declare var M :any;// Para que tome el dato de materialize
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }// deberia ser private

  ngOnInit(): void {
    this.getEmployees();
  }
  //EVENTOS
  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = new Employee ();// si hay un dato que se resetee tambien
    }  
  }
  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value)
      .subscribe(res=> { // Para escuchar la respuesta del server
        this.resetForm(form);
        this.getEmployees();
        M.toast({html: "Update Succesfull"});
      });
    } else{
      this.employeeService.postEmployee(form.value)
      .subscribe(res=> { // Para escuchar la respuesta del server
        this.resetForm(form);
        M.toast({html: "Save Succesfull"});
        this.getEmployees();
      });
    }
  }
  getEmployees(){
    this.employeeService.getEmployees()
      .subscribe(res => { // Para escuchar la respuesta del server
        this.employeeService.employees = res as Employee[];//Meto todos los empleadops en un array de Employees
        console.log(res);
      });
  }
  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
    

  }
  deleteEmployee(_id : string){
    if (confirm("DELETE?")){
      this.employeeService.deleteEmployee(_id)
      .subscribe(res => { // Para escuchar la respuesta del server
        this.getEmployees();
        M.toast({html: "Eliminated"});
      });
    
    }
    
  }
}
