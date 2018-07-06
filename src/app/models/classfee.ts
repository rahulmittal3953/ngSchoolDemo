import { ClassFeeParams } from "./classfeeparams";

export class ClassFee{
    classFeeId? : String;
    name? : String;
    description? : String;
    startDate? : String;
    endDate? : String;
    classFeeParams?: ClassFeeParams[];
}