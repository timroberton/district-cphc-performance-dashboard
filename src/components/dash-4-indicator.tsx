import { Csv, TimChartInputs, toNum1, toNum2 } from "@timroberton/panther";
import { createMemo } from "solid-js";
import {
  RawIndicator,
  _STATE_LEGEND_ITEMS,
  selectedState,
  sortByIndex,
} from "~/state/ui_selection";
import { getStateColors } from "~/util_funcs/label_replacements";
import { ChartHolderWithSelects } from "./ChartHolderWithSelects";

type Props = {
  csv: Csv<string>;
  indicator: RawIndicator;
};

export function Dash4Indicator(p: Props) {
  const c1 = createMemo<TimChartInputs>(() => {
    const state = selectedState();
    const isSorted = sortByIndex();
    const csv = p.csv
      .getSelectedRows((row) => {
        return state === "all" || row[0] === state;
      })
      .getNumbers()
      .getSelectedCols([p.indicator.rawValue, "state"])
      .getSortedRowsByCol(isSorted ? 1 : undefined);
    // .getMappedRows((row) => [row[0] / 100, row[1]]);
    const specific = getStateColors(csv.getRowsAsMappedArray((row) => row[1]));
    return {
      chartType: "bar",
      chartData: {
        csv,
        colNumbersOrHeadersToTake: [1],
        transpose: true,
        legendItems: state === "all" ? _STATE_LEGEND_ITEMS : undefined,
        scaleAxisLabel: "Indicator score",
      },
      chartStyle: {
        paletteColors: {
          logic: "specific-by-col",
          specific,
        },
        legend: {
          maxLegendItemsInOneColumn: 1,
        },
        text: {
          xTextAxisTickLabels: {
            relFontSize: state === "all" ? 0.82 : 1,
          },
        },
        yScaleAxis: {
          tickLabelFormatter:
            p.indicator.rawValue === "footfall" ||
            p.indicator.rawValue === "teleconsult"
              ? toNum2
              : toNum1,
        },
      },
    };
  });

  const cleanInd = () => {
    const len = p.indicator.label.length;
    if (p.indicator.label[len - 1] === ".") {
      return p.indicator.label.slice(0, len - 1) + ", by district";
    }
    return p.indicator.label + ", by district";
  };

  return (
    <div class="ui-pad h-full w-full space-y-12 overflow-y-auto">
      <ChartHolderWithSelects
        caption={cleanInd()}
        chartInputs={c1()}
        domH={500}
        sortBy="indicator score"
      />
    </div>
  );
}
