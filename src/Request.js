class Request {
    constructor(successCallback, errorCallback, requestMethod, url, payloadKeyName){
        this.requestMethod = requestMethod;
        this.url = url;
        this.payloadKeyName = payloadKeyName;

        this.config = {
            poll: {
                enable: false,
                successRate: 5000,
                errorRate: 60000
            }
        };

        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = () => {
            let DONE = 4;
            let OK = 200;
            let CANCELLED = 0;
            if (this.xhr.readyState === DONE) {
                if (this.xhr.status === OK){
                    let response = JSON.parse(this.xhr.responseText);
                    successCallback(response);
                    if(this.config.poll.enable){
                        this.futureTrigger = setTimeout(()=>this.trigger(), this.config.poll.successRate);
                    }
                } else if (this.xhr.status !== CANCELLED) {
                    errorCallback(this.xhr.status);
                    if(this.config.poll.enable){
                        this.futureTrigger = setTimeout(()=>this.trigger(), this.config.poll.errorRate);
                    }
                }
            }
        };
    }

    setPollConfig = (pollConfig) => {
        Object.assign(this.config.poll, pollConfig);
    }

    setBody = (body) => {
        this._body = body;
        this.trigger();
    }

    trigger = () => {
        // cancel existing executions and currently scheduled future executions
        this.xhr.abort();
        clearTimeout(this.futureTrigger);

        this.xhr.open(this.requestMethod, this.url);
        let body = {};
        body[this.payloadKeyName] = this._body;
        this.xhr.send(JSON.stringify(body));
    };
}

export default Request;
