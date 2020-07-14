import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  employees: Employee[]; //El array donde guardare los empleados
  readonly URL_API= 'http://localhost:3000/api/employees'

  constructor(private http: HttpClient) { 
    this.selectedEmployee= new Employee();
  }


  getEmployees(){
    return this.http.get(this.URL_API);//devuelve los datos en un array
  }
  postEmployee(Employee: Employee){
    return this.http.post(this.URL_API, Employee);//hay que pasarle un empleado
  }
  putEmployee(employee: Employee){
    return this.http.put(this.URL_API + `/${employee._id}`, employee);//ke ponga el id detras de la ruta
  }
  deleteEmployee(_id: string){// solo necesita la id
    return this.http.delete(this.URL_API + `/${_id}`);//ke ponga el id detras de la ruta
  }
}
