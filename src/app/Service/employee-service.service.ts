import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

private apiUrl='https://localhost:7239/api/Employees'

  constructor(private http :HttpClient) { }


  getEmployees():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
  }

  deleteEmployee(employeeId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${employeeId}`)
  }

  updateEmployee(employeeId: string, formData: FormData) {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.put(url, formData); // Make sure your backend supports PUT with FormData
  }

  createEmployee(employeeData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, employeeData);
  }


}
