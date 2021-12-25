const { opendir, readFile } = require("fs/promises");
const { existsSync } = require("fs");
const { v4:uuid } = require("uuid");

/**
 *
 * @returns autocomplete
 * @function ElasticSearch
 */

const pathGoogle =
  "/run/media/jhon/9d646588-db28-48af-9599-079c6a24c744/googlePhotos/Takeout/Google Fotos";

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
  deviceFolder:
    metadata?.googlePhotosOrigin?.mobileUpload?.deviceFolder?.localFolderName,
    updatedAt: metadata
    ? new Date(metadata.photoLastModifiedTime.timestamp * 1e3)
    : new Date()
});

const checkFileOrDir = async (path = pathGoogle) => {
  let listFiles = [];
  const dir = await opendir(path);
  for await (const atual of dir) {
    const full_path = `${path}/${atual.name}`;
    if (["node_modules"].includes(atual.name)) return;
    if (atual.isDirectory()) {
      const dir_files = await checkFileOrDir(full_path);
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

module.exports = { scanFiles: checkFileOrDir };
