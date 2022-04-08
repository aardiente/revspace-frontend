import { GroupInfo } from "./group-info";
import { User } from "./User";

export class GroupThread 
{
    groupId!:number;
    groupInfo!:GroupInfo;
    groupMembers:User[] = [];

    public constructor(info:GroupInfo, userList:User[])
    {
       // this.groupId = id; // passed value doesnt matter
        this.groupInfo = info; // information about the group and its owner
        this.groupMembers = userList; // list of all members
    }

}
