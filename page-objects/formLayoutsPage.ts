import {  Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page){
        super(page) 
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force:true})
        await usingTheGridForm.getByRole('button').click()
    }
    
    /**   наклонена и 2 пъти звезда
     * this metod will out the inline from with user details
     * @param name - firt and last name
     * @param email - email
     * @param rememberMe - true or false for select/unselected
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email:string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card',{hasText:"Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe){
            await inlineForm.getByRole('checkbox').check({force: true})
        }
        await inlineForm.getByRole('button').click()


    }
}