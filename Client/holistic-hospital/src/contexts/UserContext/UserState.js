import React, { useEffect, useState } from "react";

import { UserContext, SetUserContext } from "./UserContext";

const UserState = (props) => {
    const initialState = {
        token: '',
        code: '',
        name: '',
        last_name: '',
        email: '',
        rol: null,
        status: null,
        isLogged: false,
    };

    const initState = initialState ?? getUserStorage;
    const [userState, setUserState] = useState(initState);
    const [userCode, setUserCode] = useState("");

    useEffect(() => {
        setUserStorage(userState);
    }, [userState])

    function setUserStorage(args) {
        localStorage.setItem('userState',JSON.stringify(args));
    }

    function getUserStorage() {
        return  initState ??  JSON.parse( localStorage.getItem('userState') );
    }

    const setUser = ( args ) => {
        setUserState(currentState => {
            return{  ...currentState,
            ...args
          }
        })
    }

    function settingUserCode(code){
        setUserCode(code);
    };

    return (
        <UserContext.Provider
            value={{
                token: userState.token,
                code: userState.code,
                name: userState.name,
                last_name: userState.last_name,
                email: userState.email,
                rol: userState.rol,
                status: userState.status,
                isLogged: userState.isLogged,
                userCode,
                
                getUserStorage,
                settingUserCode,
            }}
        >
            <SetUserContext.Provider 
                value={
                    setUser
                }
            >
                {props.children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    );
}

export default UserState;