import { StudentClass } from "./studentclass";
import { StudentFee } from "./studentfee";

export class Student {
    studentId?: string ;
    admissionno?: string ;
    firstName?: string ;
    lastName?: string ;
    studentAdharId ?: string ;
    studentdob?: string ;
    gender?: string ;
    startDate?: string ;
    endDate?: string ;
    fathername?: string ;
    fatherage?: number ;
    fatherqualification?: string ;
    fatherdob?: string ;
    fatherprofession?: string ;
    mothername?: string ;
    motherage?: number ;
    motherqualification?: string ;
    motherdob?: string ;
    motherprofession?: string ;
    address?: string ;
    phoneno?: string ;
    cellno?: string ;
    emailaddress?: string ;
    studentClass?:StudentClass;
    studentFee?: StudentFee;
}
