import * as React from "react";
import { FluentProvider, Input, Label } from "@fluentui/react-components";
import type { InputOnChangeData } from "@fluentui/react-components";

export interface IHelloWorldProps {
  name?: string;
  updateValue: (value: string) => void;
}

export const HelloWorld: React.FC<IHelloWorldProps> = (
  props: IHelloWorldProps
) => {
  const [text, setText] = React.useState<string>(props.name ?? "");

  const onChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setText(data.value);
    props.updateValue(data.value);
  }

  return (
    <FluentProvider>
      <Label htmlFor="input1">Input text below</Label>
      <br/>
      <Input appearance="outline" id="input1" type="text" onChange={onChangeHandler} defaultValue={props.name} />
      <br/>
      <Label>{text}</Label>
    </FluentProvider>
  );
};
