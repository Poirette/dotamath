import React, {Component, PropTypes} from 'react';
import RadarPaths from 'paths-js/radar';

function transform(arg) {
  const x = arg[0];
  const y = arg[1];
  return 'translate(' + (Math.floor(x)) + ', ' + (Math.floor(y)) + ')';
}

export default class Radar extends Component {
  static propTypes = {
    fill: PropTypes.string,
    padding: PropTypes.number,
    title: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    rings: PropTypes.number,
    r: PropTypes.number,
    max: PropTypes.number,
    data: PropTypes.array,
    labels: PropTypes.array,
    labelColor: PropTypes.string,
    stroke: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.getCurve = this.getCurve.bind(this);
    this.getRing = this.getRing.bind(this);
  }

  getCurve(curve, i) {
    const path = curve.polygon.path.print();
    const {fill} = this.props;

    return (
      <path key={i} d={path} fill={fill} />
    );
  }

  getRing(ring, i) {
    const { labels, labelColor, stroke } = this.props;
    const path = ring.path.print();
    const points = ring.path.points();

    return (
      <g>
        <g fill="none" stroke="none">
          <path key={i} d={path} stroke={stroke} />
        </g>
        {points.map((point, k) => {
          return i === 2 ? <g fill={labelColor}><text textAnchor="middle" transform={transform(point)}>{labels[k]}</text></g> : null;
        })}
      </g>
    );
  }

  render() {
    if (!this.props.data) return null;

    const { padding, title, x, y, rings, r, max, data } = this.props;
    const height = (padding * 2) + y;
    const width = (padding * 2) + x;

    const paths = RadarPaths({ // eslint-disable-line new-cap
      data: data,
      max: max,
      r: r,
      rings: rings,
      center: [ x / 2, y / 2 ]
    });

    return (
      <div>
        <h2 style={{color: '#00b8d4', textAlign: 'center'}}>{title}</h2>
        <svg
          height={height}
          width={width}
          style={{display: 'block', margin: 'auto'}}>
          <g transform={'translate(' + [padding, padding].join(',') + ')'}>
            <title>{title}</title>
            {paths.rings.map(this.getRing)}
            <g opacity="0.6">
              {paths.curves.map(this.getCurve)}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}
