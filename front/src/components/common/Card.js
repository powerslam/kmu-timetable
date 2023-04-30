import "../../styles/CardList.css";

const Card = ({ sbj_nm }) => {
    return (
        <div className="Card">
            <div className="font-bold text-3xl mb-2 px-6 py-4 max-sm:text-xl max-lg:text-2xl">{sbj_nm}</div>
            <div className="flex flex-row items-center justify-center max-md:flex-col">
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 max-md:mb-2">남은 시간</span>
                <span className="mx-2">남았습니다.</span>
            </div>
        </div>  
    );
};

export default Card;
