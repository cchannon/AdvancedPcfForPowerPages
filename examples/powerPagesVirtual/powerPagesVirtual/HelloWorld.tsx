import * as React from "react";
import { FluentProvider, Input, Label } from "@fluentui/react-components";

export interface IHelloWorldProps {
  name?: string;
}

export const HelloWorld: React.FC<IHelloWorldProps> = (
  props: IHelloWorldProps
) => {
  const [text, setText] = React.useState<string>("");

  return (
    <FluentProvider>
      <Label htmlFor="input1">Input text below</Label>
      <br/>
      <Input id="input1" onChange={(ev, data) => setText(data.value)} />
      <br/>
      <Label>{text}</Label>
    </FluentProvider>
  );
};
