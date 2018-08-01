import { ClassFee } from "./classfee";
import { Student } from "./student";
import { StudentFeeParams } from "./studentfeeparams";
import { StudentClass } from "./studentclass";
import { StudentPaymentHistory } from "./studentpaymenthistory";

export class StudentFee{
    studentFeeId?: String;
    classFee? : ClassFee;
    student? :Student;
    studentClass?: StudentClass;
    isActive? : boolean;
    startDate?: String;
    endDate?:String;
    studentFeeAmt? : number;
    studentPaidFeeAmt?:number;
    studentBalanceFeeAmt?:number;
    studentFeeParams : StudentFeeParams[];
    studentPaymentHistories: StudentPaymentHistory[];
}