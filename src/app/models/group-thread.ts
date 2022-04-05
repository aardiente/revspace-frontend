import { GroupInfo } from "./group-info";
import { User } from "./User";

export class GroupThread 
{
    groupId!:number;
    groupInfo!:GroupInfo;
    groupMembers!:User[];
}
