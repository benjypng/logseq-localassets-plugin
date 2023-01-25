interface Files {
  name: string;
  type: string;
  path?: string;
}

async function returnFilePath(
  uuid: string,
  isAsset: boolean,
  emoji: any,
  name: string,
  path: string
) {
  await logseq.Editor.updateBlock(
    uuid,
    isAsset
      ? `![${emoji} ${name}](../assets/${name})`
      : `![${emoji} ${name}](file://${path})`
  );
}

export async function embedHelper(uuid: string, isAsset: boolean) {
  const fileInput = document.createElement("input");
  const btn = document.createElement("button");

  fileInput.type = "file";
  fileInput.onchange = async () => {
    const { type, path, name }: Files = fileInput.files![0];

    if (type.startsWith("image")) {
      returnFilePath(uuid, isAsset, "🖼", name, path as string);
    } else if (type.startsWith("video")) {
      returnFilePath(uuid, isAsset, "📹 ", name, path as string);
    } else if (type.startsWith("audio")) {
      returnFilePath(uuid, isAsset, "🎧", name, path as string);
    } else {
      returnFilePath(uuid, isAsset, "📄", name, path as string);
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
    await logseq.Editor.updateBlock(
      uuid,
      `[${webkitRelativePath.split("/")[0]}](file://${path!.split(name)[0]})`
    );
  };

  btn.addEventListener("click", () => {
    fileInput.click();
  });
  btn.click();
}
