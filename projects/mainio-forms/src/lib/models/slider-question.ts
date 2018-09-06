import { QuestionBase } from "./question-base";
import { ISliderOptions } from "../interfaces/i-slider-options";
import { ControlType } from "./control-type.enum";

export class SliderQuestion extends QuestionBase<number[] | number> {
  controlType = ControlType.Slider;
  isRange: boolean;
  min: number;
  max: number;
  constructor(options: ISliderOptions = {}) {
    super(options);
    this.isRange = options.isRange;
    this.min = options.min;
    this.max = options.max;
  }
}
