import { User } from "./User";

export class GroupInfo
{
    infoId!:number;
    groupName!:string;
    description!:string;
    dateCreated!:Date;
    owner!:User;

    public constructor(id:number, name:string, desc:string, ownr:User)
    {
        this.infoId = id;
        this.groupName = name;
        this.description = desc;
        this.owner = ownr;
    }
}
