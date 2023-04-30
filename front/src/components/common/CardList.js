import "../../styles/CardList.css";
import { weekly, NULL_STR } from "../../lib/variables";

import Card from "./Card";

const CardList = () => {
    return (
        <div className="CardList">{
            weekly[0].daytime.time.map((v, i) => {
                console.log(v);
                if(v === NULL_STR) return null;
                return <Card key={i} sbj_nm={v}/>
            })
        }</div>
    )
}

export default CardList;