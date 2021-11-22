import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Credential } from 'src/app/models/Credential';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private userHttp: UserService, private router: Router) { }

  ngOnInit(): void {
   
  }
  userId: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userDob: string; 
  userPassword: string;
  userConfirmPassword: string;
  userDOBNum: number;
  differentPasswords: string = "Passwords do not match";
  noFirstName: string = "Please Input Valid First Name";
  noLastName: string = "Please Input Valid Last Name";
  noEmail: string  = "Please Input Valid Email";
  noDob: string = "Please Valid Input Date of Birth";
  correctInfo: boolean;
 



  
  
  Register(){
    if (this.userPassword != this.userConfirmPassword){
      
      this.correctInfo = false;
    } else if (!this.userEmail){
      
      this.correctInfo = false;

    } else if (!this.userFirstName){
      
      this.correctInfo = false;
    } else if (!this.userLastName){
      
      this.correctInfo = false;
    }else if (!this.userDob){
      
      this.correctInfo = false;
    }
    else{
      this.correctInfo = true;
      
  }
  if(this.correctInfo){
    console.log(this.userFirstName);
      console.log(this.userLastName);
      console.log(this.userEmail);
      console.log(this.userDob);
      console.log(this.userPassword);
      console.log(this.userConfirmPassword);

      this.createUser();
  }
    
  }

  createUser(){

    this.userDOBNum = this.dateToNum(this.userDob);
    let newUser: User = new User(0, this.userEmail, this.userFirstName, this.userLastName, this.userDOBNum, null, '', '', '', '');
    let newCredential: Credential = new Credential(newUser, this.userPassword);
    this.userHttp.addUser(newCredential).subscribe (
      (response) => {
        console.log(response);
        this.userId = response.userId;
        setTimeout(() => this.router.navigate(['viewprofile/' + this.userId]))  
      }
    )
  }

  //Convert String DOB to Unix Timestamp
  dateToNum(userDob: string){
    let DOBDate = new Date(userDob);
    let DOBNum = (DOBDate.getTime() / 1000);

    return DOBNum;
  }


}
