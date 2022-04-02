import "@logseq/libs";

const id = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "");

interface Files {
  type: string;
  path?: string;
}

const main = () => {
  console.log("logseq-localassets-plugin loaded");

  const handleFile = async (e, uuid) => {
    const { type, path }: Files = (<HTMLInputElement>e.target).files[0];

    if (
      type === "application/pdf" ||
      type === "image/png" ||
      type === "image/tiff" ||
      type === "image/bmp" ||
      type === "image/gif" ||
      type === "image/jpeg"
    ) {
      await logseq.Editor.updateBlock(uuid, `![${id}](${path})`);
    } else if (type === "audio/mpeg") {
      await logseq.Editor.updateBlock(
        uuid,
        `[:audio {:controls true :src "${path}"}]`
      );
    } else if (type === "video/mpeg" || type === "video/mp4") {
      await logseq.Editor.updateBlock(
        uuid,
        `[:video {:controls true :src "${path}"}]`
      );
    } else {
      await logseq.Editor.updateBlock(uuid, `[📄 ${id}](${path})`);
    }
    await logseq.Editor.exitEditingMode();
  };

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "theFile";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);
  logseq.provideModel({
    async embedLocalAsset() {
      //const currBlk = await logseq.Editor.getCurrentBlock();
      // const uuid = currBlk.uuid;
      //     fileInput.onchange = async (e) => {};
      var elem = document.getElementById("theFile");
      if (elem && document.createEvent) {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        elem.dispatchEvent(evt);
      }
    },
  });

  // Register UI
  logseq.App.registerUIItem("toolbar", {
    key: "logseq-localassets-plugin",
    template: `<label for="theFile2"><i class="ti ti-file-symlink"></i></label><input id="theFile2" type="file" hidden />`,
  });
};

logseq.ready(main).catch(console.error);
