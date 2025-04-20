import Navbar from "../Navbar"


const CustomLayout = ({children}) =>{
    return(
        <>
            <Navbar />
           {children}
        </>
    )
}

export default CustomLayout