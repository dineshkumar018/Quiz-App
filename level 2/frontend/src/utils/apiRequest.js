async function apiRequest(options){
    //destructure the options to get the endpoint, methods....
    const {
        endpoint,
        method ="GET",
        includeAuth = true,
        body=undefined,
    } = options;

    //create a new headers object
    const headers = new Headers()
    
    //if the body is an object, set the "Content-Type" header to "application/json" and stringyfy the body
    //body: {email:"xyz@gmail.com", password:"123445"}

    let requestBody = body;
    if(body && typeof body === "object"){
        headers.append("Content-Type", "application/json");
        requestBody=JSON.stringify(requestBody)
    }

    //If includeAuth is true and there ia an access token in LS, append in "Authorization header with access token"
    //Authorization: Bearer 642374624726482hwgfjhgfjyftghgsdfhdsfg
    if(includeAuth && localStorage.getItem("accessToken")){
        headers.append(
            "Authorization",
            `Bearer ${localStorage.getItem("accessToken")}`
        )
    }

    //create a new URL object the base URL from the enviroment variables and the endpoints

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const url = new URL(endpoint, baseUrl)

    //Make a fetch req to the API endpoint with specific methods,headers and body

    const response = await fetch(url, {
        method, 
        headers, 
        body:requestBody
    });
    //Return the response from the API
    return response;
}

export default apiRequest