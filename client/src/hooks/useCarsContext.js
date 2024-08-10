import { CarsContext } from "../context/carContext";
import { useContext } from "react";

export const useCarsContext =() => {
    const context = useContext(CarsContext)

    if(!context){
        throw Error("useCarsContext must be used under CarContextProvider")
    }

    return context
}