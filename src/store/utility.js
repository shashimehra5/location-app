export const phoneFormatter = phoneNumber => {
    let phone = phoneNumber;
    const input = phone.replace(/\D/g,'').substring(0,10);
    const zip = input.substring(0,3);
    const middle = input.substring(3,6);
    const last = input.substring(6,10);

    if(input.length > 6){phone = `(${zip}) ${middle} - ${last}`;}
    else if(input.length > 3){phone = `(${zip}) ${middle}`;}
    else if(input.length > 0){phone = `(${zip}`;}
    return phone;
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

export const compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const location1 = a.locationName.toUpperCase();
    const location2 = b.locationName.toUpperCase();
  
    let comparison = 0;
    if (location1 > location2) {
      comparison = 1;
    } else if (location1 < location2) {
      comparison = -1;
    }
    return comparison;
  }