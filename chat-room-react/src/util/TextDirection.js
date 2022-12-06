

export const textDirection = (str="") => {

    const char = str.charAt(0);

    if (char.match(/[\u0600-\u06FF\u0750-\u077F]/)){
        return "rtl";
    }

    return "ltr";
}