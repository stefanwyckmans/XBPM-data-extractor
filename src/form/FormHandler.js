import { actionTypes } from "./FormActions";
import { convertArrayToCVS, convertTextToDOM } from "../Utils";

const formHandler = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_INPUT_VALUE:
      let target = action.event.target;
      switch (target.type) {
        case "file":
          return {
            ...state,
            isDownloadReady: false,
            [target.name]: {
              value: target.value,
              files: target.files
            }
          };
        default:
          return {
            ...state,
            isDownloadReady: false,
            [target.name]: {
              value: target.value
            }
          };
      }

    case actionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.SUMBIT_FORM:
      if (!action.files)
        return {
          ...state,
          isLoading: false
        };

      let { items, properties } = state;
      let cvsTable = [];
      for (let file of action.files) {
        let { name, result } = file;
        let nodeList = convertTextToDOM(result).querySelectorAll(items.value);
        for (let node of nodeList) {
          let cvsRow = [];
          cvsRow.push(name);
          cvsRow.push(node.nodeName);
          for (let property of properties.value
            .split(",")
            .map(str => str.trim())) {
            let cvsCell = node.getAttribute(property);
            if (cvsCell) {
              // removing break lines
              cvsRow.push(cvsCell.replace(/(\r\n|\n|\r)/gm, ""));
            } else {
              cvsRow.push("");
            }
          }
          cvsTable.push(cvsRow);
        }
      }

      return {
        ...state,
        csvContent: convertArrayToCVS(cvsTable, ";"),
        isDownloadReady: true,
        isLoading: false
      };
    default:
      throw new Error();
  }
};

export default formHandler;
