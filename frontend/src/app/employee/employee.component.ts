import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

declare var M:any;



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  employeee  ={
    _id: '',
    name: '',
    position: '',
    office: '',
    salary: '',
  }

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.refreshEmployeeList();
  }

  onSubmit(form : NgForm){
    if(form.value._id == ""){
    this.employeeService.postEmployee(form.value).subscribe((res) =>{
      M.toast({ html: 'Saved succefully', classes: 'rounded'});
      this.refreshEmployeeList()
      this.resetForm();
    });
  }
  else{
    this.employeeService.putEmployee(form.value).subscribe((res) =>{
      M.toast({ html: 'Update succefully', classes: 'rounded'});
      this.refreshEmployeeList()
      this.resetForm();
    });
  }
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
      
    })
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form:NgForm){
    if(confirm('Are you sure .?') == true){
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        M.toast({html: 'Deleted', classes:'rounded'});
      });
    }
    this.resetForm();
  }

  resetForm(){
    this.employeeService.selectedEmployee = this.employeee
  }
}
