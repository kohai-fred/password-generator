const characters = {
    numbers: Array.from(Array(10).keys()),
    symbols: ["@", "&", "?", "%", "*", "!", "$", "€"],
    uppercase: Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65)),
    lower: Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65).toLowerCase()),
};
const count = {
    numbers: 0,
    symbols: 0,
    uppercase: 0,
    lower: 0,
};
/**
 * *Create a random password with:
 * 8 min Characters
 * 1 number/uppercase/lowercase/symbols
 * @param {Number} length Optional
 * @returns {String}
 */
export function passwordGenerator(length = 12) {
    let password = [];

    if (length < 8) length = 8;
    dispatchRandomCountCharacters(length);

    Object.keys(characters).forEach((c) => {
        password.push(loop(characters[c], count[c]));
    });

    return shuffle(password.flat());
}

function dispatchRandomCountCharacters(length) {
    const size = Object.keys(count).length;
    for (let i = length; i > 0; i--) {
        if (!count[Object.keys(count)[i % size]]) {
            count[Object.keys(count)[i % size]] += 1;
            continue;
        }
        count[Object.keys(count)[Math.floor(Math.random() * size) % size]] += 1;
    }
}

function loop(arr, howMany) {
    let pass = [];
    for (let i = 0; i < howMany; i++) {
        pass.push(arr[randomIndex(arr)]);
    }
    return pass;
}
function randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

function shuffle(array) {
    //? https://fr.javascript.info/task/shuffle#:~:text=Ecrivez%20la%20fonction%20shuffle(array,%C3%A0%20diff%C3%A9rents%20ordres%20d'%C3%A9l%C3%A9ments.
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}
