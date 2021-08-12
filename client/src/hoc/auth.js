import React, { useEffect }from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null) {

    //null, true, false
    //nul : 아무나 출입이 가능한 페이지
    //true : 로그인 한 사람만
    //false : 로그인 안 한 사람만
    //admin : 관리자만, 안적으면 null

    function AuthenticationCheck(props) {
        //console.log(props);
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth())
                .then(response => {
                    //console.log(response)
                    //로그인 하지 않은 상태
                    if(!response.payload.isAuth) {
                        if(option) return props.history.push('/login');
                    } else { 
                        //로그인 한 상태
                        if(adminRoute && !response.payload.isAdmin) return props.history.push('/');
                        if(!option) return props.history.push('/');
                    }
                })
        }, [])
        return (
            <SpecificComponent {...props} />
        )
    }
    return AuthenticationCheck
}