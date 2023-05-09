import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import TextField from "../components/common/TextField";
import { API_SERVER, LOGIN_PATH } from '../lib/variables';

import '../styles/SignUpPage.css';

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPWD] = useState("");
    const [pwdChk, setPWDChk] = useState("");
    const navigate = useNavigate();
    
    const createUser = (e) => {
        e.preventDefault();

        if(!email) alert("이메일이 비었습니다.");
        else if(!pwd) alert("비밀번호가 비었습니다.");
        else if(pwd !== pwdChk) alert("비밀번호와 비밀번호 확인이 다릅니다.");
        else{
            axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
            axios.post(API_SERVER + "/signup", {
                id: email,
                pwd: pwd,
            }).then((res) => {
                if(res.data === 'DUP') alert('이미 등록된 회원입니다.');
                else {
                    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
                    navigate(LOGIN_PATH);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const onChange = (e) => {
        switch(e.target.id){
            case "email": 
                setEmail(e.target.value);
                break;
            
            case "pwd": 
                setPWD(e.target.value);
                break;
            
            case "pwdChk": 
                setPWDChk(e.target.value);
                break;
            
            default: break;
        }
    }

    return (
        <form className="Page" onSubmit={createUser}>
            <label className="Signup-Title">회원가입</label>
            <TextField id="email" type="text"
                addStyle="sz-normal"
                placeholder="이메일"
                onChange={onChange}
                value={email}/>

            <TextField id="pwd" type="password"
                addStyle="sz-normal"
                placeholder="비밀번호"
                onChange={onChange}
                value={pwd}/>
        
            <TextField id="pwdChk" type="password"
                addStyle="sz-normal"
                placeholder="비밀번호 확인"
                onChange={onChange}
                value={pwdChk}/>

            <button className="btn bg-lightgreen sz-normal">
                회원가입하기
            </button>
        </form>
    );
}

export default SignUpPage;
