import React, { Component, ReactElement } from 'react';
import { attachOverlay, connectedOverlay, detachOverlay } from '../core/overlay';
import styles from './dropdown.module.scss';
import { createPortal } from 'react-dom';

interface DropdownProps {
  target: ReactElement;
  children: JSX.Element[];
  visible: boolean;
  fillWidth?: boolean;
  minWidth?: number;
  visibleChange: (visible: boolean) => void;
}

class Dropdown extends Component<DropdownProps> {
  targetRef?: HTMLDivElement | null;
  state: DropdownProps;

  connectedOverlay = connectedOverlay();

  constructor(props: DropdownProps) {
    super(props);
    this.state = { ...props };
  }

  shouldComponentUpdate(nextProps: DropdownProps, nextState: DropdownProps) {
    const visible = nextProps.visible;
    if (visible) {
      attachOverlay(this.targetRef, this.connectedOverlay, this.state.fillWidth);
      this.connectedOverlay.classList.add(styles.dropdown);
    } else {
      detachOverlay(visible, this.connectedOverlay);
    }
    return true;
  }

  static getDerivedStateFromProps(props: DropdownProps, state: DropdownProps) {
    return {
      target: props.target,
      children: props.children,
      visible: props.visible,
    };
  }

  componentDidMount() {
    if (!this.state.minWidth && !this.state.fillWidth) {
      this.setState({ minWidth: 200 });
    }
    window.addEventListener('click', this.clickOutside.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutside.bind(this), false);
  }

  clickOutside(event: MouseEvent) {
    if (
      this.state.visible &&
      !this.connectedOverlay.contains(event.target as Node) &&
      !this.targetRef?.contains(event.target as Node)
    ) {
      this.state.visibleChange(false);
    }
  }

  onClickTarget() {
    this.state.visibleChange(!this.state.visible);
  }

  render() {
    return (
      <>
        <div ref={(ref) => (this.targetRef = ref)} onClick={() => this.onClickTarget()}>
          {this.state.target}
        </div>
        {createPortal(this.state.children, this.connectedOverlay)}
      </>
    );
  }
}

export default Dropdown;
