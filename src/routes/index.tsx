import { For, Match, Show, Switch } from "solid-js";
import { About } from "~/components/about";
import { Dash1ChphIndex } from "~/components/dash-1-cphc-index";
import { Dash2Domain } from "~/components/dash-2-domain";
import { Dash3SubDomain } from "~/components/dash-3-subdomain";
import { Dash4Indicator } from "~/components/dash-4-indicator";
import { Data, data } from "~/state/data";
import { FrameSideOrTop_Md, FrameSideOrTop_Xl, FrameTop, Select } from "~/ui";
import {
  _DOMAIN_OPTIONS,
  _TABS,
  getIndicatorOptions,
  getSubDomainOptions,
  selectedDomain,
  selectedDomainFull,
  selectedIndicator,
  selectedIndicatorFull,
  selectedSubDomain,
  selectedSubDomainFull,
  selectedTab,
  setSelectedTab,
  updateDomain,
  updateIndicator,
  updateSubDomain,
} from "../state/ui_selection";

export default function Home() {
  return (
    <Show
      when={data()}
      keyed
      fallback={<div class="ui-pad">Loading data...</div>}
    >
      {(data) => {
        return <HomeWithData data={data} />;
      }}
    </Show>
  );
}

type HomeWithDataProps = {
  data: Data;
};

function HomeWithData(p: HomeWithDataProps) {
  return (
    <FrameTop
      panelChildren={
        <div class="flex w-full flex-none items-center gap-4 border-b bg-white px-6 py-4 text-xl font-700 text-base-content">
          <div class="flex-1 text-3xl">District CPHC Performance Dashboard</div>
          <div class="flex flex-none items-center gap-4">
            <img src="/images/logo_text.jpeg" alt="IPSI logo" class="h-8" />
            <img src="/images/logo_full.jpeg" alt="IPSI logo" class="h-10" />
          </div>
        </div>
      }
    >
      <FrameSideOrTop_Md
        panelChildren={
          <div class="flex h-auto w-full items-center space-x-4 overflow-auto border-b bg-base-200 px-4 py-4 md:block md:h-full md:w-auto md:space-x-0 md:space-y-2 md:border-b-0 md:border-r">
            <For each={_TABS}>
              {(tab) => {
                return (
                  <div
                    class="flex-1 cursor-pointer select-none rounded-full px-5 py-2 text-center text-lg hover:bg-base-300 data-[selected=true]:bg-base-300 md:text-left"
                    onClick={() => setSelectedTab(tab.value)}
                    data-selected={selectedTab() === tab.value}
                  >
                    {tab.label}
                  </div>
                );
              }}
            </For>
          </div>
        }
      >
        <FrameSideOrTop_Xl
          panelChildren={
            selectedTab() === "about" ||
            selectedTab() === "cphc-index" ? undefined : (
              <div class="ui-pad ui-gap flex h-full flex-row overflow-auto border-b border-r-0 xl:flex-col xl:border-b-0 xl:border-r">
                <Select
                  label="Domain"
                  options={_DOMAIN_OPTIONS}
                  value={selectedDomain()}
                  onChange={updateDomain}
                />
                <Show
                  when={
                    selectedTab() === "subdomain" ||
                    selectedTab() === "indicator"
                  }
                >
                  <>
                    <Select
                      label="Sub-domain"
                      options={getSubDomainOptions()}
                      value={selectedSubDomain()}
                      onChange={updateSubDomain}
                    />
                    <Show when={selectedTab() === "indicator"}>
                      <Select
                        label="Indicator"
                        options={getIndicatorOptions()}
                        value={selectedIndicator()}
                        onChange={updateIndicator}
                      />
                    </Show>
                  </>
                </Show>
              </div>
            )
          }
        >
          <Switch fallback={<div class="ui-pad">Bad tab</div>}>
            <Match when={selectedTab() === "about"} keyed>
              <About />
            </Match>
            <Match when={selectedTab() === "cphc-index"} keyed>
              <Dash1ChphIndex csv={p.data.csv} />
            </Match>
            <Match
              when={selectedTab() === "domain" && selectedDomainFull()}
              keyed
            >
              {(keyedDomain) => (
                <Dash2Domain csv={p.data.csv} domain={keyedDomain} />
              )}
            </Match>
            <Match
              when={selectedTab() === "subdomain" && selectedSubDomainFull()}
              keyed
            >
              {(keyedSubDomain) => (
                <Dash3SubDomain csv={p.data.csv} subDomain={keyedSubDomain} />
              )}
            </Match>
            <Match
              when={selectedTab() === "indicator" && selectedIndicatorFull()}
              keyed
            >
              {(keyedIndicator) => (
                <Dash4Indicator csv={p.data.csv} indicator={keyedIndicator} />
              )}
            </Match>
          </Switch>
        </FrameSideOrTop_Xl>
      </FrameSideOrTop_Md>
    </FrameTop>
  );
}
