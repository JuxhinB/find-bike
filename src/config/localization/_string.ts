import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";

export interface Strings extends LocalizedStringsMethods {
  PAGES: any;
  STRINGS: any;
  LABELS: any;
  ACTIONS: any;
  MESSAGES: any;
  ERRORS: any;
}

let _string: Strings = new LocalizedStrings({
  en_US: require("./languages/en-US.json"),
  it_IT: require("./languages/it-IT.json"),
});

export default _string;
