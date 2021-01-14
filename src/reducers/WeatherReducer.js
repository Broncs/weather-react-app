export const WeatherReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "SET_DATA":
      return {
        ...state,
        weather: action.weather,
      };
    case "SET_QUERY":
      return {
        ...state,
        query: action.query,
      };
    case "SET_LOCATION":
      return {
        ...state,
        location: { ...action.payload },
      };
    default:
      return state;
  }
};
