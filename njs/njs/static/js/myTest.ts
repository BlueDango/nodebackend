function sendRequest(requestType: string, url: string, postData: string) {
    var oReq: XMLHttpRequest = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open(requestType, url, true);
    oReq.send(postData);
}

function reqListener(): void {
    var childNode: HTMLElement = document.getElementById("msgNode");
    var p: HTMLElement = document.createElement("p");
    p.id = "msgNode";
    p.innerHTML = this.responseText;
    if (childNode) {
        document.getElementById("msgArea").replaceChild(p, childNode);
    } else {
        document.getElementById("msgArea").appendChild(p);
    }
}