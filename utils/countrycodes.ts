const printC = (string: string) => {
  const codes = string.match(/.{1,2}/g);
  console.log(codes);
  const codeIndex = codes?.findIndex((code) => code === "us");
  console.log(codeIndex);
};

printC(
  "aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza"
);
