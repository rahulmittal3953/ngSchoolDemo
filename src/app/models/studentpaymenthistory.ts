import { Student } from "./student";
import { StudentFee } from "./studentfee";

export class StudentPaymentHistory
{
    studentFeePaymentId?: String;
    student? :Student;
    studentFee?: StudentFee;
    startDate? : String;
    payamentStatus?: String;
    endDate?:String;
    studentFeePaymentAmt? : number;
    studentFeePaymentCmt?:String;
}