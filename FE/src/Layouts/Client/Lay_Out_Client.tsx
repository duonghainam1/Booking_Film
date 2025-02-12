import { Outlet } from "react-router-dom"
import Header_Client from "../../Components/Layouts/Client/Header_Client"
import Footer_Client from "../../Components/Layouts/Client/Footer_Client"

const Lay_Out_Client = () => {
    return (
        <div className="bg-[#10141B] *:text-white">
            <Header_Client />
            <main className="mt-[80px]">
                <Outlet />
            </main>
            <Footer_Client />
        </div>
    )
}

export default Lay_Out_Client