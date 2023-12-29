import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";

export const settings: SettingSchemaDesc[] = [
  {
    key: "intro",
    type: "heading",
    title: "Define Paths",
    description: "",
    default: "",
  },
  {
    key: "macPath",
    type: "string",
    title: "Path for Mac",
    description:
      "Define the path to where your files are stored, e.g. /Users/john/Desktop",
    default: "",
  },
  {
    key: "linuxPath",
    type: "string",
    title: "Path for Linux",
    description:
      "Define the path to where your files are stored, e.g. /Users/john/Desktop",
    default: "",
  },
  {
    key: "windowsPath",
    type: "string",
    title: "Path for Windows",
    description:
      "Define the path to where your files are stored, e.g. C:Desktop",
    default: "",
  },
];
