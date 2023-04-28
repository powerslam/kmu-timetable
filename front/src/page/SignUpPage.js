import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import TextField from "../components/common/TextField";

import signUpStyle from '../styles/SignUpPage.module.css';
import signButtonStyle from '../styles/SignButton.module.css';

import { LOGIN } from '../lib/variables';

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
            axios.post("https://kmu-timtable-ivort.run.goorm.site/signup", {
                id: email,
                pwd: pwd,
            }).then((res) => {
                if(res.data === 'DUP') alert('이미 등록된 회원입니다.');
                else {
                    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
                    navigate(LOGIN);
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
            
        }
    }

    return (
        <form className={signUpStyle.container} onSubmit={createUser}>
            <h1>회원가입</h1>
            <div className={signUpStyle.textfield}>
                <TextField id="email" type="text" 
                    addClassName={signUpStyle.idfield}
                    placeholder="이메일" 
                    onChange={onChange}
                    value={email} />
            </div>
            
            <div className={signUpStyle.pwdfields}>
                <div style={{  width: "50%", display: "flex", justifyContent: "left"}}>
                    <TextField id="pwd" type="text"
                        addClassName={signUpStyle.pwdfield}
                        placeholder="비밀번호"
                        onChange={onChange}
                        value={pwd} />
                </div>

                <div style={{width: "50%", display: "flex", justifyContent: "right"}}>
                    <TextField id="pwdChk" type="text"
                        addClassName={signUpStyle.pwdfield}
                        placeholder="비밀번호 확인"
                        onChange={onChange}
                        value={pwdChk} />
                </div>
            </div>
            
            <div className={signUpStyle.btnfield}>
                <button className={signButtonStyle.sign}>회원가입하기</button>
            </div>
        </form>
    );
}

export default SignUpPage;
