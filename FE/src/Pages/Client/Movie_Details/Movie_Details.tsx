import { useParams } from "react-router-dom";
import { useMovies } from "../../../Common/Hook/Movies/useMovies";
import { useEffect, useState } from "react";
import Seat from "../../../Components/Item/Seat";

const Movie_Details = () => {
    const { id } = useParams();
    const { data } = useMovies(id);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showtimesForSelectedDate, setShowtimesForSelectedDate] = useState<any[]>([]);
    const [selectedShowtime, setSelectedShowtime] = useState<any | null>(null);

    useEffect(() => {
        if (data?.showtimes?.length > 0) {
            const firstDate = data.showtimes[0]?.dates[0]?.date;
            if (firstDate) {
                setSelectedDate(firstDate);
            }
        }
    }, [data]);

    useEffect(() => {
        if (data?.showtimes?.length > 0 && selectedDate) {
            const showtimes = data.showtimes
                .map((item: any) =>
                    item?.dates
                        .filter((date: any) => date.date === selectedDate)
                        .map((date: any) => date.showtimes)
                )
                .flat();
            setShowtimesForSelectedDate(showtimes);
        }
    }, [selectedDate, data]);

    const handleBack = () => {
        setSelectedShowtime(null);
    };

    // Kiểm tra trạng thái phim
    const movieStatus = data?.movie?.status;

    return (
        <div className="bg-black bg-opacity-50">
            {/* Banner */}
            <div className="relative">
                <img
                    src={data?.movie?.poster}
                    alt="Banner"
                    className="rounded-xl h-[650px] w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-8 bg-black bg-opacity-50">
                    <img src={data?.movie?.poster} alt="" className="w-[350px] h-[450px] rounded-lg" />
                    <div className="space-y-1">
                        <h1 className="text-3xl font-medium">{data?.movie?.title}</h1>
                        <div className="flex items-center gap-4">
                            <span>{data?.movie?.genres?.name}</span>
                            <span>{data?.movie?.country}</span>
                            <span>{data?.movie?.duration} phút</span>
                            <span>Đạo diễn: {data?.movie?.director}</span>
                        </div>
                        <p>Khởi chiếu: {new Date(data?.movie?.releaseDate).toLocaleDateString()}</p>
                        <p className="w-[500px] mt-4 line-clamp-4">{data?.movie?.description}</p>
                        <div className="pt-10 flex items-center justify-between gap-4">
                            <p>Chi tiết nội dùng</p>
                            <button className="border border-blue-400 rounded-full w-[120px] h-[40px]">Xem trailer</button>
                        </div>
                    </div>

                </div>

            </div>

            {/* Nếu phim sắp chiếu thì không hiển thị lịch chiếu */}
            {movieStatus === "Coming_soon" ? (
                <div className="py-8 text-center text-white bg-[#10141B] h-[110px]">
                    {/* <p className="text-xl">Phim này hiện chưa có suất chiếu. Hãy đợi đến ngày ra mắt!</p> */}
                </div>
            ) : (
                <div className="bg-[#10141B]">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-center gap-8">
                            <div className="flex gap-4">
                                {data?.showtimes?.map((item: any) =>
                                    item?.dates.map((date: any, index: number) => {
                                        const isSelected = selectedDate === date.date;
                                        const isDisabled = selectedShowtime !== null;
                                        return (
                                            <button
                                                key={index}
                                                className={`h-[110px] w-[90px] px-1 text-white ${isSelected ? "bg-red-500" : ""
                                                    }`}
                                                onClick={() => !isDisabled && setSelectedDate(date.date)}
                                                disabled={isDisabled}
                                            >
                                                {new Date(date.date).toLocaleDateString()}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {movieStatus === "Showing" && (
                <div className="mt-4">
                    {selectedShowtime ? (
                        <Seat data={selectedShowtime} onBack={handleBack} />
                    ) : (
                        <div className="py-8 max-w-6xl mx-auto grid grid-cols-5 gap-6">
                            {showtimesForSelectedDate?.map((showtimes: any) =>
                                showtimes?.map((a: any) => (
                                    <button
                                        key={a._id}
                                        className="bg-[#10141B] border border-slate-700 text-white p-2 rounded-full"
                                        onClick={() => setSelectedShowtime(a)}
                                    >
                                        {new Date(a?.start_time).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false
                                        })}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Movie_Details;
