import { useState, useEffect, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

const useScrollMove = (dom) => {
  const history = useHistory();
  const [scrollInfos, setScrollInfos] = useState(() => localStorage.getItem('scroll_pos'));
  const match = useRouteMatch('/');
  const scrollSave = useCallback(() => {
    const scrollPos = dom ? dom.scrollTop : window.scrollY;
    setScrollInfos(scrollPos);
    return localStorage.setItem('scroll_pos', scrollPos);
  }, [dom]);

  const scrollRemove = useCallback(() => {
    setScrollInfos(0);
    localStorage.removeItem('scroll_pos');
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (match.isExact && location.pathname !== '/') {
        scrollSave();
      }
    });
  }, [history, scrollSave, match]);

  return { scrollInfos, scrollRemove };
};

export default useScrollMove;
