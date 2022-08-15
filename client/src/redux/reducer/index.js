const initialState = {

    countries: [],
    allCountries: [],
    activities: [],
    allActivities: [],
    countryDetails: {}

};



function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_COUNTRIES':
            return {
                ...state,

                countries: payload.rows,
                allCountries: payload.rows,

            };
        case 'FILTER_BY_REGION':
            const allCountrys = state.allCountries
            const regionFilter = payload === 'All Countries' ? allCountrys : allCountrys.filter(el => el.region === payload)
            return {
                ...state,
                countries: regionFilter,
            };
        case 'FILTER_ACTV_BY_SEASON':
            const allActivities = state.allActivities
            const seasonFilter = payload === 'All Activities' ? allActivities : allActivities.filter(el => el.season === payload)
            return {
                ...state,
                activities: seasonFilter,
            };
        case 'ORDER_BY_NAME':
            let sortedArr;
            switch (payload) {
                case "A to Z":
                    sortedArr = state.countries.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                    break;
                case "Z to A":
                    console.log('Sorting by name desc')
                    sortedArr = state.countries.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    })
                    break;
                case "Low Population":
                    console.log('Sorting by population asc')
                    sortedArr = state.countries.sort(function (a, b) {
                        if (a.population > b.population) {
                            return 1;
                        }
                        if (b.population > a.population) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case 'High Population':
                    console.log('Sorting by population desc')
                    sortedArr = state.countries.sort(function (a, b) {
                        if (a.population > b.population) {
                            return -1;
                        }
                        if (b.population > a.population) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                default: return;
            }


            return {
                ...state,
                countries: sortedArr
            }
        case 'SEARCH_BY_NAME':
            return {
                ...state,
                countries: payload.rows
            }
        case 'GET_COUNTRY_DETAIL':
            return {
                ...state,
                countryDetails: payload
            }
        case 'CLEAR_COUNTRY_DETAIL':
            return {
                ...state,
                countryDetails: [],
            }
        case 'POST_ACTIVITY':
            return {
                ...state,
            };
        case 'GET_ACTIVITIES':
            return {
                ...state,

                activities: payload,
                allActivities: payload,
            };
        case 'REMOVE_ACTIVITY':
            return {
                ...state,
                activities: state.activities.filter(
                    (activity) => activity.id !== payload
                ),
                allActivities: state.allActivities.filter(
                    (activity) => activity.id !== payload
                ),
            };
        default:
            return state;
    }
}
export default rootReducer;