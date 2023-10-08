import NetInfo from "@react-native-community/netinfo";
import cache from "./Caching";


const apiUrl="https://localhost:7044"

cache.ttlMinutes = 60;

async function getRequestWithCaching(url, data = {}, returnsData = true) {
    
    // Use the original URL as the cache key
    const cacheKey = url

    // Get network state
    const networkState = await NetInfo.fetch()

    // Check if currently offline
    if (!networkState.isConnected) {

        // Load from cache if available (null if not)
        console.log(`OFFLINE: Load from cache: ${cacheKey}`)
        return Promise.resolve(await cache.getItem(cacheKey))
    }
    
    // Build URL with data attached
    url += '?' + new URLSearchParams(data);
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError)

    // Update cache
    console.log(`Updating cache: ${cacheKey}`)
    cache.setItem(cacheKey, await response.clone().json())

    // Return response data if available
    return returnsData ? response.json() : Promise.resolve();
}

async function handleFetchError(response) {

    // Check for errors, e.g. 400, 500
    if (!response.ok) {

        // Check for custom error message from API
        if (response.message) {
            throw Error(`API ${response.status} error: ${response.message}`);
        } else {
            throw Error(`API ${response.status} error: ${response.statusText}`);
        }
    }

    return response;
}

async function postRequest(url, data = {}, returnsData = true) {
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError);

    // Return response data if available
    return returnsData ? response.json() : Promise.resolve();
}



//Get all menu items

export function BeanSceneGetMenuItems() { 
    
    //Call API endpoint:GET/People

    return getRequestWithCaching(`${apiUrl}/MenuItems`)
    .then(response =>{
        //If request/response is successful, return JSON data
        return response
    })


}
export function BeanSceneGetIdentity(extention) { 
    
    //Call API endpoint:GET/${username}/${password}

    return getRequestWithCaching(`${apiUrl}/Staff/${extention}`)
    .then(response =>{
        //If request/response is successful, return JSON data
        return response
    })
}



