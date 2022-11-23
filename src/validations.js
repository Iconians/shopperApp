export const emailValidation = (value) => {
  if (value) {
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) {
      return '';
    }else {
      return 'Enter Valid email'
    }
  }
  else {
    return 'Enter Valid email'
  }
}

export const passwordValidation = (value) => {
  if (value) {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value) && value.length <= 20) {
      return '';
    }else {
      return 'Invalid password'
    }
  }
}

export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return '';
    }else {
      return 'Alpabetical letters only'
    }
  }
  else {
  return undefined;
  }
};

export const onlyNumberValidation = (value) => {
  if (value) {
    if (/^[0-9]*$/.test(value)) {
      return '';
    }else {
      return 'Numbers Only'
    }
  }
  else {
    return undefined
  }
};

export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
  MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
  VISA: /^4[0-9]{2,}$/,
  AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
  DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (!cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
      continue
    }
      if (cardNumber && card === 'AMERICAN_EXPRESS') {
        return cardNumber && /^[1-6]{1}[0-9]{13,14}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
        ? '' 
        : 'Enter a Valid Card';
      }else {
        return cardNumber && /^[1-6]{1}[0-9]{15,16}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
        ? '' 
        : 'Enter a Valid Card';
      }
  
  }
  return 'Enter a Valid Card help';
}

export const securityCodeValidation = (min, value) => 
  (value && value.length < min) ? ' must be 3 digits' : '';