import { createSignal } from "solid-js";
import { definitions } from "~/consts/definitions";
import { _STATE_1, _STATE_2, _STATE_3 } from "~/key_colors";
import { PointStyle, assertNotUndefined } from "@timroberton/panther";
import { SelectOption } from "~/ui";

export const _TABS: SelectOption<string>[] = [
  { value: "about", label: "About" },
  { value: "cphc-index", label: "CPHC index" },
  { value: "domain", label: "Domain" },
  { value: "subdomain", label: "Sub-domain" },
  { value: "indicator", label: "Indicator" },
];

export const [selectedTab, setSelectedTab] = createSignal<string>("about");
export const [selectedState, setSelectedState] = createSignal<string>("all");

export const [sortByIndex, setSortByIndex] = createSignal<boolean>(true);
export const [showSubElements, setShowSubElements] =
  createSignal<boolean>(false);

export type Domain = {
  label: string;
  subDomains: SubDomain[];
  indexIndicator: Indicator;
};

export type SubDomain = {
  label: string;
  indicators: RawIndicator[];
  indexIndicator: Indicator;
};

export type Indicator = {
  value: string;
  label: string;
};

export type RawIndicator = {
  rawValue: string;
  value: string;
  label: string;
};

export const _STATE_OPTIONS: SelectOption<string>[] = [
  { value: "all", label: "All states" },
  { value: "1", label: "Gujarat" },
  { value: "2", label: "Odisha" },
  { value: "3", label: "Meghalaya" },
];

export const _STATE_LEGEND_ITEMS = [
  { color: _STATE_1, label: "Gujarat", pointStyle: "as-block" as PointStyle },
  { color: _STATE_2, label: "Odisha", pointStyle: "as-block" as PointStyle },
  { color: _STATE_3, label: "Meghalaya", pointStyle: "as-block" as PointStyle },
];

const [selectedDomain, setSelectedDomain] = createSignal<string | undefined>(
  undefined,
);
const [selectedDomainFull, setSelectedDomainFull] = createSignal<
  Domain | undefined
>(undefined);

export const _DOMAIN_OPTIONS: SelectOption<string>[] = definitions.domains.map(
  (d) => {
    return {
      label: d.label,
      value: d.label,
    };
  },
);

const [selectedSubDomain, setSelectedSubDomain] = createSignal<
  string | undefined
>(undefined);
const [selectedSubDomainFull, setSelectedSubDomainFull] = createSignal<
  SubDomain | undefined
>(undefined);

export function getSubDomainOptions(): SelectOption<string>[] {
  const domainId = selectedDomain();
  return (
    definitions.domains
      .find((d) => d.label === domainId)
      ?.subDomains.map((d) => {
        return {
          label: d.label,
          value: d.label,
        };
      }) ?? []
  );
}

const [selectedIndicator, setSelectedIndicator] = createSignal<
  string | undefined
>(undefined);
const [selectedIndicatorFull, setSelectedIndicatorFull] = createSignal<
  RawIndicator | undefined
>(undefined);

export function getIndicatorOptions(): SelectOption<string>[] {
  const domainId = selectedDomain();
  const subDomainId = selectedSubDomain();
  return (
    definitions.domains
      .find((d) => d.label === domainId)
      ?.subDomains.find((d) => d.label === subDomainId)?.indicators ?? []
  );
}

export {
  selectedDomain,
  selectedDomainFull,
  selectedIndicator,
  selectedIndicatorFull,
  selectedSubDomain,
  selectedSubDomainFull,
};

export function updateDomain(domainId: string) {
  if (domainId === selectedDomain()) {
    return;
  }
  const domain = definitions.domains.find((d) => d.label === domainId);
  assertNotUndefined(domain);
  setSelectedDomain(domain.label);
  setSelectedDomainFull(domain);
  const subDomain = domain.subDomains.at(0);
  assertNotUndefined(subDomain);
  setSelectedSubDomain(subDomain.label);
  setSelectedSubDomainFull(subDomain);
  const indicator = subDomain.indicators.at(0);
  assertNotUndefined(indicator);
  setSelectedIndicator(indicator.value);
  setSelectedIndicatorFull(indicator);
}

