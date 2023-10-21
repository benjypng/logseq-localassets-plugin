import "@logseq/libs";
import { embedHelper, linkToDir } from "./utils/embedHelper";

const main = async () => {
  console.log("logseq-localassets-plugin loaded");

  logseq.Editor.registerSlashCommand(
    "Embed file from asset folder",
    async function (e) {
      embedHelper(e.uuid, true);
    },
  );

  logseq.Editor.registerSlashCommand(
    "Embed file from other folder",
    async function (e) {
      embedHelper(e.uuid, false);
    },
  );

  logseq.Editor.registerSlashCommand(
    "Create link to folder",
    async function (e) {
      linkToDir(e.uuid);
    },
  );

  logseq.Editor.registerSlashCommand("Render local asset", async (e) => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :localasset_${e.uuid}}}`,
    );
  });
  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    const { uuid } = payload;
    const [type] = payload.arguments;
    if (!type) return;
    if (!type.startsWith(":localasset")) return;

    const path_one = `/Users/ben/Desktop`;

    logseq.provideUI({
      key: `localasset_${uuid}`,
      slot,
      reset: true,
      template: `<img src="file://${path_one}/pic.png" />`,
    });
  });
};

logseq.ready(main).catch(console.error);
