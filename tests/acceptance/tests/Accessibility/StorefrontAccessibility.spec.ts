import { test } from '@fixtures/AcceptanceTest';

test('The Storefront should implement accessibility best practices.', { tag: '@Accessibility' }, async ({
    ShopCustomer,
    TestDataService,
    ValidateAccessibility,
    Login,
    AddProductToCart,
    ProceedFromCartToCheckout,
    ConfirmTermsAndConditions,
    SubmitOrder,
    StorefrontProductDetail,
    StorefrontCategory,
    StorefrontAccountLogin,
    StorefrontAccount,
    StorefrontAccountOrder,
    StorefrontCheckoutCart,
    StorefrontAccountProfile,
    StorefrontAccountAddresses,
    StorefrontAccountPayment,
}) => {
    await test.slow();

    const product = await TestDataService.createBasicProduct();
    const category = await TestDataService.createCategory();
    await TestDataService.assignProductCategory(product.id, category.id);

    await test.step('Login Page Accessibility', async () => {
        await ShopCustomer.goesTo(StorefrontAccountLogin.url());
        await ShopCustomer.attemptsTo(ValidateAccessibility('Login', false));
    });

    await test.step('Account Page Accessibility', async () => {
        await ShopCustomer.attemptsTo(Login());
        await ShopCustomer.goesTo(StorefrontAccount.url());
        await ShopCustomer.attemptsTo(ValidateAccessibility('Account', false));
    });

    await test.step('Category Page Accessibility', async () => {
        await ShopCustomer.goesTo(StorefrontCategory.url(category.id));
        await ShopCustomer.attemptsTo(ValidateAccessibility('Category', false));
    });

    await test.step('Product Detail Page Accessibility', async () => {
        await ShopCustomer.goesTo(StorefrontProductDetail.url(product));
        await ShopCustomer.attemptsTo(ValidateAccessibility('Product', false));
    });

    await test.step('Cart Page Accessibility', async () => {
        await ShopCustomer.attemptsTo(AddProductToCart(product, '5'));
        await ShopCustomer.goesTo(StorefrontCheckoutCart.url());
        await ShopCustomer.attemptsTo(ValidateAccessibility('Cart', false));
    });

    await test.step('Checkout Accessibility', async () => {
        await ShopCustomer.attemptsTo(ProceedFromCartToCheckout());
        await ShopCustomer.attemptsTo(ValidateAccessibility('Checkout Confirm', false));

        await ShopCustomer.attemptsTo(ConfirmTermsAndConditions());
        await ShopCustomer.attemptsTo(SubmitOrder());

        await ShopCustomer.attemptsTo(ValidateAccessibility('Checkout Finish', false));
    });

    await test.step('Account Order Accessibility', async () => {
        await ShopCustomer.goesTo(StorefrontAccountOrder.url());
        await ShopCustomer.attemptsTo(ValidateAccessibility('Account Order', false));
    });

    await test.step('Account Profile Accessibility', async () => {
        await ShopCustomer.goesTo(StorefrontAccountProfile.url());
        await ShopCustomer.attemptsTo(ValidateAccessibility('Account Profile', false));
    });

    await test.step('Account Addresses Accessibility', async () => {
        await ShopCustomer.goesTo(StorefrontAccountAddresses.url());
        await ShopCustomer.attemptsTo(ValidateAccessibility('Account Addresses', false));
    });

    await test.step('Account Payment Accessibility', async () => {
        await ShopCustomer.goesTo(StorefrontAccountPayment.url());
        await ShopCustomer.attemptsTo(ValidateAccessibility('Account Payment', false));
    });
});
