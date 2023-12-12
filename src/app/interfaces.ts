export interface dateOptionsInterface {
    timezone: string,
    format: string
}

export interface coworker {
    name: string,
    timezone: string
}

export interface FormElements extends HTMLFormElement {
    cwName: HTMLInputElement;
    timezone: HTMLInputElement;
}