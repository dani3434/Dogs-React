import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router';


export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
  const [data,setData] = React.useState(null);
  const [login,setLogin] = React.useState(null);
  const [loading,setLoading] = React.useState(false);
  const [error2,setError2] = React.useState(false);
  const navigate = useNavigate();

  const userlogout = React.useCallback(
    async function (){
      setData(null);
      setError2(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },[navigate]
  )
  
  async function getUser(token){
    const {url,options} = USER_GET(token);

    const response = await fetch(url,options);
    const json = await response.json();
    
    setData(json);
    setLogin(true);
  }

  async function userLogin(username,password){
    try{
      setError2(null);
      setLoading(true);
      const {url,options} = TOKEN_POST({username,password});
      const tokenRes = await fetch(url,options);
      if(!tokenRes.ok) throw new Error(`Usuario Inválido`);

      const {token} = await tokenRes.json();
      window.localStorage.setItem('token',token);

      await getUser(token);
      navigate('/conta');
    } catch(err){
      setError2(err.message);
      setLogin(false)
    }finally {
      setLoading(false);
    }
    
  }
  
  React.useEffect(() => {
    async function autologin(){
      const token = window.localStorage.getItem('token');
 
      if(token){
        try{
         setError2(null);
         setLoading(true);
         const {url, options} = TOKEN_VALIDATE_POST(token);
         const response = await fetch(url,options);
         if(!response.ok) throw new Error('Token Invalido');
         await getUser(token);
         
        } catch(err){
          userlogout();
        }finally{
         setLoading(false);
        }
      }else{
        setLogin(false)
      }
    }
    autologin();
   },[userlogout])

   
  return (
    <UserContext.Provider value={{userLogin,data,userlogout,error2,setError2,loading,login}}>
      {children}
    </UserContext.Provider>
  )
}


