import Request from './Request';

const TagReader = function(successCallback, errorCallback){
    let requestMethod = 'POST';
    // Ensure package.json is configured to proxy requests to the Ignition server
    let url = '/main/system/webdev/api/tagRead';
    let payloadKeyName = 'tagPaths';

    let pollConfig = {
        enable: true
    };

    let request = new Request(successCallback, errorCallback, requestMethod, url, payloadKeyName);
    request.setPollConfig(pollConfig);
    request.setTagPaths = request.setBody;
    return request;
}

export default TagReader;
