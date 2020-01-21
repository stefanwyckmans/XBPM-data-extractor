import React, { useReducer } from "react";
import { Button, Form, Header, Input } from "semantic-ui-react";

import formHandler from "./FormHandler";
import { changeInputValue, isLoading, submitForm } from "./FormActions";
import { readFileListAsText } from "../Utils";

const initalState = {
  csvContent: null,
  file: { value: "", files: null },
  isDownloadReady: false,
  isLoading: false,
  items: {
    value:
      "gatewayStep, invokeStep, " +
      "noneEventStep, receiveStep, " +
      "terminateStep, errorEventStep"
  },
  properties: { value: "label" }
};

const FormComponent = () => {
  const [state, dispatch] = useReducer(formHandler, initalState);

  return (
    <Form
      post=""
      onSubmit={event => {
        dispatch(isLoading());
        readFileListAsText(state.file.files).then(files =>
          dispatch(submitForm(files))
        );
      }}
    >
      <Header as="h1">Upload file(s)</Header>
      <Form.Field>
        <label>Files</label>
        <Input
          type="file"
          name="file"
          value={state.file.value}
          onChange={event => dispatch(changeInputValue(event))}
          multiple
        />
      </Form.Field>
      <Form.Field>
        <label>Items</label>
        <Input
          type="text"
          name="items"
          value={state.items.value}
          onChange={event => dispatch(changeInputValue(event))}
        />
      </Form.Field>
      <Form.Field>
        <label>Properties</label>
        <Input
          type="text"
          name="properties"
          value={state.properties.value}
          onChange={event => dispatch(changeInputValue(event))}
        />
      </Form.Field>
      <Form.Field>
        <Button type="submit" loading={state.isLoading}>
          Export to Excel
        </Button>
      </Form.Field>
      <Form.Field hidden={!state.isDownloadReady}>
        <a href={state.csvContent} download="process.csv">
          Download CVS file
        </a>
      </Form.Field>
    </Form>
  );
};

export default FormComponent;
