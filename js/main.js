let api_url = "http://127.0.0.1:8000/api/predict/"



document.getElementById("result").style.display = "none";
let input = document.getElementById("input-box");
let button = document.getElementById("button");

let getPrediction = (url, callback) => {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = () => {

        let status = xhr.status;

        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };

    xhr.send();
};

let predict = () => {

    document.getElementById("result").style.display = "block";
    document.getElementById("loading").style.display = "block";
    document.getElementById('fake').style.display = "none";
    document.getElementById('error').style.display = "none";
    document.getElementById('no-user').style.display = "none";
    document.getElementById('real').style.display = "none";
    document.getElementById('insta').style.display = "none";
    document.getElementById('username').style.display = "none";
    document.getElementById('line-2').style.display = "none";


    setTimeout(
        getPrediction(api_url + input.value, (err, data) => {

            document.getElementById("loading").style.display = "none";
            if (err != null) {

                console.error(err);
                document.getElementById('error').style.display = "block";
                document.getElementById('no-user').style.display = "block";

            } else {
                let is_real = data['is_real'];
                let username = data['userid'];

                console.log(is_real)
                console.log(username)

                document.getElementById('insta').style.display = "block";
                document.getElementById('username').style.display = "block";
                document.getElementById('username').innerHTML = username;

                if (is_real) {
                    document.getElementById('real').style.display = "block";
                } else {
                    document.getElementById('line-2').style.display = "flex";
                    document.getElementById('fake').style.display = "block";
                }
            }

            button.value = "Detect Another";
        }), 6000);
}

