<!-- slide -->

# Advanced PCFs for Power Pages

<!-- slide -->

## Garrett Pierce
- Dev, 5 years in Power Platform
- Avid rabbit hole explorer
- Love to see how far I can push Power Pages

<!-- slide -->

## Charles Channon
- Dev, architect, small biz owner
- PPlat since CRM 4.0 (Dev since 2011)
- 10x Super User recognition (Power Apps, Power Pages, Power Automate)
- MVP (Power Apps and Power Pages)

<!-- slide -->
## Introduction to PCFs in Power Pages

### What are PCFs and Why Use Them in Power Pages?

<!-- slide -->
<!-- 
- Welcome and session objectives
- What are PCFs (PowerApps Component Frameworks) for Power Pages?
- Why advanced PCFs matter for Power Pages projects
- What to expect: technical depth, real-world scenarios, and practical takeaways
- Session roadmap -->

```mermaid
graph TD
    A[PCF Component] --> B[Manifest]
    B --> B1[I/O Definitions]
    B --> B2[Resources]
    B --> B3[Features]
    A --> D[Code]
    D --> D1[TypeScript/JavaScript]
    B2 --> B2A[CSS]
    D --> D2[HTML]
    A --> E[Solution Package]
    E --> F[Dataverse]
```

---
<!-- slide -->

<!-- 
**Talking Points:**

--need to add brief intros for us both--

--Why the F would you even do this stuff--
- Scalability
- To hell with jQuery
- Good architecture/separation of concerns
- Better subgrid handling
- WebAPI access vs writing fetch by hand

Welcome, everyone! In this session, we’ll dive deep into the world of PowerApps Component Frameworks (PCFs) and their advanced applications within Power Pages. Whether you’re a developer, architect, or solution designer, you’ll gain a comprehensive understanding of how PCFs can elevate your Power Pages projects.

We’ll explore a range of advanced use cases, examining both the technical details and the strategic decisions behind each approach. You’ll see real-world examples, learn about the pros and cons of different techniques, and walk away with practical insights you can apply to your own solutions.

This is a hands-on, technical session—expect code samples, architectural diagrams, and candid discussions about what works (and what doesn’t) in the field. By the end, you’ll be equipped to make informed choices and push the boundaries of what’s possible with Power Pages and PCFs. -->

---

### Basic Building & Packaging Strategies

#### Virtual vs. Vanilla PCF

<!-- slide -->

##### Virtual

Virtual components utilize the React and Fluent libraries within the platform to work. This leads to much smaller PCF bundles.

<!-- slide -->

##### Vanilla (Standard)

Vanilla components do not include React by default. You can include React in a standard component, but it turns into a headache of version management pretty quickly.

<!-- slide -->

##### Sample Code: Virtual PCF

**index.ts for virtual example**
```typescript
// Virtual PCF component
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class virtualExample implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IHelloWorldProps = { name: 'Power Apps' };
        return React.createElement(
            HelloWorld, props
        );
    }

    public getOutputs(): IOutputs {
        return { };
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
```
---
<!-- slide -->

**HelloWorld.tsx for virtual example**
```typescript
import * as React from 'react';
import { FluentProvider, Input, Label } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
}

export const HelloWorld: React.FC<IHelloWorldProps> = (props: IHelloWorldProps) => {
  const [text, setText] = React.useState<string>("");

    return (
      <FluentProvider>
        <Label size='large'>Input label for Fluent example</Label>
        <br />
        <Input appearance="outline" id="input1" type="text" onChange={(ev, data) => { setText(data.value) }} />
        <br />
        <Label>{text}</Label>
      </FluentProvider>
    )
}

```
---
<!-- slide -->

##### Sample Code: Vanilla PCF

**index.ts for vanilla PCF example**
```typescript
// Vanilla PCF component
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class vanillaExample implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        // Add control initialization code
        const yourMessage = document.createElement("div");
        yourMessage.setAttribute("id", "yourMessage");
        yourMessage.innerText = context.parameters.sampleProperty.formatted ?? "No message provided.";
        container.appendChild(yourMessage);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const yourMessage = document.getElementById("yourMessage");
        if (yourMessage !== null) {
            yourMessage.innerText = context.parameters.sampleProperty.formatted ?? "No message provided.";
        }
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        
    }
}

```
---
<!-- slide -->

#### Forcing React Bundling

