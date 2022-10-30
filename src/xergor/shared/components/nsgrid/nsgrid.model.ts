import { ValidatorFn } from "@angular/forms";

/**
 * tablo değişkenleri
 */
export enum ColumnType {
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

export interface TableConfig {
    inline?: Inline;
}

export interface Inline {
    isAdd?: boolean;
    isEdit: boolean;
    isDelete: boolean;
    options?: {
        before?: Action[];
        inbetween?: Action[];
        after?: Action[];
    }
}

export interface Action{
    iconName: string;
    color?: string;
    toolTip: string;
}

export interface Column extends CellOption {
    name: string;
    title: string;
    type?: string;
    width?: number;
    isEditable?: boolean;
    separator?: boolean;
    isSortable?: boolean;
    isStickt?: boolean;
}

export interface CellOption{
    isRequired?: boolean;
    validation?: ValidatorFn[];
    date?: DateOption;
    dateTime?: DateOption;
    dropDown?: DropDown[];
    enableBit?: boolean;
    enableResize?: boolean;

}


export interface DateOption {
    min?: Date;
    max?: Date;
    showSeconds?: boolean;
    enableMeridian?: boolean;
}

//Data Model

export interface DirtyData {
    index: number;
    selectedRow: any;
    dirtyFields: any;
}


export interface DropDown {
    id: string;
    description: string;
}

export interface AutoCompleteText {
    column: string;
    text?: string;
    data?: DropDown[];
}