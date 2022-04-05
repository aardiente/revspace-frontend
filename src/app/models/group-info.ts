import { User } from "./User";

export class GroupInfo
{
    infoId!:number;
    description!:string;
    dateCreated!:Date;
    owner!:User;
}
