import { useRef } from 'react';
import Slider from 'react-slick';
// next

// @mui
import { SxProps, useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
//
import Image from '../Image';
import TextMaxLine from '../TextMaxLine';
import { CarouselDots, CarouselArrows } from '../carousel';

// ----------------------------------------------------------------------

type MenuCarouselPropTypes = {
  numberShow?: number;
  products?: any[];
  sx?: SxProps;
};

export default function MenuCarousel({ products, numberShow, sx }: MenuCarouselPropTypes) {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: numberShow,
    slidesToScroll: numberShow,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots(),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <CarouselArrows
        filled
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{
          '& .arrow button': {
            p: 0,
            width: 24,
            height: 24,
            top: -20,
          },
        }}
      >
        <Slider ref={carouselRef} {...settings}>
          {products.map((product) => (
            <Box key={product.name} sx={{ px: 1, textAlign: 'center' }}>
              <Link
                href={product.path}
                color="inherit"
                underline="none"
                sx={{
                  display: 'block',
                  transition: (theme) => theme.transitions.create('all'),
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <Image
                  alt={product.image}
                  src={product.image}
                  ratio="1/1"
                  disabledEffect
                  sx={{ borderRadius: 1, mb: 1 }}
                />
                <TextMaxLine line={2} variant="caption" sx={{ fontWeight: 'fontWeightMedium' }}>
                  {product.name}
                </TextMaxLine>
              </Link>
            </Box>
          ))}
        </Slider>
      </CarouselArrows>
    </Box>
  );
}
