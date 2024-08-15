import styles from "@/styles/practice.module.css";
import { useEffect, useState } from "react";

const Loader = () => {
    const [width, setWidth] = useState(0);
    const increasewidth = () => {
        let interval = setInterval(() => {
            setWidth(prevWidth => {
                if(prevWidth+10 > window.innerWidth){
                    clearInterval(interval);
               }
               return prevWidth+10
            }) 
        }, 10)
    }

    console.log(width)
    useEffect(()=> {
        increasewidth();
    } , [])
  return (
    <div>
      <div className={styles.Loader} style={{width:`${width}px`}}>
       
      </div>
    </div>
  );
};

export default Loader;
