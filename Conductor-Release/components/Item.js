import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Item extends PureComponent {
    static propTypes = {
        tree: PropTypes.object,
        treeDeep: PropTypes.string
    }
    state = {
        drop: false
    }
    toggleItem = () => {
        if(this.props.tree.type == 'FOLDER')
            this.setState({
                drop: !this.state.drop
            });
    }
    showChildren = () => {
        let tree = this.props.tree.children.slice();
        let deep = 1;
        let items = [];
        for(let i = 0;i < tree.length; i++) {
            let item = tree[i];
            let itemDOM = <Item tree={item} treeDeep={`${this.props.treeDeep}-${deep}`} key={`${this.props.treeDeep}-${deep}`}></Item>
            items.push(itemDOM);
            deep++;
        }
        return items; 
    }
    render() {
        return (    
        <li>
            <span className={`${this.props.tree.type.toLowerCase()}`} onClick={this.toggleItem}>{`${this.props.tree.name}${(this.props.tree.type != "FOLDER") ? `.${this.props.tree.type.toLowerCase()}` : (!this.state.drop ? " ↓" : " ↑") }`} </span>
            <ul>{this.state.drop ? this.showChildren() : undefined }</ul>
        </li>
        );
    }
}

export default Item
