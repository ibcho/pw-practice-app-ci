import {Page, expect } from "@playwright/test"
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datepickerPage'


export class PageManger{
    
    private readonly page: Page // this fixture is going to the pages below as "this.page"
    private readonly navigiationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage

    constructor (page: Page){
        this.page = page
        this.navigiationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    navigateTo(){
        return this.navigiationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    ondatePickerPage(){
        return this.datePickerPage
    }
}