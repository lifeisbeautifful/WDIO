export function getPriceInDigits(prices: string[]) {
    return prices.map(p => 
            parseFloat(p.replace(/[^\d.,]/g, '').replace(',', '.'))
        );
}