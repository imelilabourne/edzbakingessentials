import { Base } from "../models/base";

export class Dropdown extends Base<string> {
    override controlType = 'dropdown'
}