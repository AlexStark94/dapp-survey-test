export interface ISurveyJSON {
    title: string;
    image: string;
    questions: IQuestion[];
}

export interface IQuestion {
    text: string;
    image: string;
    lifetimeSeconds: number;
    options:IOption[]
}

export interface IOption {
    text: string;
}