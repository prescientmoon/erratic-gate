import { TemplateResult } from "lit-html";

export interface confirmModalOptions { 
    title: string
    content: TemplateResult
    yes: string
    no: string
}