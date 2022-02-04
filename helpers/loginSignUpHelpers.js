export function validateEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);

}

export function validateUsername(uname) {
    if (uname.includes("@")) {
        return {
            type: "email",
            valid: validateEmail(uname)
        }
    } else {
        return {
            type: "phone",
            valid: uname.length === 10 && !isNaN(uname)
        }
    }
}