export function updateSubDomain(subDomainId: string) {
  const subDomain = definitions.domains
    .find((d) => d.label === selectedDomain())
    ?.subDomains.find((sd) => sd.label === subDomainId);
  assertNotUndefined(subDomain);
  setSelectedSubDomain(subDomain.label);
  setSelectedSubDomainFull(subDomain);
  const indicator = subDomain.indicators.at(0);
  assertNotUndefined(indicator);
  setSelectedIndicator(indicator.value);
  setSelectedIndicatorFull(indicator);
}

export function updateIndicator(indicatorId: string) {
  const indicator = definitions.domains
    .find((d) => d.label === selectedDomain())
    ?.subDomains.find((sd) => sd.label === selectedSubDomain())
    ?.indicators.find((ind) => ind.value === indicatorId);
  assertNotUndefined(indicator);
  setSelectedIndicator(indicator?.value);
  setSelectedIndicatorFull(indicator);
}

updateDomain(definitions.domains.at(0)!.label);
// export const [selectedDistrictId, setSelectedDistrictId] = createSignal<
//   string | undefined
// >(undefined);
// export const [selectedBlockId, setSelectedBlockId] = createSignal<
//   string | undefined
// >(undefined);
// export const [selectedFacilityId, setSelectedFacilityId] = createSignal<
//   string | undefined
// >(undefined);

// export const districtFull = () => {
//   const districtId = selectedDistrictId();
//   if (!districtId) return undefined;
//   return data()?.dbf.districtMap[districtId];
// };
// export const blockFull = () => {
//   const districtId = selectedDistrictId();
//   if (!districtId) return undefined;
//   const blockId = selectedBlockId();
//   if (!blockId) return undefined;
//   return data()?.dbf.districtMap[districtId]?.blockMap[blockId];
// };
// export const facilityFull = () => {
//   const districtId = selectedDistrictId();
//   if (!districtId) return undefined;
//   const blockId = selectedBlockId();
//   if (!blockId) return undefined;
//   const facilityId = selectedFacilityId();
//   if (!facilityId) return undefined;
//   return data()?.dbf.districtMap[districtId]?.blockMap[blockId]?.facilityMap[
//     facilityId
//   ];
// };

// export function updateDistrict(districtId: string, dbf: DistrictBlockFacility) {
//   setSelectedDistrictId(districtId);
//   const blockId = dbf.districtMap[districtId].blocks.at(0)!;
//   setSelectedBlockId(blockId);
//   setSelectedFacilityTypeId(_ALL_FACILITY_TYPES);
//   const facilityId =
//     dbf.districtMap[districtId].blockMap[blockId].facilities.at(0)!;
//   setSelectedFacilityId(facilityId);
// }

// export function updateBlock(
//   districtId: string,
//   blockId: string,
//   dbf: DistrictBlockFacility,
// ) {
//   setSelectedBlockId(blockId);
//   setSelectedFacilityTypeId(_ALL_FACILITY_TYPES);
//   const facilityId =
//     dbf.districtMap[districtId].blockMap[blockId].facilities.at(0)!;
//   setSelectedFacilityId(facilityId);
// }

// export function updateFacilityType(
//   districtId: string,
//   blockId: string,
//   facilityTypeId: string,
//   dbf: DistrictBlockFacility,
// ) {
//   setSelectedFacilityTypeId(facilityTypeId);
//   const facilities = getSelectOptionsFacilities(
//     dbf,
//     districtId,
//     blockId,
//     facilityTypeId,
//   );
//   setSelectedFacilityId(facilities.at(0)?.key ?? "Unknown");
// }

// ///////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////

// export const [selectedQuarterId, setSelectedQuarterId] =
//   createSignal<string>(_DEFAULT_QUARTER_ID);

// export const [selectedFacilityTypeId, setSelectedFacilityTypeId] =
//   createSignal<string>(_DEFAULT_FACILITY_TYPE_ID);

// export const [selectedIndicatorId, setSelectedIndicatorId] =
//   createSignal<string>(_DEFAULT_INDICATOR_ID);

// export const [selectedIndFacId, setSelectedIndFacId] = createSignal<string>(
//   _DEFAULT_INDICATOR_ID_FACILITY_ONLY,
// );

// export const selectedQuarterLabel = () =>
//   _QUARTERS_LABEL_MAP[selectedQuarterId()];
