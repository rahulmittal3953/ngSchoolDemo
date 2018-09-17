import { StudentClass } from "./studentclass";
import { ClassFee } from "./classfee";
import { StudentPromotedClass } from "./studentpromotedclass";

export class GenerateFee {
    classFee? : ClassFee ;
    studentClasses?: StudentClass[];
    studentPromotedClasses?: StudentPromotedClass[];
}