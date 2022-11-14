import React from "react";

import nipplejs from "nipplejs";

export default class ReactNipple extends React.Component<
  { options: any; style: React.CSSProperties; onMove: any },
  { nipple: any }
> {
  container: HTMLElement | null;

  constructor(props: any) {
    super(props);
    this.state = {
      nipple: null,
    };

    this.container = null;
  }

  componentDidMount() {
    const nipple = nipplejs.create({
      zone: this.container,
      ...this.props.options,
    });

    nipple.on("move", this.props.onMove);

    this.setState({ nipple });
  }

  componentWillUnmount() {
    this.state.nipple.destroy();
  }

  render() {
    return (
      <div
        style={this.props.style}
        ref={(container) => {
          this.container = container;
        }}
      ></div>
    );
  }
}