- When we submitted the abstract for this presentation, it was necessary to force React into your virtual component bundle through "npm install --save react" in order to have it function on a Power Pages site
- However this no longer seems to be the case, an out of the box virtual component can function on Power Pages without bundling React of Fluent UI.

<!-- slide -->

#### Building for Power Pages

- As you don't have to force React or Fluent UI into your PCF bundle anymore, building PCF controls for Power Pages has become pretty easy.
- You can simply initialize your component, write your code, build to a Power Apps solution, and import as you would any other PCF.

<!-- slide -->

## Basic Integration Methods

### PCFs on Model-Driven App Forms and How to Use Those in Power Pages

<!-- slide -->

In this example, a PCF is tied to a simple field on a model-driven app form in the Power Apps form editor.

![Form PCF](FormPCF.png)

<!-- slide -->

This is the relevant configuration for the PCF on the MDA form.

![Form PCF Configuration](PCFConfig.png)

<!-- slide -->

Once you're in the Power Pages editor, click the plus button within a section to add a component. That will bring up the following, and you'll click the Form option.

![alt text](image.png)

<!-- slide -->

Clicking the Form option will bring up this dialog, you'll want to use New form.

![alt text](image-1.png)

<!-- slide -->

Which in turn will bring up this dialog. In our case for this example, we keep it fairly simple, we only need the Table, the Form, and a name for the Form within Power Pages.

![alt text](image-2.png)

<!-- slide -->

That makes the form available on your Power Pages site in the WYSIWYG editor. But you may notice that the field labeled PCF Field is just a simple text field, which doesn't look right.

![alt text](image-3.png)

<!-- slide -->

Click on the individual field and you'll be presented with these options. You need to enable the code component.

![alt text](image-4.png)

<!-- slide -->

This is an example of the dialog that appears when you click Enable code component. Make any adjustments you may need to and click Done.

![alt text](image-5.png)

<!-- slide -->

You will likely see this in place of the field you used for the code component. This doesn't mean there's an issue with your component, it just means that the WYSIWYG editor doesn't execute all the code necessary show your component.

![alt text](image-6.png)

<!-- slide -->

If you use the Preview button to look at your site, you should see your PCF as intended.

![alt text](image-7.png)

Our simple example takes the value from a text input and reactively displays that below the input.

<!-- slide -->

### Form Embedding with Liquid

Power Pages also uses the Liquid templating language behind the scenes, and devs can edit that code. There is a button in the WYSIWYG editor with the VS Code logo and label that reads "Edit code" that will take you to your site's code.

![alt text](image-8.png)

<!-- slide -->

Once it loads, it should bring up the actual page you were on when you launched the editor. You can look through the onslaught of divs that comprises your page, and eventually find where your form is embedded.

![alt text](image-9.png)

<!-- slide -->

The code that embeds your form in the page will look something like this:

```
{% entityform name: 'Information (5)' %}
```
---
<!-- slide -->

### Limitations of Form Embedding
Embedding a full form in your Power Pages site does come with limitations however. Your PCF will be tied to whatever form it's on, and will always reflect the context of the form around it. A PCF embedded in a form cannot be separated from the form. But you can use the PCF on its own in a Power Pages site.

<!-- slide -->

### Embedding with Liquid Tagging
PCFs can be used on an individual basis on a Power Pages site through Liquid tags. The codecomponent Liquid tag works with PCFs to bring PCFs in to a page without needing the PCF to be embedded on a form.

<!-- slide -->

To do this, you'll need the name of the PCF component, seen here in the Name column:
![alt text](image-10.png)

<!-- slide -->

Then we'll embed it right below the form we embedded in the last example:
![alt text](image-11.png)

<!-- slide -->

The code that embeds the PCF directly in Liquid will look something like this:
`{% codecomponent name: dev_examples.powerPagesVirtual %}`

And if you need to provide a value to a property in your PCF, those are key/value pairs separated by a colon, like this:
`{% codecomponent name: dev_examples.powerPagesVirtual controlValue:'Here is a value' %}`

<!-- slide -->

Save the file in the code editor, then head back to the WYSIWYG editor and hit sync to make sure the changes from the code editor come through. And sure enough, it's there (seen below as the second "Unable to load this code component in studio" marker)!

![alt text](image-12.png)

<!-- slide -->

And here it is in the preview:

![alt text](image-13.png)

<!-- slide -->

