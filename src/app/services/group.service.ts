import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GroupThread } from '../models/group-thread';
import { BackendService } from './backend.service';
import { LoginService } from './login.service';

/**************************************************************************/
// Defines
const uriMapping:string = "/groups";

/**************************************************************************/
// Angular Decorators
@Injectable({
  providedIn: 'root'
})

export class GroupService 
{
  constructor(private http:HttpClient, private loginService:LoginService, private backendService:BackendService) { }

  authToken:string = this.loginService.getLoginInfo().authToken; // Get auth token from user

  postHeaders = new HttpHeaders({
    'Context-Type': 'application/json',
    'Authorization': this.authToken
  });

  /**************************************************************************/
  // Posts
  addGroup(groupObj:GroupThread): Observable<GroupThread>
  {
    // Convert the object into a JSON msg then print it to console.
    const jsonStr:string = JSON.stringify(groupObj);
    console.log(jsonStr);

    return this.http.post<GroupThread>(
      this.backendService.getBackendURL() + uriMapping,
          jsonStr,//JSON.stringify(groupObj),
          {headers: this.postHeaders}
      ).pipe(retry(1), catchError(this.errorHandle));
  }

  /**************************************************************************/
  // Puts
  updateGroup(groupObj:GroupThread): Observable<GroupThread>
  {
    // Convert the object into a JSON msg then print it to console.
    let jsonStr:string = JSON.stringify(groupObj);
    console.log(jsonStr);

    return this.http.put<GroupThread>(
      this.backendService.getBackendURL() + uriMapping,
          jsonStr,//JSON.stringify(groupObj),
          {headers: this.postHeaders}
      ).pipe(retry(1), catchError(this.errorHandle));
  }

  /**************************************************************************/
  // Deletes
  deleteGroup(groupId:number): Observable<GroupThread>
  {
    return this.http.delete<GroupThread>(
        this.backendService.getBackendURL() + uriMapping + "/" + groupId );
  }

  /**************************************************************************/
  // Gets
  getGroupById(groupId:number): Observable<GroupThread>
  {
    return this.http.get<GroupThread>(
      this.backendService.getBackendURL() + uriMapping + "/" + groupId
    ).pipe(retry(1), catchError(this.errorHandle));
  }

  getGroupsByLoggedInUser(): Observable<GroupThread[]>
  {
    return this.http.get<GroupThread[]>(
      this.backendService.getBackendURL() + uriMapping + "/GetByCurrentUser"
    );
  }

  getAllGroups(): Observable<GroupThread[]>
  {
    return this.http.get<GroupThread[]>(
      this.backendService.getBackendURL() + uriMapping + "/GetAllGroups"
    );
  }

  /**************************************************************************/
  // Utility
  errorHandle(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    }else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
