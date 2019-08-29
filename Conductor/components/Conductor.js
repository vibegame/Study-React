import React from 'react';
import PropTypes from 'prop-types';
import "./Conductor.css";
import Item from "./Item";
import Card from './Card'
class Conductor extends React.Component {
    static propTypes = {
        tree: PropTypes.array.isRequired
    }
    state = {
        tree: this.props.tree,
        currentTree: this.props.tree,
        currentItem: null
    }
    setCurrentItem = (item) => {
        this.setState({
            currentItem: item
        });
    }
    renderTree = () => {
        let tree = this.state.currentTree.slice();
        let treeDOM = [];
        let i = 1;
        tree.forEach(element => {
            let elementDOM = <Item treeName={i} cbSetCurrentItem={this.setCurrentItem} key={element.id} tree={element}></Item>;
            treeDOM.push(elementDOM);
            i++;
        });
        return treeDOM;
    }
    render() {
        return (
            <div className="Conductor">
                <ul>
                    {this.renderTree()}
                </ul>
                {this.state.currentItem ? <Card item={this.state.currentItem}/>  : undefined}
            </div>
        );
    }
}
export default Conductor;