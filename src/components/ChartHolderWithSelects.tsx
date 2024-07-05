import { TimChartInputs } from "@timroberton/panther";
import { Show } from "solid-js";
import {
  _STATE_OPTIONS,
  selectedState,
  setSelectedState,
  setShowSubElements,
  setSortByIndex,
  showSubElements,
  sortByIndex,
} from "~/state/ui_selection";
import { ChartHolderFixedHeight, Checkbox, Select } from "~/ui";

type Props = {
  chartInputs: TimChartInputs;
  domH: number;
  caption?: string;
  sortBy?: string;
  showSubElements?: string;
};

export function ChartHolderWithSelects(p: Props) {
  return (
    <div class="">
      <Show when={p.caption} keyed>
        {(keyedCaption) => {
          return (
            <div class="pb-3 text-2xl font-700 leading-7">{keyedCaption}</div>
          );
        }}
      </Show>
      <div class="ui-gap flex items-end pb-4">
        <Select
          label="State"
          options={_STATE_OPTIONS}
          value={selectedState()}
          onChange={setSelectedState}
        />
        <Show when={p.sortBy} keyed>
          {(keyedSortBy) => {
            return (
              <Checkbox
                label={`Sort by ${keyedSortBy}`}
                checked={sortByIndex()}
                onChange={setSortByIndex}
              />
            );
          }}
        </Show>
        <Show when={p.showSubElements} keyed>
          {(keyedShowSubElementsy) => {
            return (
              <Checkbox
                label={`Show ${keyedShowSubElementsy}`}
                checked={showSubElements()}
                onChange={setShowSubElements}
              />
            );
          }}
        </Show>
      </div>
      <ChartHolderFixedHeight chartInputs={p.chartInputs} domH={p.domH} />
    </div>
  );
}
