const utils = {
    // 'ASC' | 'DESC'
    sortArray: (array, sortType) => {
        // cách viết 1
        switch (sortType) {
            case 'ASC':
                // logic sắp xếp
                array.sort((a, b) => {
                    return a - b;
                })
                break;
            case 'DESC':
                // logic sắp xếp
                array.sort((a, b) => {
                    return -a + b;
                })
                break;
            default:
                break;
        }
        // cách viết 2
        array.sort((a, b) => {
            return sortType === 'ASC' ? a - b :
                (sortType === 'DESC' ? b - a : 0);
        })
    },
    squareArray: (array) => {
        return array.map((item) => item * item);
    }
}
export default utils;