const isEmpty = (value: any): boolean => {

    if (value === null) {
        return true;
    }
    if (value === undefined) {
        return true;
    }
    if (typeof value === 'string') {
        return value.trim().length < 1;
    }
    if (Array.isArray(value)) {
        return value.length < 1;
    } 
    if (typeof value === 'object') {
        return Object.entries(value).length < 1;
    }
    return false;
    
}

export { isEmpty }

