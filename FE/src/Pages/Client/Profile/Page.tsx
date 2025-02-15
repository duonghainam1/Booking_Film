import { useState } from "react";
import Account from "./_components/Account";
import Ticket from "./_components/Ticket";
import IsLoading from "../../../Components/Loading/IsLoading";

const Page = () => {
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleTabChange = (tabIndex: any) => {
        setLoading(true);
        setTimeout(() => {
            setActive(tabIndex);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="container mx-auto mb-6 min-h-[500px]">
            <h1 className="text-center font-bold text-xl my-4 pt-10">Thông tin cá nhân</h1>
            <div className="flex justify-center items-center gap-4">
                <button
                    className={`w-[200px] font-bold rounded-full py-2 mt-4 transition-all duration-300 ${active === 0
                        ? "bg-gradient-to-tr from-[#6387FF] to-[#FF4747] text-white"
                        : "border border-gray-500 text-white"
                        }`}
                    onClick={() => handleTabChange(0)}
                >
                    Thông tin tài khoản
                </button>

                <button
                    className={`w-[200px] font-bold rounded-full py-2 mt-4 transition-all duration-300 ${active === 1
                        ? "bg-gradient-to-tr from-[#6387FF] to-[#FF4747] text-white"
                        : "border border-gray-500 text-white"
                        }`}
                    onClick={() => handleTabChange(1)}
                >
                    Lịch sử mua vé
                </button>
            </div>
            <div className="mt-6">
                {loading ? <IsLoading /> : active === 0 ? <Account /> : <Ticket />}
            </div>
        </div>
    );
};

export default Page;
