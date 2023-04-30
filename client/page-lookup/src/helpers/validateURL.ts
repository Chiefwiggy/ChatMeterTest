const validateURL = (inputString: string): boolean => {
    try {
        new URL(inputString);  
        //checks whether url has at least 1 period but does not end with a period, and uses valid characters for a url according to RFC 3986.
        const urlPattern = /^(?!.*\.$)(?:[a-zA-Z0-9$-_.+!*'(),/&?=:%]+\.)*[a-zA-Z0-9$-_.+!*'(),/&?=:%]+$/ 
        const periodPattern = /.*\..*/;
        return urlPattern.test(inputString) && periodPattern.test(inputString);
    } catch(err) {
        return false;
    }
}

export default validateURL;