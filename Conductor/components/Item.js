import React from 'react';
import PropTypes from 'prop-types';
import './Item.css';
class Item extends React.Component {
  static propTypes = {
    tree: PropTypes.object,
    cbSetCurrentItem: PropTypes.func
  }
  state = {
    tree: this.props.tree,
    id: this.props.tree.id,
    name: this.props.tree.name,
    type: this.props.tree.type,
    render: false,
  }
  doRender = (EO) => {
    if(this.state.type == "FOLDER")
      this.setState({
        render: !this.state.render
      });
    else {
      this.props.cbSetCurrentItem(this.state.tree);
    }
  }
  renderTree = () => {
    let tree = this.state.tree.children.slice();
    let treeDOM = [];
    tree.forEach(element => {
        let elementDOM = <Item cbSetCurrentItem={this.props.cbSetCurrentItem} key={element.id} tree={element}></Item>;
        treeDOM.push(elementDOM);
    });
    return treeDOM;
  }
  render() {
    return (
        <li className="Item">
        <span 
        className = {`${(this.state.render ? "active" : "")} ${this.state.type.toLowerCase()}`} 
        onClick = {this.doRender}>
        {`${this.state.name}${this.state.type == "FOLDER" ? "" : `.${this.state.type.toLowerCase()}`}`}
        </span>
        {
          this.state.render ? <ul><span>{this.renderTree()}</span></ul> : undefined
        }
        </li>
    );
  }
}

export default Item;