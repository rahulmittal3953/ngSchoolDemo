import { ClassFee } from "./classfee";
import { Student } from "./student";

export class StudentFee{
    studentFeeId: String;
    classFee : ClassFee;
    student:Student;
    isActive : boolean;
}