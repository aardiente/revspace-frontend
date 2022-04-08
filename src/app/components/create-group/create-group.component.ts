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
      description: ['', Validators.required, Validators.minLength(3)],
      interests: ['', Validators.required, Validators.minLength(3)]
    });
  }

  bindModel()
  {
    console.log("Binding CreateGroup to model");

    console.log(this.groupForm.value['description']);

    let curUser:User = this.loginService.getLoginInfo().user;
    console.log("Binding -> " + curUser);
    console.log("GroupName: " + this.groupForm.get('groupName').value);
    console.log("description: " + this.groupForm.get('description').value);
    console.log("interests: " + this.groupForm.get('interests').value);
    let info:GroupInfo = new GroupInfo(this.groupForm.get('groupName').value, this.groupForm.get('description').value, this.groupForm.get('interests').value, curUser);

    console.log("Info -> " + info);
    let thread:GroupThread = new GroupThread(info, [curUser]);

    console.log("Thread -> " + thread);

    let tempThread:GroupThread = null;

    this.groupService.addGroup(thread).subscribe(
               (data) => tempThread = data), err => this.errorMsg = err;

    console.log("Result of addGroup(): " + tempThread); // Check if an object exists in memory
    this.printGroup(tempThread);
  }
  printGroup(group:GroupThread)
  {
    console.log("GroupThread Obj.");
    console.log(group.groupId);
    console.log("-----------------");
    console.log("Group Info");
    console.log(group.groupInfo.groupName);
    console.log(group.groupInfo.description);
    console.log(group.groupInfo.interests);
    //console.log(group.groupInfo.dateCreated);
    console.log("-----------------");
    console.log("Owner");
    console.log(group.groupInfo.owner.email);
  }

}
