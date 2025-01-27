import {  Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

    constructor(page: Page){
        super(page)    // after we extended the this page from Helper Base, the helper base conflicting with the existing instance here , and we need to use this instance which belongs to helper base, thats we call it by super(page)
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(5)
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByTitle('Datepicker').click()
    }

    async SmartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByTitle('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByTitle('Toastr').click()
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByTitle('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false") {
            await groupMenuItem.click()
        }
    }
}