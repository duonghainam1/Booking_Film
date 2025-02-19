import { useShow_time } from "../../../Common/Hook/Show_Time/useShow_time";
const Show_Schedule_Page = () => {
    const { data } = useShow_time()
    return (
        <div className="container mx-auto">
            <h1 className="text-center text-xl font-bold">Lịch chiếu phim</h1>
            <div className="flex justify-center gap-4 mt-4">
                <button className="border border-gray-600 rounded-lg flex justify-center items-center px-4 bg-gradient-to-tr from-[#FF4747] to-[#6387FF] py-2">19-02-2025</button>
                <div className="border border-gray-600 rounded-lg flex justify-center items-center px-4 py-2">19-02-2025</div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-6">
                {data?.docs?.map((item: any) => {
                    console.log(item);

                    return (
                        <div className="border border-[#5C687F] flex gap-2 rounded-lg">
                            <div className="w-[30%]">
                                <img src={item?.movieId?.poster} alt="" className="w-[250px] h-full rounded-tl-lg rounded-bl-lg" />
                            </div>
                            <div className="w-[70%] p-4">
                                <div className="flex items-end justify-between gap-4 mb-2">
                                    <div className="flex gap-4">
                                        <p className="text-[#5C687F] font-bold">{item?.movieId?.genres?.name}</p>
                                        <p className="text-[#5C687F] font-bold">{item?.movieId?.duration} Phút</p>
                                    </div>
                                    <span className="border rounded-lg w-[60px] h-[40px] flex justify-center items-center">2D</span>
                                </div>
                                <div>
                                    <h2 className="font-bold text-xl">{item?.movieId?.title}</h2>
                                    <p className="py-1">Xuất xứ: {item?.movieId?.country}</p>

                                    <p>{new Date(item?.movieId?.releaseDate).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    {item?.dates?.map((date: any) => (
                                        date?.showtimes?.map((showtime: any) => (
                                            <div className="flex justify-center items-center rounded-lg bg-[#10141B] text-white border w-[80px] h-[40px]">{new Date(showtime?.start_time).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</div>
                                        ))
                                    ))}

                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Show_Schedule_Page