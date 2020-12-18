import axiosWithAuth from '../utils/axiosWithAuth';

export const fetchColors = () => {
    return axiosWithAuth()
        .get('/colors')
        .then((res) => {
            //console.log('colors get res: ', res)
            // setColorList(res.data)
            return res
        })
    }