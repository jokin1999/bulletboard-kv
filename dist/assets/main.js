var URL = "https://bb.josark.com"

function getkey() {
    let key = document.getElementById("setkey").value;
    if (key == "undefinded" || key == "") {
        alert("A key should be specified.");
        return false;
    }
    return key;
}

function getvalue() {
    let v = document.getElementById("value").value;
    if (v == "undefinded" || v == "") {
        return "";
    }
    return v;
}

function putkey(v) {
    document.getElementById("value").value = v;
}

function readkey() {
    let key = getkey();
    if (key) {
        axios({
            method: 'get',
            url: URL + "/get/" + key,
        }).then((resp) => {
            console.log(resp.data)
            putkey(resp.data);
        }).catch(error => {
            console.log(error);
        });
    }
}


function writekey() {
    let key = getkey();
    let value = getvalue();
    if (key) {
        axios({
            method: 'post',
            url: URL + "/put/" + key,
            data: value,
        }).then((resp) => {
            console.log(resp.data)
            alert("success!")
        }).catch(error => {
            console.log(error);
            alert("error!")
        });
    }
}