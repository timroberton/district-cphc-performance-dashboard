import { _STATE_1, _STATE_2, _STATE_3 } from "~/key_colors";
import { SelectOption } from "~/ui";

export function makeLabelReplacments(
  options: SelectOption<string>[],
): Record<string, string> {
  return options.reduce<Record<string, string>>((obj, m) => {
    obj[m.value] = m.label;
    return obj;
  }, {});
}

export function getStateColors(states: number[]): string[] {
  return states.map((state) => {
    if (state === 1) {
      return _STATE_1;
    }
    if (state === 2) {
      return _STATE_2;
    }
    if (state === 3) {
      return _STATE_3;
    }
    throw new Error();
  });
}
