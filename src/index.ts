import "@logseq/libs";
import embedHelper from "./utils/embedHelper";

const main = async () => {
  console.log("logseq-localassets-plugin loaded");

  logseq.Editor.registerSlashCommand(
    "Embed file from asset folder",
    async function (e) {
      console.log(e);
      embedHelper(e.uuid, "asset");
    }
  );

  logseq.Editor.registerSlashCommand(
    "Embed file from other folder",
    async function (e) {
      embedHelper(e.uuid, "non-asset");
    }
  );
};

logseq.ready(main).catch(console.error);
