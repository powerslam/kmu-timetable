import { useState } from 'react';
import axios from 'axios';

import "../styles/index.css";

import TextField from "../components/common/TextField";

import { useNavigate } from "react-router-dom";

import { SIGNUP, MAIN } from '../lib/variables';

const LoginPage = () => {
    const [ email, setEmail ] = useState("");
    const [ pwd, setPwd ] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        switch(e.target.id){
            case "email": 
                setEmail(e.target.value);
                break;
            
            case "pwd": 
                setPwd(e.target.value);
                break;
        }
    }

    const login = (e) => {
        e.preventDefault();

        if(!email) alert("이메일이 비었습니다.");
        else if(!pwd) alert("비밀번호가 비었습니다.");
        else{
            axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
            axios.post("https://kmu-timtable-ivort.run.goorm.site/login", {
                id: email,
                pwd: pwd,
            }).then((res) => {
                if(res.data === 'fail') {
                    alert('아이디가 존재하지 않거나 비밀번호가 틀렸습니다.');
                } else {
                    alert('와 로그인 성공!');
                    navigate(MAIN);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <form className="w-full text-center items-center" onSubmit={login}>
            <label className="font-bold text-3xl mx-1 my-1">로그인</label>
            <div className="flex justify-center w-full">
                <TextField id="email" type="text"
                    placeholder="아이디"
                    onChange={onChange}
                    value={email}/>
            </div>

            <div className="flex justify-center w-full">
                <TextField id="pwd" type="password"
                    placeholder="비밀번호"
                    onChange={onChange}
                    value={pwd}/>
            </div>

            <div className="flex justify-center w-full">
                <button className="btn btn-green sz-half">로그인</button>
                <button 
                    className="btn btn-green sz-half"
                    onClick={() => navigate(SIGNUP)}>
                        회원가입
                </button>
            </div>
        </form>
    );
};

export default LoginPage;