import { ClassFeeType } from "./classfeetype";
import { Student } from "./student";

export class StudentFeeWaiver {
    studentFeeWaiverId : String;
    classFeeType: ClassFeeType;
    student: Student;
    feeWaiverPer: String;
}
