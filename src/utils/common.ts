export function getShortenedString(originalString: string, visibleCharacters=5, numberOfDots=3) {
    const dots = Array(numberOfDots).fill(".").join("");

    // return original string if shortened string will be greater than or equal to
    // length of original string
    if(originalString.length <= (2*visibleCharacters + numberOfDots))  return originalString;

    return originalString?.substring(0, visibleCharacters) +
        dots +
        originalString?.substring(
            originalString.length - visibleCharacters, originalString.length
        );
}