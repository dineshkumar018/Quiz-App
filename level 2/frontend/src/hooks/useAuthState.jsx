// Slices store the data
//Thunks fetch the data
// Hooks give the data to UI in a clean,easy,reusable way

import {useSelector} from "react-redux"

// custom hook => useAuthSlice

const useAuthSlice =() =>{
    const authState =useSelector((state) => state.auth)

    return authState;
}

export default useAuthSlice