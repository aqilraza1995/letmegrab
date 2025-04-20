import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CustomCarousel = ({ data, thumbWidth, autoPlay = true, infiniteLoop = true, showThumbs = false, emulateTouch = true, dynamicHeight = false, stopOnHover = true, swipeable = true, showArrows = true }) => {
    return (
        <Box
            sx={{
                height: 'auto',
                width: '90%',
                margin: 'auto',
                backgroundColor: '#f5f2f1 ',
                overflow: 'hidden',
            }}
        >
            <Carousel
                autoPlay={autoPlay}
                infiniteLoop={infiniteLoop}
                showThumbs={showThumbs}
                showStatus={showThumbs}
                emulateTouch={emulateTouch}
                dynamicHeight={dynamicHeight}
                stopOnHover={stopOnHover}
                swipeable={swipeable}
                showArrows={showArrows}
                thumbWidth={thumbWidth}
            >
                {data?.map((src, index) => (
                    <div
                        key={index}
                        style={{
                            width: '100%',
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={src}
                            alt={`Product ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </Box>
    );
};

export default CustomCarousel;