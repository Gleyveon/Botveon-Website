import { useEffect, useState } from "react";

export function useCountUp(target: number | undefined, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === undefined) return;

    let start = 0;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(animate);

    // Reset if target changes
    return () => setCount(0);
  }, [target, inView, duration]);

  return count;
}