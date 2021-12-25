const { opendir, readFile } = require("fs/promises");
const { existsSync } = require("fs");
const { v4: uuid } = require("uuid");

const constructorFile = (metadata, file, path) => ({
  id: uuid(),
  name: file,
  url: path,
  title: metadata?.title || file,
  description: metadata?.description,
  imageViews: metadata?.imageViews,
  creationTime: metadata
    ? new Date(metadata.creationTime.timestamp * 1e3)
    : undefined,
  createdAt: metadata
    ? new Date(metadata.photoTakenTime.timestamp * 1e3)
    : new Date(),
  deviceFolder: metadata
    ? metadata.googlePhotosOrigin.mobileUpload.deviceFolder.localFolderName
    : undefined,
  updatedAt: metadata
    ? new Date(metadata.photoLastModifiedTime.timestamp * 1e3)
    : new Date(),
});

const scanFiles = async (path = process.env.photo_folder) => {
  let listFiles = [];
  const dir = await opendir(path);
  for await (const atual of dir) {
    const full_path = `${path}/${atual.name}`;
    if (["node_modules"].includes(atual.name)) return;
    if (atual.isDirectory()) {
      const dir_files = await scanFiles(full_path);
      dir_files && (listFiles = [...listFiles, ...dir_files]);
    } else {
      if (!atual.name.includes("json")) {
        const metadataFile = full_path + ".json";
        const metadata = (await existsSync(metadataFile))
          ? await readFile(metadataFile, "utf-8")
          : false;
        const file = constructorFile(
          metadata && JSON.parse(metadata),
          atual.name,
          path
        );
        listFiles.push(file);
      }
    }
  }
  return listFiles.filter((file) => file);
};

module.exports = { scanFiles };
