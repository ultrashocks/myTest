import { ref, onMounted, onUpdated } from 'vue';

export function useScrollChecker(containerRef) {
  const hasVerticalScroll = ref(false);

  const checkScroll = () => {
    const el = containerRef.value;
    if (!el) return;
    hasVerticalScroll.value = el.scrollHeight > el.clientHeight;
  };

  onMounted(checkScroll);
  onUpdated(checkScroll);

  return {
    hasVerticalScroll,
    checkScroll,
  };
}
