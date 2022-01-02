import '@logseq/libs';

const main = async () => {
  // Set path in settings for adding images to kanban board
  const currGraph = await logseq.App.getCurrentGraph();
  const pathToLogseq = `${currGraph.path}/assets`;

  // Insert renderer upon slash command
  logseq.Editor.registerSlashCommand('local audio', async () => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :localaudio, }}`);
  });

  logseq.Editor.registerSlashCommand('local video', async () => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :localvideo, }}`);
  });

  logseq.Editor.registerSlashCommand('local pdf - inline', async () => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :localpdfinline, }}`);
  });

  logseq.Editor.registerSlashCommand('local pdf', async () => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :localpdf, }}`);
  });

  logseq.Editor.registerSlashCommand('local image', async () => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :localimage, }}`);
  });

  logseq.Editor.registerSlashCommand('local docs', async () => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :localdocs, }}`);
  });

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    const [type, fileName] = payload.arguments;

    if (
      !type === ':localaudio' ||
      !type === ':localvideo' ||
      !type === ':localpdf' ||
      !type === ':localpdfinline' ||
      !type === ':localimage' ||
      !type === ':localdocs'
    )
      return;

    if (type === ':localaudio') {
      await logseq.Editor.updateBlock(
        payload.uuid,
        `[:audio {:controls true :src "${pathToLogseq}/${fileName}"}]`
      );
    } else if (type === ':localvideo') {
      await logseq.Editor.updateBlock(
        payload.uuid,
        `[:video {:controls true :src "${pathToLogseq}/${fileName}"}]`
      );
    } else if (type === ':localpdfinline') {
      await logseq.Editor.updateBlock(
        payload.uuid,
        `<object data="${pathToLogseq}/${fileName}" type="application/pdf" width="100%" height="800px"></object>`
      );
    } else if (
      type === ':localimage' ||
      type === ':localdocs' ||
      type === ':localpdf'
    ) {
      await logseq.Editor.updateBlock(
        payload.uuid,
        `![${fileName}](${pathToLogseq}/${fileName}})`
      );
    }
  });
};

logseq.ready(main).catch(console.error);
