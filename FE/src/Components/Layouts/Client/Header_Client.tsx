import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/logo phim.png';
// import { SearchOutlined } from '@ant-design/icons';
import { useLocalStorage } from '../../../Common/Hook/useStorage';
import { useAuth } from '../../../Common/Hook/Auth/useAuth';
import { mutationAuth } from '../../../Common/Hook/Auth/mutationAuth';

const Header_Client = () => {
    const [user, setUser] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const { data } = useAuth(userId);
    const { mutate } = mutationAuth("LOG_OUT");
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        mutate(data?.data?.user?._id, {
            onSuccess: () => {
                setUser({});
                navigate("/");
            },
        });
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#10141B] opacity-80' : 'bg-[#10141B] opacity-100'}`}>
            <div className='flex items-center justify-between mr-[60px] p-4 h-20'>
                <div>
                    <img src={logo} alt="Logo" className='w-[166px]' />
                </div>
                <ul className='flex gap-6'>
                    <li><Link to="/" className="text-white transition-all duration-300">Trang chủ</Link></li>
                    <li><Link to="/showTime" className="text-white transition-all duration-300">Lịch chiếu</Link></li>
                    <li><Link to="/ticket" className="text-white transition-all duration-300">Giá vé</Link></li>
                    <li><Link to="/about" className="text-white transition-all duration-300">Giới thiệu</Link></li>
                </ul>
                <div className='flex gap-6'>
                    <div className='flex items-center justify-center rounded-full w-12 h-12 hover:bg-[#6387FF] transition-all duration-300'>
                        {/* <SearchOutlined style={{ fontSize: 24 }} /> */}
                    </div>
                    {userId ? (
                        <div className="flex items-center gap-4">
                            <span className="text-white">Xin chào, {data?.data?.user?.username}</span>
                            <button
                                className="rounded-full bg-red-500 text-white w-[120px] h-[50px] hover:bg-red-700 transition-all duration-300"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/signup">
                                <button className='rounded-full border border-white bg-[#10141B] text-white w-[120px] h-[50px] hover:bg-[#6387FF] hover:border-none transition-all duration-300'>
                                    Đăng ký
                                </button>
                            </Link>
                            <Link to="/signin">
                                <button className='rounded-full bg-[#6387FF] text-white w-[120px] h-[50px] hover:bg-[#10141B] hover:border transition-all duration-300'>
                                    Đăng nhập
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header_Client;
