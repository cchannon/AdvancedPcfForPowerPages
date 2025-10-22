import * as React from 'react';
import { FluentProvider, Label, webLightTheme, Button } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
  webApi: ComponentFramework.WebApi;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {

  private basicClickHandler = async () => {
    const { webApi } = this.props;

    try {
      // Define the account record to create
      const payload = {
        name: "Fabrikam Inc.",
        telephone1: "555-0100",
        description: "Created via PCF ExecuteMultiple Sample"
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
      const response = await (webApi as any).execute(createRequest);

      if (response.ok) {
        console.log("We did it!");
      }

    } catch (error) {
      console.error("Error creating account:", error);
      alert(`Error creating account: ${error}`);
    }

  };

  private emClickHandler = async () => {
    const { webApi } = this.props;

    var requests = [];

    try {
      for (let i = 0; i < 3; i++) {
        // Define the account record to create
        const payload = {
          name: "Fabrikam Inc.",
          telephone1: "555-0100",
          description: "Created via PCF ExecuteMultiple Sample"
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

        requests.push(createRequest);
      }

      // Using webAPI.execute for Create operation
      // Cast to any because execute method exists but is not in TypeScript definitions
      const response = await (webApi as any).executemultiple(requests);

      if (response.ok) {
        console.log("We did it in bulk!");
      }

    } catch (error) {
      console.error("Error creating account:", error);
      alert(`Error creating account: ${error}`);
    }

  };

  public advancedEMClickHandler = async () => {
    const { webApi } = this.props;

    var requests = [];

    var transaction = [];

    

    try {
      for (let i = 0; i < 3; i++) {
        // Define the account record to create
        const payload = {
          name: "Fabrikam Inc.",
          telephone1: "555-0100",
          description: "Created via PCF ExecuteMultiple Sample"
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

        requests.push(createRequest);
        transaction.push(createRequest);
      }

      requests.push(transaction);

      // Using webAPI.execute for Create operation
      // Cast to any because execute method exists but is not in TypeScript definitions
      const response = await (webApi as any).executemultiple(requests);

      if (response.ok) {
        console.log("We did it in bulk!");
      }

    } catch (error) {
      console.error("Error creating account:", error);
      alert(`Error creating account: ${error}`);
    }
  };

  public render(): React.ReactNode {
    //we should return a fluent button that calls a new method, "clickHandler" on click
    return (
      <FluentProvider theme={webLightTheme}>
        <Button onClick={this.basicClickHandler}>Click Me!</Button>
        <Button onClick={this.emClickHandler}>Click Me Too!</Button>
      </FluentProvider>
    )
  }
}
