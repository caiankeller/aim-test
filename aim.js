function convertToUSD(...pricesWithCurrency) {
    return pricesWithCurrency.map(priceWithCurrency => {
        const internationalNotation = priceWithCurrency.replace(/[^\d,]+/g, '').replace(',', '.');
        return parseFloat(internationalNotation);
    });
}

function convertToBRL(priceInUSD) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(priceInUSD);
}

function calculatePriceDifference(originalPriceWithCurrency, priceAfterDiscountWithCurrency) {
    const [numericOriginalPrice, numericPriceAfterDiscount] = convertToUSD(
        originalPriceWithCurrency,
        priceAfterDiscountWithCurrency
    );
    return numericOriginalPrice - numericPriceAfterDiscount;
}

function updatePriceElements(priceDifference) {
    const priceDifferenceBRL = convertToBRL(priceDifference);
    const newContent = `(${priceDifferenceBRL} de desconto)`;

    const discountElement = document.querySelector('.sc-hBtRBD.gKtA-d');
    const showcasePriceElement = document.querySelector('[data-testid="showcase-price"] .lkyyeb');

    if (discountElement && showcasePriceElement) {
        discountElement.textContent = newContent;
        showcasePriceElement.textContent = newContent;
        showcasePriceElement.style.color = '#59C00B';
    }
}

function modifyButtonStyles() {
    const buyButtonElement = document.querySelector('[data-testid="buyButton"]');
    const bagButtonElement = document.querySelector('[data-testid="bagButton"]');

    if (buyButtonElement) {
        buyButtonElement.style.background="#0086FF";
    }
    if (bagButtonElement) {
        bagButtonElement.style.display = 'none';
    }
}

function configureFloatButton() {
    const floatButtonElement = document.querySelector('[data-testid="float-button"] label');

    if (floatButtonElement) {
        floatButtonElement.textContent = 'Comprar agora';
        floatButtonElement.style.backgroundColor = '#0086FF';
    }
}

function main() {
    const originalPriceElement = document.querySelector('[data-testid="price-original"]');
    const valuePriceElement = document.querySelector('[data-testid="price-value"]');

    if (originalPriceElement && valuePriceElement) {
        const originalPriceText = originalPriceElement.textContent;
        const valuePriceText = valuePriceElement.textContent;

        const priceDifference = calculatePriceDifference(originalPriceText, valuePriceText);
        updatePriceElements(priceDifference);
        modifyButtonStyles();
        configureFloatButton();
    }
}

main();
