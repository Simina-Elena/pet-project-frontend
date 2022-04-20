let countries = []
let cities = []
const fetchCountries = () => {
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.REACT_APP_API_KEY);

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
        .then(response => response.json())
        .then(result => countries.push(...result))
        .catch(error => console.log('error', error));
    return countries;
}

const fetchCities = (country) => {
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.REACT_APP_API_KEY);

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch(`https://api.countrystatecity.in/v1/countries/${country}/cities`, requestOptions)
        .then(response => response.json())
        .then(result => cities.push(...result))
        .catch(error => console.log('error', error));
    console.log(cities)
    return cities;
}

const FetchData = {
    fetchCountries,
    fetchCities
}

export default FetchData