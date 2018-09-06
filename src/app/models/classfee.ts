import { ClassFeeParams } from "./classfeeparams";

export class ClassFee{
    classFeeId? : String;
    name? : String;
    description? : String;
    startDate? : Date;
    endDate? : Date;
    classFeeParams?: ClassFeeParams[];
}