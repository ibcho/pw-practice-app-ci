import { supportsScrollBehavior } from '@angular/cdk/platform'
import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 2000)
    
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({page}) =>{ 
    const successMessage = page.locator('.bg-success')

    //await successMessage.click()

    //const text = await successMessage.textContent()
    // await successMessage.waitFor({state: 'attached'})


    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}) // you can increase timeout separately

})

test.skip('alternative waits', async ({page}) => {
    const successMessage = page.locator('.bg-success')

    // // wait for element
    // await page.waitForSelector('.bg-success')
    
    // wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network calls to be complated('NOT RECOMMENDED')
    //await page.waitForLoadState('networkidle')


    const text = await successMessage.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})
test.skip('timeouts', async ({page}) => {
    //test.setTimeout(10000)
    test.slow() // multiply time by 3
    const successMessage = page.locator('.bg-success')
    await successMessage.click()

})