import React, { Component, PropTypes } from 'react';
import { ListItem as ListItemToolbox } from 'react-toolbox';

export default class ListItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    key: PropTypes.string,
    avatar: PropTypes.string,
    caption: PropTypes.string,
    legend: PropTypes.string,
    rightIcon: PropTypes.string
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const styles = require('./ListItem.scss');
    const {
      onClick,
      key,
      avatar,
      caption,
      legend,
      rightIcon
    } = this.props;

    return (
       <ListItemToolbox
          className={styles.item}
          onClick={onClick}
          key={'_sub_' + key}
          avatar={avatar}
          caption={caption}
          legend={legend}
          rightIcon={rightIcon}
        />
    );
  }
}
