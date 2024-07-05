import { Color, Csv, TimChartInputs, getColor } from "@timroberton/panther";
import { createMemo } from "solid-js";
import { definitions } from "~/consts/definitions";
import {
  _STATE_LEGEND_ITEMS,
  selectedState,
  showSubElements,
  sortByIndex,
} from "~/state/ui_selection";
import {
  getStateColors,
  makeLabelReplacments,
} from "~/util_funcs/label_replacements";
import { ChartHolderWithSelects } from "./ChartHolderWithSelects";

type Props = {
  csv: Csv<string>;
};

export function Dash1ChphIndex(p: Props) {
  const c1 = createMemo<TimChartInputs>(() => {
    const state = selectedState();
    const isSorted = sortByIndex();
    const csvC1 = p.csv
      .getSelectedRows((row) => {
        return state === "all" || row[0] === state;
      })
      .getNumbers()
      .getSelectedCols([definitions.indexIndicator.value, "state"])
      .getSortedRowsByCol(isSorted ? 1 : undefined);
    const specific = getStateColors(
      csvC1.getRowsAsMappedArray((row) => row[1]),
    );
    return {
      chartType: "bar",
      chartData: {
        csv: csvC1,
        colNumbersOrHeadersToTake: [1],
        transpose: true,
        legendItems: state === "all" ? _STATE_LEGEND_ITEMS : undefined,
        scaleAxisLabel: "CPHC index score",
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
      },
    };
  });
  const c2 = createMemo<TimChartInputs>(() => {
    const state = selectedState();
    const csv = p.csv
      .getSelectedRows((row) => {
        return state === "all" || row[0] === state;
      })
      .getNumbers();
    const nRows = csv.nRows();
    const csvC2 = csv
      .getSelectedCols(
        showSubElements()
          ? [
              definitions.indexIndicator.value,
              ...definitions.domains.map((d) => d.indexIndicator.value),
            ]
          : [definitions.indexIndicator.value],
      )
      .getSortedRowsByCol(definitions.indexIndicator.value)
      .getSelectedRows([
        1,
        2,
        3,
        4,
        5,
        nRows - 4,
        nRows - 3,
        nRows - 2,
        nRows - 1,
        nRows,
      ]);

    const colors = getStateColors(
      csv
        .getSelectedRows(csvC2.rowHeadersOrThrowIfNone())
        .getRowsAsMappedArray((row) => row[0]),
    );

    const labelReplacements = () => {
      return makeLabelReplacments([
        definitions.indexIndicator,
        ...definitions.domains.map((d) => d.indexIndicator),
      ]);
    };
    return {
      chartType: "point",
      chartData: {
        csv: csvC2,
        transpose: true,
        colGroups: [
          { label: "Highest", colNumbers: [1, 2, 3, 4, 5] },
          { label: "Lowest", colNumbers: [6, 7, 8, 9, 10] },
        ],
        labelReplacements: labelReplacements(),
        scaleAxisLabel: showSubElements() ? undefined : "CPHC index score",
        legendItems: state === "all" ? _STATE_LEGEND_ITEMS : undefined,
      },
      chartStyle: {
        legendItemsSource:
          state !== "all"
            ? "default"
            : showSubElements()
              ? "both-legend-items-first"
              : "only-legend-items",
        paletteColors: {
          logic: "func",
          func:
            state === "all"
              ? (i_row, i_col) => {
                  if (i_col === -1) {
                    return { key: "baseContent" };
                  }
                  if (i_row === 0) {
                    return colors[i_col];
                  }
                  return new Color(getColor(colors[i_col])).lighten(0.4).css();
                }
              : (i_row, i_col) => {
                  if (i_row === 0) {
                    return colors[i_col] ?? colors[0];
                  }
                  return new Color(getColor(colors[i_col] ?? colors[0]))
                    .lighten(0.4)
                    .css();
                },
        },
        xScaleAxis: {
          max: 1,
        },
        legend: {
          maxLegendItemsInOneColumn: !showSubElements() ? 1 : [3, 99],
        },
        horizontal: true,
      },
    };
  });

  return (
    <div class="ui-pad h-full w-full space-y-12 overflow-y-auto">
      <ChartHolderWithSelects
        caption="CPHC index, by district"
        chartInputs={c1()}
        domH={500}
        sortBy="CPHC index"
      />
      <ChartHolderWithSelects
        caption="CPHC index, highest and lowest districts"
        chartInputs={c2()}
        domH={500}
        showSubElements="domain scores"
      />
    </div>
  );
}
