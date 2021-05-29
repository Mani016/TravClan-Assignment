import superagent from 'superagent';
const API_ROOT = 'https://intense-tor-76305.herokuapp.com/';
const responseBody = res => res.body;

const requests = {

    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .then(responseBody)
};
const Customers = {
    list: () => requests.get('merchants'),
}
const agent = {
    Customers
} 
export default agent
