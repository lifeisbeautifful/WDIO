export async function getRandomElement(element: ChainablePromiseArray) {

    const elementArrayLength = await element.length;
    if (elementArrayLength === 0) {
        throw new Error('No elements found!');
    }

    const randomIndex = Math.floor(Math.random() * elementArrayLength);
    return element[randomIndex];
}