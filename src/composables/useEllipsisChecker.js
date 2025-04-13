import { ref } from 'vue';

export function useEllipsisChecker() {
  const isEll = ref([]);

  const checkEllipsis = (el, index) => {
    const target = el.target;
    if (!target) return;
    isEll.value[index] = target.scrollWidth > target.clientWidth;
  };

  return {
    isEll,
    checkEllipsis,
  };
}
