import {test, expect} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

test("Locator syntax rulses", async({page}) => {
    // by Tag name
    page.locator("input")

    //by ID
    await page.locator("#inputEmail1").click()

    //by class
    page.locator(".shape-rectangle")

    //by attribute
    page.locator('[placeholder="Email')

    //by full Class value 
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')


    //combine different selectors
    page.locator('input[placeholder="Email.shape-rectangle[nbinput]')

    // by XPath - not recommended
    page.locator('//*[@id="inputEmail1"]')

    // partial text match
    page.locator(':text{"Using}')

    // exact text match
    page.locator(':text-is("using the Grid")')
})

test('User facing locators', async({page})=> {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTitle('Iot Dashboard').click()

    await page.getByTestId('SignIn').click()
})

test('locating child elements', async({page})=> {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click
})

test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()


})

test('Resuing locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})


    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.filter({hasText: "Basic form"}).getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')


})


test('Extracting values', async({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1") // validate part of array

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue() // use input value to validate inputed text
    expect(emailValue).toEqual('test@test.com')

    const placeHolderValue = await emailField.getAttribute('placeholder')
    expect(placeHolderValue).toEqual('Email')

})

test('Assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    // general assertions

    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit5') // wil assert but will continue the execution (soft)
    await basicFormButton.click()

    
})