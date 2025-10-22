import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class EventReceiver implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    container: HTMLDivElement;
    constructor() {
        // Empty
    }

    public init(context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement): void {
        this.container = container;

        // Set up listener for peer events
        if (!(window as any).PCFEventBus) {
            (window as any).PCFEventBus = document.createElement('div');
        }

        let count = 0;
        
        const display = document.createElement('div');
        display.innerText = "Event Receiver Component";
        this.container.appendChild(display);

        const countDisplay = document.createElement('div');
        countDisplay.innerText = "Event Count: 0";
        countDisplay.id = "eventCount";
        this.container.appendChild(countDisplay);

        (window as any).PCFEventBus.addEventListener('pcfPeerCommunication', (event: CustomEvent) => {
            if (event.detail.sourceComponent !== 'MyComponentName') { // Avoid self-events
                console.log('Received peer event:', event.detail);
                count++;
                const countDiv = document.getElementById("eventCount");
                if (countDiv) {
                    countDiv.innerText = "Event Count: " + count;
                }
            }
        });
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
    }
}
