import React, { useEffect } from 'react'
import axios from 'axios'


function LandingPage(props) {

    //랜딩에 들어오자마자 실행
    //그냥 요청하면 안됨 cors 정책을 따라야함
    //프록시를 사용하는 방법으로 해줄거야
    useEffect(() => {
        axios.get('/api/hello')
        .then(res => console.log(res.data))
    }, [])

    const onLogoutHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    props.history.push('/login')
                } else {
                    alert('Fail to Logout')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onLogoutHandler}>
                Logout
            </button>
        </div>
    )
}

export default LandingPage
