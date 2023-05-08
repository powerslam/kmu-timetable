import { useServiceState } from "../../lib/ServiceContext";
import NeedLoginPage from "../../page/NeedLoginPage";

const AuthPage = ({ children }) => {
    const { isLogin } = useServiceState();
    
    return (
        !isLogin ? <NeedLoginPage /> :
        <div className="Auth-Page Auth-Page-Margin-Top Scroll">
            { children }
        </div>
    )
};

export default AuthPage;
