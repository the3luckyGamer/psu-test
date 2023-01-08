/*
 * This class provides a wrapper around the backend
 * it will make it easier to do stuff like error handling
 * and will make it so we have to write less boilerplate
 * in the actual react components
*/

class PsuAPIWrapper {
  // This is still the old api
  static backendURL = "https://next.psu.dev/api/v2/"

  /**
   * Make a request to the backend
   * @param {string} endpoint - E.g /login /auth/me
   * @param {string} [method] - The request method you want to use (GET, POST, etc.), defaults to GET
   * @param {object} [requestData] - Object that will be stringified and sent to backend
   * @param {object} [fetchOptions] - The options you want to pass to the fetch call
   * @returns {Promise<object>} - The data that the API returned, it will follow the format below:
   *
   * {
   *   statusCode: number,
   *   headers: Headers (https://developer.mozilla.org/en-US/docs/Web/API/Headers),
   *   body: object - Parsed JSON response
   * }
   */
   static request(endpoint, method, requestData, fetchOptions) {
     return new Promise(async function(resolve, reject) {
       const finalURL = PsuAPIWrapper.backendURL + endpoint

       const responseObj = {}
       const requestInitObj = {
         method: method || "GET",
         body: JSON.stringify(requestData) || undefined,
         ...(fetchOptions || {})
       }

       const rawResponse = await fetch(finalURL, requestInitObj)
       responseObj.statusCode = rawResponse.status
       responseObj.headers = rawResponse.headers
       
       try {
         responseObj.body = response.json()
       } catch {}
       
       if (!rawResponse.ok || !responseObj.body.success) {
         reject(responseObj) 
         return
       }

       resolve(responseObj)
     })
  }
}

export default PsuAPIWrapper
