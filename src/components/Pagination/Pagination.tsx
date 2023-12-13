import * as S from './Pagination.styles';

import nextIcon from '../../assets/icons/next.svg';
import prevIcon from '../../assets/icons/prev.svg';

type Props = {
    count: number;
    onPageChange: (page: number) => void;
    pageNumber: number;
};

const Pagination = ({ count, onPageChange, pageNumber }: Props) => {
    const totalPages = Math.ceil(count / 30);

    const handleNextClick = () => {
        onPageChange(pageNumber + 1);
    };

    const handlePrevClick = () => {
        onPageChange(pageNumber - 1);
    };

    return (
        totalPages > 1 && (
            <S.Pagination>
                <S.ArrowBtn
                    onClick={handlePrevClick}
                    disabled={pageNumber === 1}
                >
                    <img src={prevIcon} />
                </S.ArrowBtn>
                <S.Count>
                    {pageNumber}/{totalPages}
                </S.Count>
                <S.ArrowBtn
                    onClick={handleNextClick}
                    disabled={pageNumber === totalPages}
                >
                    <img src={nextIcon} />
                </S.ArrowBtn>
            </S.Pagination>
        )
    );
};

export default Pagination;
