class HttpService {

    get(url) {

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());


         //Requisição ajax na unha
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();
            
        //     xhr.open('GET', url);
        //     xhr.onreadystatechange = () => {
        //         if (xhr.readyState == 4 && xhr.status == 200) {
        //             if (xhr.status == 200) {
        //                 resolve(JSON.parse(xhr.responseText));
        //             } else {
        //                 console.log(xhr.responseText);
        //                 reject(xhr.responseText);
        //             }
        //         }
        //     }
        //     xhr.send();
        // })
    }

    _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);

        return res;
    }
}