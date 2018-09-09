import { StudentClass } from "./studentclass";
import { StudentFee } from "./studentfee";

export class Student {
    studentId?: string ;
    admissionno?: string ;
    firstName?: string ;
    lastName?: string ;
    studentAdharId?: string ;
    studentdob?: Date ;
    gender?: string ;
    startDate?: Date ;
    endDate?: Date ;
    fathername?: string ;
    fatherage?: number ;
    fatherqualification?: string ;
    fatherdob?: Date ;
    fatherprofession?: string ;
    mothername?: string ;
    motherage?: number ;
    motherqualification?: string ;
    motherdob?: Date ;
    motherprofession?: string ;
    address?: string ;
    phoneno?: string ;
    cellno?: string ;
    emailaddress?: string ;
    studentClass?:StudentClass;
    studentFee?: StudentFee;
}
