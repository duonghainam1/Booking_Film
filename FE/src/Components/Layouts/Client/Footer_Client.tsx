import { Link } from "react-router-dom"
import fb from "../../../assets/img/fb.jpg"
import zalo from "../../../assets/img/zalo.jpg"
import instagram from "../../../assets/img/instagram.jpg"
import ytb from "../../../assets/img/youtobe.jpg"
import tiktok from "../../../assets/img/tiktok.jpg"
const Footer_Client = () => {
    return (
        <div className="bg-[#000000] text-white flex flex-col justify-center gap-y-7 h-[300px]">
            <ul className="flex items-center justify-center gap-4">
                <li><Link to="">Chính sách</Link></li>
                <li><Link to="">Lịch chiếu</Link></li>
                <li><Link to="">Giá vé</Link></li>
                <li><Link to="">Liên hệ</Link></li>
            </ul>
            <div className="flex items-center justify-center gap-6 *:w-[40px] *:rounded-lg">
                <img src={fb} alt="" />
                <img src={zalo} alt="" />
                <img src={instagram} alt="" />
                <img src={ytb} alt="" />
                <img src={tiktok} alt="" />
            </div>
            <div className="text-center">
                <p>Địa chỉ: 123 Phan Văn Trị, Phường 10, Quận Gò Vấp, TP.Hồ Chí Minh</p>
                <p>Điện thoại: 0123456789</p>

            </div>
        </div>
    )
}

export default Footer_Client