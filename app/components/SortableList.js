import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class SortableList extends Component {
  constructor(props) {
    super(props);

    this.dragged = null;

    // TODO:
    const data = JSON.parse(JSON.stringify(props.data));
    this.state = { data };

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragOver = this.dragOver.bind(this);

    this.renderer = props.listElementRenderer || this.defaultListElementRenderer.bind(this);
  }

  componentDidMount() {
    this.placeholder = document.createElement('li');
    this.placeholder.className = 'placeholder';
  }

  componentWillReceiveProps(nextProps) {
    // TODO:
    const data = JSON.parse(JSON.stringify(nextProps.data));
    this.setState({ data });
  }

  componentWillUnmount() {
    document.removeChild(this.placeholder);
  }

  dragStart(e) {
    const ee = e;

    this.dragged = e.currentTarget;
    this.dragged.style.opacity = 0.4;
    ee.dataTransfer.effectAllowed = 'move';

    ee.dataTransfer.setData('text/html', e.currentTarget);
  }

  dragEnd() {
    this.dragged.style.display = 'block';
    this.dragged.style.opacity = 1;
    this.dragged.parentNode.removeChild(this.placeholder);

    // Update state
    const data = this.state.data;
    const from = parseInt(this.dragged.dataset.id, 10);
    let to = parseInt(this.over.dataset.id, 10);

    if (from < to) {
      to--;
    }
    if (this.nodePlacement === 'after') {
      to++;
    }

    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ data });

    this.dragged = null;

    // trigger event when replaced
    const evt = new CustomEvent('MouseEvents', { detail: { data, from, to } });
    evt.initEvent('itemPlaceChanged', true, true);
    ReactDOM.findDOMNode(this).dispatchEvent(evt);
  }

  dragOver(e) {
    e.preventDefault();

    if (this.dragged === null || e.target.className === 'placeholder') {
      return;
    }

    this.over = e.target;
    while (this.over.className !== 'sortable-list-el') {
      this.over = this.over.parentNode;
      if (this.over === window) {
        break;
      }
    }

    const parent = this.over.parentNode;

    const diff = e.clientY - this.over.offsetTop;
    const height = (this.over.offsetHeight - 10) / 2;

    if (diff > height) {
      this.nodePlacement = 'after';
      parent.insertBefore(this.placeholder, this.over.nextElementSibling);
    } else if (diff < height) {
      this.nodePlacement = 'before';
      parent.insertBefore(this.placeholder, this.over);
    }
  }

  defaultListElementRenderer(element) {
    return <span>{element}</span>;
  }

  renderListElement(element, index) {
    return (
      <li
        className="sortable-list-el"
        key={index}
        data-id={index}
        draggable="true"
        onDragEnd={this.dragEnd}
        onDragStart={this.dragStart}
      >
        {this.renderer(element, index)}
      </li>
    );
  }

  render() {
    return (
      <ul className="sortable-list" data-name={this.props.name} onDragOver={this.dragOver}>
        {this.state.data.map((...args) => this.renderListElement.apply(this, args))}
      </ul>
    );
  }
}

SortableList.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array.isRequired,
  listElementRenderer: PropTypes.func,
};

export default SortableList;
