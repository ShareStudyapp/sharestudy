import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Spinner as OriginalSpinner } from 'spin.js';
import 'spin.js/spin.css';

const style = {
  display: 'block',
  position: 'relative',
  width: '100%',
  height: 100
};

function Spinner({ options }) {
  const containerRef = useRef();

  useEffect(() => {
    const spinner = new OriginalSpinner({
      lines: 11,
      width: 4,
      hwaccel: true,
      color: '#666',
      opacity: 0.1,
      scale: 0.5,
      ...options
    });
    spinner.spin(containerRef.current);
    return () => spinner.stop();
  }, []);

  return <span style={style} ref={containerRef} />;
}

Spinner.propTypes = {
  options: PropTypes.object
};

Spinner.defaultProps = {
  options: {}
};

export default Spinner;
