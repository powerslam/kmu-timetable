import { useServiceState } from "../../lib/ServiceContext";
import NeedLoginPage from "../../page/NeedLoginPage";

const AuthPage = ({ children }) => {
    const { isLogin } = useServiceState();
    
    return (
        !isLogin ? <NeedLoginPage /> :
        <div className="w-full h-fit flex flex-col items-center justify-center mt-4">
            { children }
        </div>
    )
};

export default AuthPage;
