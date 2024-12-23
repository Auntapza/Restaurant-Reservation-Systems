class Api {

    get(link:string, option?:object) {
        const fetchRes = fetch(link, {
            credentials: "include",
            ...option
        }).then(async (response) => {
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.msg || 'Fetch Api Fail');
            }
            return response.json();
        });
        return fetchRes
    }

    post(link:string, body:object){
        const fetchRes = fetch(link, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              'content-type': 'application/json'
            },
            credentials: "include"
          }).then(async (response) => {
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.msg || 'Fetch Api Fail');
            }
            return response.json();
          });
        return fetchRes;
    }
    
    put(link:string, body:object){
        const fetchRes = fetch(link, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
              'content-type': 'application/json'
            }
          }).then(async (response) => {
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.msg || 'Fetch Api Fail');
            }
            return response.json();
          });
        return fetchRes;
    }

    delete(link:string){
        const fetchRes = fetch(link).then(async (response) => {
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.msg || 'Fetch Api Fail');
            }
            return response.json();
          });
        return fetchRes;
    }

}

export default new Api