### Limitations of Liquid Tag Embedding
- Code components embedded through Liquid tagging don't carry record context in the same way a PCF on a model-driven app form would
- You could provide a record to your PCF as a PCF parameter
- Will not work in Web Templates
---

<!-- slide -->

## UI Framework Considerations

### Fluent UI vs. Bootstrap

| Fluent UI | Bootstrap |
|-----------|-----------|
| Built by Microsoft | Built by Twitter |
| Adopts similar design language to what already exists in Power Apps | Platform-agnostic |
| Integrated with Microsoft ecosystem | More broadly usable |
| Fluent components have issues in Liquid tagging | Power Pages uses Bootstrap internally |

<!-- slide -->

**DEMO**

<!-- slide -->

### Fluent UI implementations
Integrating Fluent UI is as easy as adding `--framework react` to your `pac pcf init` command. Using that parameter ensures that React and Fluent UI are bundled with your component and ready for you to use.

<!-- slide -->

#### Sample Code: Fluent UI Implementation

**index.ts for Fluent example**
```typescript
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class fluentExample implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IHelloWorldProps = { name: 'Power Apps' };
        return React.createElement(
            HelloWorld, props
        );
    }

    public getOutputs(): IOutputs {
        return { };
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
```
---
<!-- slide -->

**HelloWorld.tsx for Fluent example**
```typescript
import * as React from 'react';
import { FluentProvider, Input, Label } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
}

export const HelloWorld: React.FC<IHelloWorldProps> = (props: IHelloWorldProps) => {
  const [text, setText] = React.useState<string>("");

    return (
      <FluentProvider>
        <Label size='large'>Input label for Fluent example</Label>
        <br />
        <Input appearance="outline" id="input1" type="text" onChange={(ev, data) => { setText(data.value) }} />
        <br />
        <Label>{text}</Label>
      </FluentProvider>
    )
}
```
---
<!-- slide -->

### Bootstrap implementation
- You need to use `npm install bootstrap` to make sure your project includes Bootstrap
- Once that's done, you need to include it as a resource in ControlManifest.Input.xml

```xml
<resources>
  <code path="index.ts" order="1"/>
  <css path="../node_modules/bootstrap/dist/css/bootstrap.min.css" order="1" />
</resources>
```
---
<!-- slide -->

#### Sample Code: Bootstrap Implementation

```typescript
// Bootstrap in PCF
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import 'bootstrap';

export class bootstrapExample
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  constructor() {
    // Empty
  }

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code
    const formLabel = document.createElement("label");
    const formInput = document.createElement("input");

    formInput.setAttribute("id", "bootstrapExampleInput1");
    formInput.setAttribute(
      "placeholder",
      "Placeholder text for Bootstrap input element"
    );
    formInput.setAttribute("type", "text");
    formInput.classList.add("form-control");

    formLabel.setAttribute("for", "bootstrapExampleInput1");
    formLabel.classList.add("form-label");
    formLabel.innerText = "Input label for Bootstrap example";

    container.appendChild(formLabel);
    container.appendChild(formInput);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
```

---

<!-- slide -->

## Advanced data management topics

PCFs come with specific limitations that can make it challenging to handle data in efficient ways. In particular, inter-control communication and  The approaches that follow are not limited to Power Pages, but they are especially useful in a Power Pages context. 

<!-- slide -->

### Extending WebApi capabilities for greater message access and efficiency

The PCF WebAPI provides some helpful functions that cover basic use cases, but extended capabilities still need to be coded the old fashioned way...

<!-- slide -->

### .Execute()

<!-- The execute method under webapi is not enumerated in the typescript classes and undocumented, so technically this is unsupported, but let's call it a "soft" unsupported because it follows the exact usage patterns of the Xrm webapi execute, so changes to it are almost impossible to imagine...

This can be used for a huge number of message types, including all API Functions and Actions (queueing, sharing, you name it!) -->

You might recognize this...

```typescript
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
```
---
<!-- slide -->

BUT... The WebApi implementation in Pages is not consistent with the implementation on MDAs - EVEN WHEN IN AN EMBEDDED FORM!

<!-- slide -->

``` typescript
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
```
---
<!-- slide -->

**DEMO**

<!-- slide -->

### Sample Code: Cross-Component Communication
#### A simple event bus for client-side events

