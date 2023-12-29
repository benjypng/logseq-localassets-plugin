type File = {
  name: string;
  type: string;
  path?: string;
};

async function returnFilePath(
  uuid: string,
  isAsset: boolean,
  emoji: string,
  name: string,
  path: string,
) {
  await logseq.Editor.updateBlock(
    uuid,
    isAsset
      ? `![${emoji} ${name}](../assets/${name})`
      : `![${emoji} ${name}](file://${path})`,
  );
}
export async function embedHelper(uuid: string, isAsset: boolean) {
  const fileInput = document.createElement("input");
  const btn = document.createElement("button");

  fileInput.type = "file";
  fileInput.onchange = async () => {
    const { type, path, name } = fileInput.files![0] as File;
    if (!path) return;

    if (type.startsWith("image")) {
      returnFilePath(uuid, isAsset, "🖼", name, path);
    } else if (type.startsWith("video")) {
      returnFilePath(uuid, isAsset, "📹 ", name, path);
    } else if (type.startsWith("audio")) {
      returnFilePath(uuid, isAsset, "🎧", name, path);
    } else {
      returnFilePath(uuid, isAsset, "📄", name, path);
    }
    await logseq.Editor.exitEditingMode();
  };

  btn.addEventListener("click", () => {
    fileInput.click();
  });
  btn.click();
}

export async function linkToDir(uuid: string) {
  const fileInput = document.createElement("input");
  const btn = document.createElement("button");

  fileInput.type = "file";
  fileInput.setAttribute("webkitdirectory", "");
  fileInput.setAttribute("directory", "");

  fileInput.onchange = async () => {
    //@ts-expect-error
    const { path, name, webkitRelativePath } = fileInput.files![0];
    const blk = await logseq.Editor.getBlock(uuid);
    await logseq.Editor.updateBlock(
      uuid,
      `${blk?.content} [${webkitRelativePath.split("/")[0]}](file://${
        path!.split(name)[0]
      })`,
    );
  };

  btn.addEventListener("click", () => {
    fileInput.click();
  });
  btn.click();
}
