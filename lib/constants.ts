export const CLASS_OPTIONS = [
  { label: "Form One", value: "FORM_ONE" },
  { label: "Form Two", value: "FORM_TWO" },
  { label: "Form Three", value: "FORM_THREE" },
  { label: "Form Four", value: "FORM_FOUR" },
  { label: "Form Five", value: "FORM_FIVE" },
  { label: "Form Six", value: "FORM_SIX" },
];

export const GENDER_OPTIONS = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

export const GENDER_FILTER = {
  label: "Gender",
  key: "gender",
  options: GENDER_OPTIONS,
};

export const CLASS_FILTER = {
  label: "Class",
  key: "class",
  options: CLASS_OPTIONS,
};

export const SUBJECT_CATEGORY = [
  { label: "ART", value: "ART" },
  { label: "SCIENCE", value: "SCIENCE" },
];

export const SUBJECT_CATEGORY_FILTER = [
  {
    label: "Category",
    key: "category",
    options: SUBJECT_CATEGORY,
  },
];

export const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

export type Gender = "MALE" | "FEMALE";

export type StudentClassLevel =
  | "FORM_ONE"
  | "FORM_TWO"
  | "FORM_THREE"
  | "FORM_FOUR"
  | "FORM_FIVE"
  | "FORM_SIX";

export type Category = "ART" | "SCIENCE";
