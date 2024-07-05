export const definitions = {
  domains: [
    {
      label: "Capacity",
      subDomains: [
        {
          label: "Structures",
          indicators: [
            {
              rawValue: "teaminc",
              value: "n_teaminc",
              label:
                "Proportion of operational HWCs  in the district whose primary healthcare teams have received team-based incentives every month in the quarter",
            },
            {
              rawValue: "perinc",
              value: "n_perinc",
              label:
                "Proportion of CHOs in the district who have received performance linked payment incentives every month in the quarter",
            },
            {
              rawValue: "splform",
              value: "n_splform",
              label:
                "Proportion of HWCs in the district reporting in stipulated time for S, P, and L forms in the quarter",
            },
            {
              rawValue: "sdreport",
              value: "n_sdreport",
              label:
                "Proportion of HWCs submitting monthly service delivery report in time every month in the quarter",
            },
          ],
          indexIndicator: {
            value: "structuressub",
            label: "Structures sub-domain score",
          },
        },
        {
          label: "Inputs",
          indicators: [
            {
              rawValue: "mintest",
              value: "n_mintest",
              label:
                "Proportion of HWCs in the district undertaking minimum number of tests (SHC-14 tests, PHC/UPHC- 63 tests) as per free diagnostic services initiative (FDSI) guidelines in the quarter",
            },
            {
              rawValue: "minmed",
              value: "n_minmeds",
              label:
                "Percentage of AB-HWC fulfilling minimum 80% of expanded range of medicines as per Essential list (Medicines: SHC-HWC- 105; PHC-HWC-172) against number of functional AB- HWCs",
            },
          ],
          indexIndicator: {
            value: "inputssub",
            label: "Inputs sub-domain score",
          },
        },
        {
          label: "Community Engagement",
          indicators: [
            {
              rawValue: "jasestb",
              value: "n_jasestb",
              label:
                "Proportion of JAS established in the district as per the state norms",
            },
            {
              rawValue: "jasmtg",
              value: "n_jasmtg",
              label:
                "Proportion of HWCs in the district with monthly JAS meeting held in the quarter",
            },
            {
              rawValue: "cbac",
              value: "n_cbac",
              label:
                "Proportion of HWCs in the district that have completed risk assessment of at least 90% of the target population using CBAC in last year",
            },
            {
              rawValue: "abha",
              value: "n_abha",
              label: "Proportion of district population with an ABHA ID",
            },
          ],
          indexIndicator: {
            value: "communitysub",
            label: "Community engagement sub-domain score",
          },
        },
        {
          label: "Quality Assurance",
          indicators: [
            {
              rawValue: "nqas",
              value: "n_nqas",
              label:
                "Proportion of HWCs in the district with NQAS certificate (state or national) as of last year",
            },
            {
              rawValue: "kayakalp",
              value: "n_kayakalp",
              label:
                "Proportion of HWCs in the district with Kayakalp score of more than 70% (on external assessment) in the last year",
            },
          ],
          indexIndicator: {
            value: "qasub",
            label: "Quality assurance sub-domain score",
          },
        },
      ],
      indexIndicator: { value: "capacity", label: "Capacity domain score" },
    },
    {
      label: "Service Delivery",
      subDomains: [
        {
          label:
            "Family Planning, Reproductive Health, Pregnancy, and Childbirth",
          indicators: [
            {
              rawValue: "anc4",
              value: "n_anc4",
              label:
                "ANC 4- Proportion of women receiving at least 4 ANCs during pregnancy, among those aged 15-49 years with a live birth in the 5 years preceding the survey",
            },
            {
              rawValue: "facilitybirth",
              value: "n_facilitybirth",
              label:
                "Institutional delivery- Proportion of live births to women aged 15-49 years in the 5 years before the survey that occurred in a health facility",
            },
            {
              rawValue: "fpunmet",
              value: "n_c_fpunmet",
              label:
                "Proportion of currently married women aged 15-49 years in the district with an unmet need for family planning",
            },
            {
              rawValue: "fpcounseling",
              value: "n_fpcounseling",
              label:
                "Health worker ever talked to female non-users about family planning (%)",
            },
          ],
          indexIndicator: {
            value: "fpreproductivesub_sd",
            label:
              "Family planning, reproductive health, pregnancy, and childbirth sub-domain score",
          },
        },
        {
          label: "Neonatal, Infant, Child, and Adolescent Health",
          indicators: [
            {
              rawValue: "hbnc",
              value: "n_hbnc",
              label:
                "Home-based newborn care: Proportion of newborns who received HBNC services as per schedule in the quarter",
            },
            {
              rawValue: "breastfed",
              value: "n_breastfed",
              label:
                "Children under age 3 years breastfed within one hour of birth (%)",
            },
            {
              rawValue: "fullimmun",
              value: "n_fullimmun",
              label:
                "Full immunization-: Proportion of children aged 12-23 months in the district who received all 8 basic vaccinations (BCG+ three doses of pentavalent + three doses of OPV + one dose of MRCV), based on information from vaccination card",
            },
          ],
          indexIndicator: {
            value: "neonatalchildsub",
            label:
              "Neonatal, infrant, child, and adolescent health sub-domain score",
          },
        },
        {
          label: "General Outpatient",
          indicators: [
            {
              rawValue: "footfall",
              value: "n_footfall",
              label:
                "Number of monthly footfalls at HWCs in the district per 1000 population in the last quarter",
            },
            {
              rawValue: "teleconsult",
              value: "n_teleconsult",
              label:
                "Number of monthly teleconsultations per 1000 in the last quarter",
            },
          ],
          indexIndicator: {
            value: "opdsub",
            label: "General outpatient sub-domain score",
          },
        },
        {
          label: "NCDs",
          indicators: [
            {
              rawValue: "htnscreen",
              value: "n_htnscreen",
              label:
                "Proportion of individuals of age group 30 years and above screened for hypertension in the quarter",
            },
            {
              rawValue: "oralscreen",
              value: "n_oralscreen",
              label:
                "Proportion of individuals of age group 30 years and above screened for oral cancer in last year",
            },
            {
              rawValue: "cervicalscreen",
              value: "n_cervicalscreen",
              label:
                "Proportion of females of age group 30 years and above screened for cervical cancer in last year",
            },
            {
              rawValue: "dmcontrol",
              value: "n_dmcontrol",
              label:
                "Proportion of registered DM patients in the district with controlled blood sugar levels in past year",
            },
            {
              rawValue: "htncontrol",
              value: "n_htncontrol",
              label:
                "Proportion of registered HTN patients in the district with controlled blood pressure levels in past year",
            },
          ],
          indexIndicator: {
            value: "ncdsub_sd",
            label: "NCDs sub-domain score",
          },
        },
      ],
      indexIndicator: {
        value: "servicedelivery",
        label: "Service delivery domain score",
      },
    },
    {
      label: "Impact",
      subDomains: [
        {
          label: "Reproductive, Maternal, and Child Health",
          indicators: [
            {
              rawValue: "anemia",
              value: "n_c_anemia",
              label:
                "Proportion of non-pregnant women age 15-49 years who are anaemic",
            },
            {
              rawValue: "stunted",
              value: "n_c_stunted",
              label:
                "Proportion of children under five years of age who are stunted (height for age)",
            },
          ],
          indexIndicator: {
            value: "fpreproductivesub_im",
            label: "Reproductive, maternal, and child health sub-domain score",
          },
        },
        {
          label: "Communicable Disease",
          indicators: [
            {
              rawValue: "tbtrt",
              value: "n_tbtrt",
              label:
                "TB treatment success rate-\r\nProportion of total TB notified cases (public + private) with successful treatment outcome (cured + treatment completed) among TB cases notified in the district a year prior to the specific year",
            },
            {
              rawValue: "diarrhea",
              value: "n_c_diarrhea",
              label:
                "Prevalence of diarrhea in the 2 weeks preceding the survey (%)",
            },
            {
              rawValue: "ari",
              value: "n_c_ari",
              label:
                "Prevalence of symptoms of acute respiratory infection (ARI) in the 2 weeks preceding the survey (%)",
            },
          ],
          indexIndicator: {
            value: "communicablesub",
            label: "Communicable disease sub-domain score",
          },
        },
        {
          label: "NCDs",
          indicators: [
            {
              rawValue: "htnf",
              value: "n_c_htnf",
              label:
                "Proportion of women aged 15 years and over, with elevated blood pressure (Systolic ≥140 mm of Hg and/or Diastolic ≥90 mm of Hg) or taking medicine to control blood pressure",
            },
            {
              rawValue: "htnm",
              value: "n_c_htnm",
              label:
                "Proportion of men aged 15 years and over, with elevated blood pressure (Systolic ≥140 mm of Hg and/or Diastolic ≥90 mm of Hg) or taking medicine to control blood pressure",
            },
            {
              rawValue: "dmf",
              value: "n_c_dmf",
              label:
                "Proportion of women aged 15 years and over, with high or very high random blood glucose levels (>140 mg/dl) or taking medicine to control blood glucose",
            },
            {
              rawValue: "dmm",
              value: "n_c_dmm",
              label:
                "Proportion of men aged 15 years and over, with high or very high random blood glucose levels (>140 mg/dl) or taking medicine to control blood glucose",
            },
          ],
          indexIndicator: {
            value: "ncdsub_im",
            label: "NCDs sub-domain score",
          },
        },
      ],
      indexIndicator: { value: "impact", label: "Impact domain score" },
    },
  ],
  indexIndicator: { value: "cphcindex", label: "CPHC index score" },
};
