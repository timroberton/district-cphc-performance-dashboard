import { Color, Csv, TimChartInputs, getColor } from "@timroberton/panther";
import { createMemo } from "solid-js";
import {
  Domain,
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
  domain: Domain;
};

export function Dash2Domain(p: Props) {
  const c1 = createMemo<TimChartInputs>(() => {
    const state = selectedState();
    const isSorted = sortByIndex();
    const csvC1 = p.csv
      .getSelectedRows((row) => {
        return state === "all" || row[0] === state;
      })
      .getNumbers()
      .getSelectedCols([p.domain.indexIndicator.value, "state"])
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
        scaleAxisLabel: "Domain score",
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
              p.domain.indexIndicator.value,
              ...p.domain.subDomains.map((d) => d.indexIndicator.value),
            ]
          : [p.domain.indexIndicator.value],
      )
      .getSortedRowsByCol(p.domain.indexIndicator.value)
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
        p.domain.indexIndicator,
        ...p.domain.subDomains.map((d) => d.indexIndicator),
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
        scaleAxisLabel: showSubElements() ? undefined : "Domain score",
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
        horizontal: true,
        legend: {
          maxLegendItemsInOneColumn: !showSubElements() ? 1 : [3, 99],
        },
      },
    };
  });

  return (
    <div class="ui-pad h-full w-full space-y-12 overflow-y-auto">
      <ChartHolderWithSelects
        caption={`${p.domain.indexIndicator.label}, by district`}
        chartInputs={c1()}
        domH={500}
        sortBy="domain score"
      />
      <ChartHolderWithSelects
        caption={`${p.domain.indexIndicator.label}, highest and lowest districts`}
        chartInputs={c2()}
        domH={500}
        showSubElements="sub-domain scores"
      />
    </div>
  );
}
