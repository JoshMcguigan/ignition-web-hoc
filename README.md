# ignition-web-hoc
Ignition web HOC is a React higher order component that makes it easy to build a React application that interacts with [ignition-web-scripts](https://github.com/JoshMcguigan/ignition-web-scripts). 

## Installation

  1. Ensure you have installed [ignition-web-scripts](https://github.com/JoshMcguigan/ignition-web-scripts) as outlined in the README
  2. In the directory of your React app, run the following command:
  
          npm install https://github.com/JoshMcguigan/ignition-web-hoc.git --save 
          
  3. Modify the package.json file in the root of your React application, adding the following:
  
          "proxy": "http://localhost:8088"
  
## Usage

The following React component will display a drop-down list of all of the tags in the root of the default Ignition tag provider for the 'api' project. The name and value of the selected tag are shown below the drop-down.

    import React from 'react';
    import IgnWeb from 'ignition-web-hoc';


    class TagSelector extends React.Component{

        constructor(props){
            super();
            this.state = {};
            props.tagBrowser.setRootPath("");
        }

        updateSelectedTag(selectedTag){
            this.setState({selectedTag: selectedTag});
            this.props.tagReader.setTagPaths([selectedTag]);
        }

        handleChange(e){
            this.updateSelectedTag(e.target.value);
        }

        componentDidUpdate(prevState, prevProps){
            // set default tag choice to first tag in list
            if (!this.state.selectedTag && !this.props.tagBrowser.loading){
                this.updateSelectedTag(this.props.tagBrowser.data.tags[0]);
            }
        }


        render(){
            if(this.props.tagBrowser.loading){
                return <p>loading..</p>
            } else {
                return (
                    <div>
                        <select onChange={(e)=>this.handleChange(e)}>
                            {this.props.tagBrowser.data.tags.map(
                                (tag)=><option value={tag} key={tag}>{tag}</option>
                            )}
                        </select>
                        {
                            this.state.selectedTag && this.props.tagReader.data[this.state.selectedTag] &&
                            <p>{this.state.selectedTag} - {this.props.tagReader.data[this.state.selectedTag].value}</p>
                        }
                    </div>
                );
            }
        }

    }

    export default IgnWeb(TagSelector);

A complete example React application can be found in the [ignition-web-example](https://github.com/JoshMcguigan/ignition-web-example) repository.
