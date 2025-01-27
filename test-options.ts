import {test as base} from 'playwright/test'
import { PageManger } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string   // making variable as pet the draAndDrop test go to "globalsqaurl"
    formLayoutsPage: string
    pageManager: PageManger

} 

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}],     // empty string as placeholder to override

    formLayoutsPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        console.log('Tear Down')
    },

    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManger(page)
        await use(pm)
    }
})

