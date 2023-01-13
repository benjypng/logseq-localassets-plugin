import "@logseq/libs";
import { embedHelper, linkToDir } from "./utils/embedHelper";

const main = async () => {
  console.log("logseq-localassets-plugin loaded");

  logseq.Editor.registerSlashCommand(
    "Embed file from asset folder",
    async function (e) {
      embedHelper(e.uuid, true);
    }
  );

  logseq.Editor.registerSlashCommand(
    "Embed file from other folder",
    async function (e) {
      embedHelper(e.uuid, false);
    }
  );

  logseq.Editor.registerSlashCommand(
    "Create link to folder",
    async function (e) {
      linkToDir(e.uuid);
    }
  );
};

logseq.ready(main).catch(console.error);