```typescript
//initialize the control and the event bus
public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        
        // Create global event bus with consistent naming convention
        if (!(window as any).PCFEventBus) {
            (window as any).PCFEventBus = document.createElement('div');
            // Optional: Add some metadata for debugging
            (window as any).PCFEventBus.setAttribute('data-pcf-eventbus', 'true');
            console.log('PCF Event Bus initialized');
        }

        this.eventBus = (window as any).PCFEventBus;
    }
```
---
<!-- slide -->

```typescript
  // Create and dispatch a custom event with test data
  const testValue = {
      message: "Hello from PCF EventPasser",
      timestamp: new Date().toISOString(),
      componentType: "PCF in Power Pages",
      sourceComponent: "EventPasserPCF"
  };
  
  const peerEvent = new CustomEvent('pcfPeerCommunication', {
      detail: testValue,
      bubbles: false
  });
  
  // Dispatch on the global event bus
  this.eventBus.dispatchEvent(peerEvent);
  
  this.notifyOutputChanged();
```
---
<!-- slide -->

```typescript
  (window as any).PCFEventBus.addEventListener('pcfPeerCommunication', (event: CustomEvent) => {
    if (event.detail.sourceComponent !== 'EventPasserPCF') { // Avoid self-events
        console.log('Received peer event:', event.detail);
        count++;
        const countDiv = document.getElementById("eventCount");
        if (countDiv) {
            countDiv.innerText = "Event Count: " + count;
        }
    }
  });
```
---
<!-- slide -->

**DEMO**

<!-- slide -->

### Performance Optimization

#### Sample Code: Memory Protection and Good Hygiene

<!-- Why the destroy method matters:

Prevent Memory Leaks: Event listeners that aren't removed will persist even after the component is destroyed
Multiple Instances: If the component is destroyed and recreated, you'd have duplicate listeners
Performance: Cleanup ensures resources are properly released -->

``` typescript
public destroy(): void {
        // Clean up event listener to prevent memory leaks
        if (this.eventBus && this.eventHandler) {
            this.eventBus.removeEventListener('pcfPeerCommunication', this.eventHandler);
            console.log('Event listener removed - component cleaned up');
        }

        // Clear any references
        this.eventHandler = null as any;
        this.eventBus = null as any;
        
        // Optional: Clear the container
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
```
---

<!-- slide --> 

#### Sample Code: Debouncer

``` typescript
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay expires
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```
---
<!-- slide -->

``` typescript
const debouncer = useDebounce(inputValue, 300); // 300ms delay
```
---
<!-- slide -->

``` typescript
//search with debouncer, switch on searchType
  React.useEffect(() => {
    const query =
      props.searchType === "contains"
        ? `?$select=${targetPrimaryColumn},${props.items.getTargetEntityType()}id&$filter=(
          ${props.filter ? `${props.filter} and ` : ""}
          ${
            inputValue.length > 0
              ? `contains(${targetPrimaryColumn},'${inputValue}')`
              : ""
          }
        )`
        : `?$select=${targetPrimaryColumn},${props.items.getTargetEntityType()}id
          ${props.filter ? `&$filter=(${props.filter}` : ""}
        )`;

    debouncer.debounce(() => {
      setSearching(true);
      props.webApi
        .retrieveMultipleRecords(
          props.items.getTargetEntityType(),
          query
        )
        .then(
          (response) => {
            setOptions(response.entities);
            setAllOptions([
              ...allOptions,
              ...response.entities.filter((x) => !allOptions.includes(x)),
            ]);
            setSearching(false);
          },
          (error) => {
            console.error(error);
          }
        );
    });
  }, [inputValue]);
```
---
<!-- slide -->

**DEMO**

<!-- slide -->

## Resources

- [Microsoft PCF documentation](https://learn.microsoft.com/en-us/power-pages/configure/component-framework)
- [Microsoft PCF tutorial](https://learn.microsoft.com/en-us/power-pages/configure/component-framework-tutorial)
- [execute()](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/execute)
- [dispatchEvent()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)
- [Carl de Souza blog post](https://carldesouza.com/how-to-use-pcf-controls-in-power-pages/)
- [Power Pro Dev YouTube](https://www.youtube.com/@PowerProDev) (shameless plug!)
- [Our repository](https://github.com/cchannon/AdvancedPcfForPowerPages)
- [pcf-webapi-ext on npm](https://www.npmjs.com/package/pcf-webapi-ext?activeTab=readme)

---
