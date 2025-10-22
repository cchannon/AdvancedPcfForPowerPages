import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class EventPasser implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private eventBus: HTMLElement;

    constructor() { //empty constructor
    }

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

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IHelloWorldProps = { callback: this.callbackFunction.bind(this) };
        return React.createElement(
            HelloWorld, props
        );
    }

    public callbackFunction(): void {
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
    }

    public getOutputs(): IOutputs {
        return { };
    }

    public destroy(): void {
    }
}
