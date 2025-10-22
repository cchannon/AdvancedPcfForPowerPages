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
