import { ClassFee } from "./classfee";
import { Student } from "./student";
import { StudentFeeParams } from "./studentfeeparams";

export class StudentFee{
    studentFeeId?: String;
    classFee? : ClassFee;
    student? :Student;
    isActive? : boolean;
    studentFeeAmt? : String;
    studentFeeParams : StudentFeeParams[];
}