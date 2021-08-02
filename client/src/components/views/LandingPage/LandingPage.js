import React, { useEffect } from 'react'
import axios from 'axios'


function LandingPage() {


    //랜딩에 들어오자마자 실행
    //그냥 요청하면 안됨 cors 정책을 따라야함
    //프록시를 사용하는 방법으로 해줄거야
    useEffect(() => {
        axios.get('/api/hello')
        .then(res => console.log(res.data))
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
