interface Files {
  name: string;
  type: string;
  path?: string;
}

export const nonAssetFiles = () => {
  logseq.Editor.registerSlashCommand("Embed non-asset file", async () => {
    const currBlk = await logseq.Editor.getCurrentBlock();
    const uuid = currBlk.uuid;

    const fileInput = document.createElement("input");
    const btn = document.createElement("button");
    fileInput.type = "file";
    fileInput.onchange = async (e) => {
      const { type, path, name }: Files = (<HTMLInputElement>e.target).files[0];

      if (
        type === "application/pdf" ||
        type === "image/png" ||
        type === "image/tiff" ||
        type === "image/bmp" ||
        type === "image/gif" ||
        type === "image/jpeg"
      ) {
        await logseq.Editor.updateBlock(uuid, `![${name}](${path})`);
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
        await logseq.Editor.updateBlock(uuid, `[📄 ${name}](${path})`);
      }
      await logseq.Editor.exitEditingMode();
    };
    btn.addEventListener("click", () => {
      fileInput.click();
    });
    btn.click();
  });
};
