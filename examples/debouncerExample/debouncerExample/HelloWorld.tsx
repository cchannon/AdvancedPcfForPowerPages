import * as React from 'react';
import { Label, Input, FluentProvider, webLightTheme } from '@fluentui/react-components';

export interface IHelloWorldProps {
  name?: string;
}

// Custom debounce hook
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

export const HelloWorld: React.FC<IHelloWorldProps> = (props) => {
  const [inputValue, setInputValue] = React.useState('');
  const [label, setLabel] = React.useState('');
  
  // Use debounce
  const debouncedValue = useDebounce(inputValue, 300);

  // Update label when debounced value changes
  React.useEffect(() => {
    setLabel(debouncedValue);
  }, [debouncedValue]);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Input 
          placeholder="Type here..." 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <Label>
          Debounced Value: {label}
        </Label>
      </div>
    </FluentProvider>
  );
};
