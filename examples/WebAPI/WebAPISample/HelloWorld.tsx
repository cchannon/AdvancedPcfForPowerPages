import * as React from 'react';
import { FluentProvider, Label, webLightTheme, Button } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
  webApi: ComponentFramework.WebApi;
  Uri: string;
}

const options = {
  get: {
    method: "GET",
    headers: {
      "OData-MaxVersion": "4.0",
      "OData-Version": "4.0",
      "Accept": "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "Prefer": "odata.include-annotations=\"*\""
    }
  },
  delete: {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json",
      "OData-MaxVersion": "4.0",
      "OData-Version": "4.0",
    },
  },
  post: (body: any) => {
    return {
      method: "POST",
      headers: {
        "OData-Version": "4.0",
        "OData-MaxVersion": "4.0",
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body)
    }
  }
};

export const HelloWorld: React.FC<IHelloWorldProps> = (props) => {
  // export class HelloWorld extends React.Component<IHelloWorldProps> {

  const basicClickHandler = async () => {

    try {
      // Define the account record to create
      const payload = {
        name: "Fabrikam Inc.",
        telephone1: "555-0100",
        description: "Created via PCF Execute Sample"
      };

      // Create the request object with getMetadata function
      const createRequest = {
        etn: "account",
        payload: payload,
        getMetadata: function () {
          return {
            boundParameter: null,
            parameterTypes: {},
            operationType: 2, // 2 = CRUD operation (0 = Action, 1 = Function)
            operationName: "Create",
          };
        }
      };

      // Using webAPI.execute for Create operation
      // Cast to any because execute method exists but is not in TypeScript definitions
      const response = await (props.webApi as any).execute(createRequest);

      if (response.ok) {
        console.log("We did it!");
      }

    } catch (error) {
      console.error("Error creating account:", error);
      alert(`Error creating account: ${error}`);
    }

  };

  const powerPagesWebApi = async () => {
    // Retrieve top 50 contacts using Dataverse Web API via props.webApi
    try {
      const query = "?$select=fullname,contactid,emailaddress1&$top=50";
      const result = await props.webApi.retrieveMultipleRecords("contact", query);
      const count = Array.isArray(result?.entities) ? result.entities.length : 0;
      console.log("Dataverse Web API contacts (top 50):", result);
      alert(`Retrieved ${count} contacts via Dataverse Web API`);
      return result;
    } catch (err) {
      console.error(err);
      alert(`Dataverse Web API error: ${err}`);
      return null;
    }
  };

  const retrieveEnvironmentVariableValue = async () => {
    const url = encodeURI(`${props.Uri}RetrieveEnvironmentVariableValue(DefinitionSchemaName=@p1)?@p1='ktcs_ExampleEV'`);
    const response = await fetch(url, options.get).then(async res => {
      const response = await res.json();
      return;
    }).catch(err =>
      console.error(err)
    );
    return;
  }

  const validateFetchXmlExpression = async () => {
    const url = encodeURI(`${props.Uri}ValidateFetchXmlExpression(FetchXml=@p1)?@p1='<fetch top="50"><entity name="contact" /></fetch>'`);
    const response = await fetch(url, options.get).then(async res =>  {
      const response = await res.json();
      return;
    }).catch(err => 
      console.error(err)
    );
    return;
  }

  //we should return a fluent button that calls a new method, "clickHandler" on click
  return (
    <FluentProvider theme={webLightTheme}>
      <Button onClick={basicClickHandler}>Click Me!</Button>
      <Button onClick={retrieveEnvironmentVariableValue}>Click Me Too!</Button>
      <Button onClick={validateFetchXmlExpression}>Click Me Three!</Button>
      <Button onClick={powerPagesWebApi}>Retrieve Contacts (Dataverse)</Button>
    </FluentProvider>
  )
}
