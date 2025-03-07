import * as v from "valibot";

const lang = "en";
v.setGlobalConfig({ lang });

v.setSpecificMessage(v.nonEmpty, "this field is required", lang);
