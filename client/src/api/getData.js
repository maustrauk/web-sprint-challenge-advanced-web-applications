import { axiosWithAuth } from './../utils/axiosWithAuth';

const getData = ( setColorList ) => {
    axiosWithAuth()
    .get('/colors')
    .then(res => {
      setColorList(res.data);
    })
    .catch(err => {
        console.log(err);
    })
};

export default getData;