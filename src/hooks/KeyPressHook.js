import { useEffect } from 'react';

export default function useKeypressHook(key, action) {
  useEffect(() => {
    // define event listener
    function onKeyup(e) {
      if (e.key === key) action()
    }
    // register event listener
    window.addEventListener('keyup', onKeyup);
    // unregister event listener
    return () => window.removeEventListener('keyup', onKeyup);
  }, [key, action]);
}