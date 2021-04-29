import { countries } from "../data/countries";

const printC = (string: string) => {
  const codes = string.match(/.{1,2}/g);
  console.log(codes);
  const codeIndex = codes?.findIndex((code) => code === "us");
  console.log(codeIndex);
};

const printO = (codes: string[]) => {
  const countryObj = codes.map((code) => ({
    name: countries.find((co) => co.code === code.toUpperCase())?.name,
    code,
  }));
  console.log(countryObj);
};

// printC(
//   "aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza"
// );

printO([
  "ae",
  "ar",
  "at",
  "au",
  "be",
  "bg",
  "br",
  "ca",
  "ch",
  "cn",
  "co",
  "cu",
  "cz",
  "de",
  "eg",
  "fr",
  "gb",
  "gr",
  "hk",
  "hu",
  "id",
  "ie",
  "il",
  "in",
  "it",
  "jp",
  "kr",
  "lt",
  "lv",
  "ma",
  "mx",
  "my",
  "ng",
  "nl",
  "no",
  "nz",
  "ph",
  "pl",
  "pt",
  "ro",
  "rs",
  "ru",
  "sa",
  "se",
  "sg",
  "si",
  "sk",
  "th",
  "tr",
  "tw",
  "ua",
  "us",
  "ve",
  "za",
]);
