import "@logseq/libs";
import { renderEmbedAsset } from "./renderEmbedAsset";

const id = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

const main = () => {
    logseq.Editor.registerSlashCommand("Embed local file", async () => {
        const currBlk = await logseq.Editor.getCurrentBlock();
        const uuid = currBlk.uuid;

        const fileInput = document.createElement("input");
        const btn = document.createElement("button");
        fileInput.type = "file";
        fileInput.onchange = async (e) => {
            const { type, path } = (<HTMLInputElement>e.target).files[0];

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
        btn.addEventListener("click", () => {
            fileInput.click();
        });
        btn.click();
    });
    // Handle inline PDF using         `<object data="${pathToLogseq}/${fileName}" type="application/pdf" width="100%" height="800px"></object>`
};

logseq.ready(main).catch(console.error);
