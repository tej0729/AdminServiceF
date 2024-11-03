import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API = "http://localhost:8080/admin";

  constructor(private http: HttpClient) { }

  getAllAdmins(): Observable<any> {
    return this.http.get(this.API);
  }

  getAdminById(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }

  createAdmin(adminData: any): Observable<any> {
    return this.http.post(this.API, adminData);
  }

  updateAdmin(id: number, adminData: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, adminData);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
