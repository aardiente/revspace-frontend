import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupInfo } from 'src/app/models/group-info';
import { GroupThread } from 'src/app/models/group-thread';
import { User } from 'src/app/models/User';
import { GroupService } from 'src/app/services/group.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  groupInfo!:GroupInfo;
  groupForm!:FormGroup;
  errorMsg!:string;
  sucMsg!:string;


  // may need a router dependency
  constructor(public formBuilder:FormBuilder, public groupService:GroupService, public loginService:LoginService) { }


  ngOnInit(): void 
  {
    this.groupForm = this.formBuilder.group(
      {
      groupName: ['', Validators.required, Validators.minLength(3)],
      description: ['', Validators.required, Validators.minLength(3)]  
    });
  }

  bindModel()
  {
    console.log("Binding CreateGroup to model");

    let curUser:User = this.loginService.getLoginInfo().user;
    console.log("Binding -> " + curUser);

    let info:GroupInfo = new GroupInfo(-1, this.groupForm.value[0], this.groupForm.value[1], curUser);

    console.log("Info -> " + info);
    let thread:GroupThread = new GroupThread(-1, info, [curUser]);

    console.log("Thread -> " + thread);

    let tempThread:GroupThread = null;

    this.groupService.addGroup(thread).subscribe(
               (data) => tempThread = data), err => this.errorMsg = err;

    console.log("Result of addGroup(): " + tempThread); // Check if an object exists in memory
  }

}
