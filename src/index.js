import React from "react";
import ReactDOM from "react-dom";

import { Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import FormComponent from "./form/FormComponent";

//if (window.Promise && window.FileReader && window.DOMParser) {
ReactDOM.render(
  <Grid columns={1} padded>
    <Grid.Row>
      <Grid.Column>
        <FormComponent />
      </Grid.Column>
    </Grid.Row>
  </Grid>,
  document.getElementById("root")
);
/* } else {
    alert('Some of the used APIs in this application are not fully supported in this browser.');
} */
