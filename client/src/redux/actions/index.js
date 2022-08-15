import axios from 'axios';

export const requestLoading = () => {
  return {
    type: 'REQUEST_LOADING',
  };
};

export const getAllCountries = () => {
  return (dispatch) => {
    dispatch(requestLoading());
    axios.get(`/countries`).then((response) => {
      dispatch({
        type: 'GET_COUNTRIES',
        payload: response.data,
      });
    });
  };
};

export const filterByRegion = (payload) => {
  return ({
    type: 'FILTER_BY_REGION',
    payload,
  })
}
export const filterActvBySeason = (payload) => {
  return ({
    type: 'FILTER_ACTV_BY_SEASON',
    payload,
  })
}

export const orderByName = (payload) => {
  return ({
    type: 'ORDER_BY_NAME',
    payload,
  })
}

export const searchByName = (name) => {
  return async function (dispatch) {
    try {
      var json = await axios.get('/countries?name=' + name);
      return dispatch({
        type: 'SEARCH_BY_NAME',
        payload: json.data,
      })
    } catch (error) {
      console.log(error);

    }
  }
}

export const getCountryDetail = (cod3letras) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/countries/${cod3letras}`);
      return dispatch({
        type: 'GET_COUNTRY_DETAIL',
        payload: json.data,
      })
    } catch (error) {
      console.log(error);
    }

  };
};

export const clearCountryDetail = () => {
  return {
    type: 'CLEAR_COUNTRY_DETAIL'
  };
};

export const postActivities = (payload) => {
  return (dispatch) => {

    const response = axios.post(`/activities`, payload);
    dispatch({
      type: 'POST_ACTIVITY',
    });
    return response;
  };
};

export const getActivities = () => {
  return (dispatch) => {
    axios.get(`/activities`).then((response) => {
      dispatch({
        type: 'GET_ACTIVITIES',
        payload: response.data,
      });
    });
  };
};

export const removeActivity = (id) => {
  return (dispatch) => {
    axios.delete(`/activities/${id}`);
    dispatch({
      type: 'REMOVE_ACTIVITY',
      payload: id,
    });
  };
};
