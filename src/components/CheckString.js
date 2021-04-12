let blank = /\s+/g;
let special = /[\[\]\{\}\(\),.`~!@#$%^&*|\\\'\";:\/?]/gi;

export const CheckSpaceNSpecial = (string) => {
    console.log("string", string)
    return blank.test(string) || special.test(string);
}

// export const CheckSpecial = (string) => {

//     return special.test(string);
// }

export const ReplaceSpaceNSpecial = (string) => {

    return string.replace(blank, "").replace(special, "");
}

// export const ReplaceSpecial = (string) => {

//     return string.replace(special, "");
// }