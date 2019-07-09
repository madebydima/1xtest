import products from "./data/products.json";

/** True = 65%, False = 35% */
const rejectByChance = () => {
    return Math.random() <= 0.35
    // return 0;
}

/** Get table data */
export const emulateGetRequest = () => new Promise((resolve, reject) => {
    if (rejectByChance()) {
        return reject({
            error: 'Server error'
        })
    }
    const delay = parseInt(Math.random() * 1000)
    setTimeout(() => {
        try {
            resolve(products)
        } catch (error) {
            reject(new Error(error));
        }
    }, delay)
})

/** Emuate delete request */
export const emulateDeleteRequest = () => new Promise((resolve, reject) => {
    if (rejectByChance()) {
        return reject({
            error: 'Server error'
        })
    }
    const delay = parseInt(Math.random() * 1000)
    setTimeout(() => {
        try {
            resolve({ message: 'deleted' });
        } catch (error) {
            reject(new Error(error));
        }
    }, delay)
})
