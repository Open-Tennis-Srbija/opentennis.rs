// directives/click-outside.js
const handlers = new Map()

function globalClickHandler(event) {
  for (const [el, getHandler] of handlers.entries()) {
    if (!(el === event.target || el.contains(event.target))) {
      const handler = typeof getHandler === 'function' ? getHandler() : getHandler
      handler?.(event)
    }
  }
}

export default {
  mounted(el, binding) {
    if (typeof window === 'undefined') return

    // Store a getter function to always get the latest handler
    handlers.set(el, () => binding.value)

    if (handlers.size === 1) {
      document.addEventListener('click', globalClickHandler)
    }
  },
  beforeUnmount(el) {
    if (typeof window === 'undefined') return

    handlers.delete(el)

    if (handlers.size === 0) {
      document.removeEventListener('click', globalClickHandler)
    }
  }
}
