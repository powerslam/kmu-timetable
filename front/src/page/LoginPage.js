import { useState } from 'react';
import axios from 'axios';

import "../styles/index.css";

import TextField from "../components/common/TextField";

import { useNavigate } from "react-router-dom";
import { SIGNUP_PATH,  MAIN_PATH } from '../lib/variables';
import { LOGIN, useServiceDispatch } from '../lib/ServiceContext';

const LoginPage = () => {
    const [ email, setEmail ] = useState("");
    const [ pwd, setPwd ] = useState("");
    const navigate = useNavigate();
    const dispatch = useServiceDispatch();

    const onChange = (e) => {
        switch(e.target.id){
            case "email": 
                setEmail(e.target.value);
                break;
            
            case "pwd": 
                setPwd(e.target.value);
                break;
            
            default: break;
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
                    dispatch({
                        type: LOGIN,
                        userData: {
                            id: email,
                            pwd: pwd,
                        }
                    })
                    navigate(MAIN_PATH);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <form className="w-full h-full text-center flex flex-col items-center justify-center" onSubmit={login}>
            <label className="font-bold text-3xl mx-1 my-1">로그인</label>
            <TextField id="email" type="text"
                    placeholder="아이디"
                    onChange={onChange}
                    value={email}/>

            <TextField id="pwd" type="password"
                    placeholder="비밀번호"
                    onChange={onChange}
                    value={pwd}/>

            <div className="flex justify-center w-full">
                <button className="btn btn-green sz-half">로그인</button>
                <button 
                    className="btn btn-green sz-half"
                    onClick={() => navigate(SIGNUP_PATH)}>
                        회원가입
                </button>
            </div>
        </form>
    );
};

export default LoginPage;