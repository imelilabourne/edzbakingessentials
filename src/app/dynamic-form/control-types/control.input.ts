import { Base } from "../models/base";

export class Input extends Base<string>{
    override controlType = 'input';
}