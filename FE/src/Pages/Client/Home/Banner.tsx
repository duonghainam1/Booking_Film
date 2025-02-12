import { Carousel } from 'antd'; // Import Carousel từ antd
import { useMovies } from '../../../Common/Hook/Movies/useMovies';
import { Link } from 'react-router-dom';

const Banner = () => {
    const { data } = useMovies();
    console.log(data);

    return (
        <Carousel
            autoplay
            dotPosition="bottom"
            arrows
            infinite
            effect="fade"
        >
            {data?.docs?.map((poster: any, index: number) => (
                poster?.status === 'Showing' &&
                <div key={index}>
                    <Link to={`/movies/${poster._id}`}>
                        <img
                            src={poster?.banner}
                            className="h-[650px] w-full object-cover"
                            alt={`Poster ${index + 1}`}
                        />
                    </Link>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
