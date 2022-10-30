import { ValidatorFn } from "@angular/forms";

 
/**
 * tablo değişkenleri
 */
export enum TableColumnType {
    TEXT = "text",
    DATE = "date",
    DATETIME = "dateTime",
    TEXTAREA = "textArea",
    DROPDOWN = "dropdown",
    AUTOCOMPLETE = "autocomplete",
    NUMBER ="number",
    CHECKBOX = "checkbox",
    SLIDE = "slide"
}

export interface TableColumn extends TableCellOption {
    name: string;
    title: string;
    type?: string;
    width?: number;
    isEditable?: boolean;
    separator?: boolean;
    isSortable?: boolean;
    isStickt?: boolean;
}


export interface TableCellOption{
    isRequired?: boolean;
    validation?: ValidatorFn[];
    date?: TableDateOption;
    dateTime?: TableDateOption;
    dropDown?: TableDropDown[];
    enableBit?: boolean;
    enableResize?: boolean;

}


export interface TableDateOption {
    min?: Date;
    max?: Date;
    showSeconds?: boolean;
    enableMeridian?: boolean;
}

//Data Model

export interface TableDirtyData {
    index: number;
    selectedRow: any;
    dirtyFields: any;
}


export interface TableDropDown {
    id: string;
    description: string;
}

export interface TableAutoCompleteText {
    column: string;
    text?: string;
    data?: TableDropDown[];
}