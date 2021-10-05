import React from 'react'
import { UserContext } from '../UserContext';

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email valido'
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: 'A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito.Com no mínimo 8 caracteres'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.'
  }
}

const useForm = (type) => {
  const [value,setValue] = React.useState('');
  const [error,setError] = React.useState(null);

  const {setError2} = React.useContext(UserContext);

  function validate(value){
    if(type === false) return true;
    if(value.length === 0){
      setError('Preencha um valor');
      return false
    } else if(types[type] && !types[type].regex.test(value)){
      setError(types[type].message);
      return false
    }else {
      setError(null)
      return true;
    }
  }

  function onChange({target}){
    if(error) validate(target.value)
    setValue(target.value);
    setError2(null);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value)
  }
}

export default useForm
