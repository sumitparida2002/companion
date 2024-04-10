"use server";

import { parse } from "path";

export async function getCompanions() {
  const COMPFILE = "./companions/companions.json";
  var companions = [];
  var fs = require("fs");
  const data = fs.readFileSync(COMPFILE);
  console.log(String(data));

  var js = JSON.parse(String(data));
  return String(data);
}
