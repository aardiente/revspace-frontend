import { User } from "./User";

export class GroupInfo
{
    infoId!:number;
    groupName!:string;
    description!:string;
    interests!:string;// To Do. Update logic to support group interest field
    dateCreated!:string;
    owner!:User;

    public constructor(name:string, desc:string, inter:string, ownr:User)
    {
        //this.infoId = id;
        this.groupName = name;
        this.description = desc;
        this.interests = inter;
        this.dateCreated = new Date().toLocaleDateString("en-US");
        this.owner = ownr;
    }
}
