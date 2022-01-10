export const urlGenerator = (baseUrl = '', path = '', query = {}) => {
    console.log(query)
   let url = '';
   if(path){
    url = `${baseUrl}/${path}`;
   }
   else{
    url = baseUrl;
   }
   Object.keys(query).forEach((key, index) => {
       console.log(key)
       console.log(`${query[key]}`)
       if(index){
           url = `${url}&${key}=${query[key]}`;
       }
       else{
           url = `${url}?${key}=${query[key]}`;
       }
   });
   return url;
}

export const emailVerification = (email) => {
   const regexString = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return regexString.test(email);
}

export const passwordVerification = (password) => {
    const regexString = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regexString.test(password);
}

export const emptyStringVerification = (value = '') => {
    if(typeof value === 'string' && value.trim() === ''){
        return false;
    }
    if(!value){
       return false;
    }
    return true;
}

export const phoneNumberVerification = (phoneNumber = '') => {
    const regexString = /^[0-9]{10}$/;
    return regexString.test(phoneNumber);
}