import * as React from 'react';

export interface IHelloWorldProps {
  callback: () => void;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <button onClick={this.props.callback}>Click me!</button>
    )
  }
}
