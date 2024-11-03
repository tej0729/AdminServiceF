import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin-module';
  adminDetails: any[] = [];
  adminToUpdate: any = {
    id: null,
    username: "",
    email: "",
    password: "",
    isActive: false
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAdminDetails();
  }

  register(registerForm: NgForm) {
    const adminData = {
      ...registerForm.value,
      isActive: registerForm.value.isActive || false
    };
    this.adminService.createAdmin(adminData).subscribe(
      (resp: any) => {
        console.log(resp);
        registerForm.reset();
        this.getAdminDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getAdminDetails() {
    this.adminService.getAllAdmins().subscribe(
      (resp: any) => {
        console.log(resp);
        this.adminDetails = resp;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteAdmin(admin: any) {
    this.adminService.deleteAdmin(admin.id).subscribe(
      (resp: any) => {
        console.log(resp);
        this.getAdminDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  edit(admin: any) {
    this.adminToUpdate = { ...admin };
  }

  updateAdmin() {
    this.adminService.updateAdmin(this.adminToUpdate.id, this.adminToUpdate).subscribe(
      (resp: any) => {
        console.log(resp);
        this.getAdminDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
