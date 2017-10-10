import Request from './Request';

const TagBrowser = function(successCallback, errorCallback){
    let requestMethod = 'POST';
    // Ensure package.json is configured to proxy requests to the Ignition server
    let url = '/main/system/webdev/api/tagBrowse';
    let payloadKeyName = 'rootPath';

    let request = new Request(successCallback, errorCallback, requestMethod, url, payloadKeyName);
    request.setRootPath = request.setBody;
    return request;
}

export default TagBrowser;
