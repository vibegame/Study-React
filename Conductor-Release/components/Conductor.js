import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import './Conductor.css'
class Conductor extends Component {
    static propTypes = {
        tree: PropTypes.array
    }
    renderTree = () => {
        let tree = this.props.tree.slice();
        let deep = 1;
        let items = [];
        for(let i = 0;i < tree.length; i++) {
            let item = tree[i];
            let itemDOM = <Item tree={item} treeDeep={`${deep}`} key={`${deep}`}></Item>
            items.push(itemDOM);
            deep++;
        }
        return items;
    }
    render() {
        return (
            <div className="Conductor">
                <ul>
                    {this.renderTree()}
                </ul>
            </div>
        )
    }
}
export default Conductor
