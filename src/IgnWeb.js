import React from 'react';
import TagReader from './TagReader';
import TagBrowser from './TagBrowser';

function IgnWeb(WrappedComponent){
    class IgnWeb extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                tagReader: {
                    loading: true,
                    error: false,
                    data: {}
                },
                tagBrowser: {
                    loading: true,
                    error: false,
                    data: {}
                }

            };

            this.tagReader = new TagReader(
                this.tagReaderSuccessCallback,
                this.tagReaderErrorCallback
            );

            this.tagBrowser = new TagBrowser(
                this.tagBrowserSuccessCallback,
                this.tagBrowserErrorCallback
            );
        }

        tagReaderSuccessCallback = (response) => {
            let newState = {
                tagReader: {
                    loading: false,
                    error: false,
                    data: response
                }
            };
            this.setState(newState, ()=>{
                if(typeof this._tagReaderSuccessCallback === 'function'){
                    this._tagReaderSuccessCallback();
                }
            });
        }

        tagReaderSetSuccessCallback = (callback) => {
            this._tagReaderSuccessCallback = callback;
        }

        tagReaderErrorCallback = (status) => {
            let newState = {
                tagReader: {
                    error: true
                }
            };
            this.setState(newState);
        }

        tagBrowserSuccessCallback = (response) => {
            let newState = {
                tagBrowser: {
                    loading: false,
                    error: false,
                    data: response
                }
            };
            this.setState(newState, ()=>{
                if(typeof this._tagBrowserSuccessCallback === 'function'){
                    this._tagBrowserSuccessCallback();
                }
            });
        }

        tagBrowserSetSuccessCallback = (callback) => {
            this._tagBrowserSuccessCallback = callback;
        }

        tagBrowserErrorCallback = (status) => {
            let newState = {
                tagBrowser: {
                    error: true
                }
            };
            this.setState(newState);
        }

        render(){
            let tagReader = this.state.tagReader;
            tagReader.trigger = this.tagReader.trigger;
            tagReader.setTagPaths = this.tagReader.setTagPaths;
            tagReader.setSuccessCallback = this.tagReader.setSuccessCallback;
            tagReader.setPollConfig = this.tagReader.setPollConfig;

            let tagBrowser = this.state.tagBrowser;
            tagBrowser.trigger = this.tagBrowser.trigger;
            tagBrowser.setRootPath = this.tagBrowser.setRootPath;
            tagBrowser.setSuccessCallback = this.tagBrowserSetSuccessCallback;
            tagBrowser.setPollConfig = this.tagReader.setPollConfig;

            return (
                <WrappedComponent
                    {...this.props}
                    tagReader={tagReader}
                    tagBrowser={tagBrowser}
                />
            );
        }
    }

    IgnWeb.displayName = `IgnWeb(${getDisplayName(WrappedComponent)})`;
    return IgnWeb;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default IgnWeb;
