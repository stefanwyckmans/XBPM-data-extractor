import Promise from "polyfill-promise";

export const convertArrayToCVS = (cvsTable, delimeter) => {
  return encodeURI(
    "data:text/csv;charset=utf-8," +
      cvsTable.map(cvsRow => cvsRow.join(delimeter)).join("\n")
  );
};

export const readFileListAsText = async fileList => {
  if (!fileList) return;

  let textFiles = [];
  for (let file of fileList) {
    textFiles.push(
      await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            result: reader.result
          });
        };
        reader.onerror = () => {
          reject(`Could not read file: "${file.name}" as text`);
        };
        reader.readAsText(file);
      })
    );
  }
  return textFiles;
};

export const convertTextToDOM = text => {
  return new DOMParser().parseFromString(text, "text/xml");
};
