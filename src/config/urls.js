
const environment = 'development';
const serverUrl = 'dashboard.tallah.co';


export default {
   apiurl : process.env.ENV === 'development' 
              ? '' 
              : serverUrl,
   host : serverUrl,
}