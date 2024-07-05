// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import {
  setGlobalFigureStyle,
  setKeyFonts,
  TIM_FONT_SETS,
} from "@timroberton/panther";

setKeyFonts(TIM_FONT_SETS.RobotoCondensed);
setGlobalFigureStyle({
  scale: 0.7,
  withDataLabels: false,
  text: {
    xTextAxisLabel: {
      font: { key: "main400" },
      relFontSize: 1.2,
    },
  },
  paletteColors: {
    auto: {
      first: "#1D366C",
      last: "rgb(99, 29, 79)",
    },
  },
  xTextAxis: {
    tickHeight: 0,
    tickLabelGap: 8,
    maxVerticalTickLabelHeightAsPctOfChart: 0.8,
  },
  yTextAxis: {
    colGroupBracketPaddingY: 2,
    colGroupGap: 30,
    paddingBottom: 10,
    paddingTop: 10,
  },
  yScaleAxis: {
    tickLabelGap: 5,
  },
  legend: {
    legendColorBoxWidth: 19,
    // legendPointRadius: 10,
    // maxLegendItemsInOneColumn: 1,
    // legendPosition: "bottom-right",
  },
});

mount(() => <StartClient />, document.getElementById("app")!);
