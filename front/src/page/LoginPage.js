import TextField from "../components/common/TextField";
import loginStyles from "../styles/LoginPage.module.css";
import signBtnStyles from "../styles/SignButton.module.css";

import userIcon from './user.svg';
import pwdImg from './pwd.png';

const LoginPage = () => {
    return (
        <div className={loginStyles.container}>
            <h1>로그인</h1>
            <div className={loginStyles.textfield}>
                <img style={{ marginRight: "10px", width: "75%", height: "75%"}} src={userIcon} alt="아이디" />
                <TextField type="text" placeholder="아이디" />
            </div>

            <div className={loginStyles.textfield}>
                <img style={{ marginRight: "10px", width: "75%", height: "75%"}} src={pwdImg} alt="비밀번호" />
                <TextField type="password" placeholder="비밀번호" />
            </div>

            <div className={loginStyles.btnfield}>
                <button className={signBtnStyles.sign}>로그인</button>
                <button className={signBtnStyles.sign}>회원가입</button>
            </div>
        </div>
    );
};

export default LoginPage;