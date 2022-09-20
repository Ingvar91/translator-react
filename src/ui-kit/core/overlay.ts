const overlayId = 'overlay_container';
const overlayConnectedClassName = 'overlay_connected';

function containerOverlay(): HTMLElement {
  let el = document.getElementById(overlayId);
  if (!el) {
    el = document.createElement('div');
    el.setAttribute('id', overlayId);
    document.body.appendChild(el);
  }
  return el;
}

export function connectedOverlay(): HTMLElement {
  let el = document.createElement('div');
  el.setAttribute('class', overlayConnectedClassName);
  return el;
}

export function attachOverlay(
  targetRef: HTMLDivElement | null | undefined,
  connected: HTMLElement,
  fillWidth = false,
  minWidth = 200,
) {
  if (targetRef && connected) {
    const { left, top, height, width } = targetRef?.getBoundingClientRect();
    containerOverlay().appendChild(connected);
    connected.style.top = `${top + height}px`;
    connected.style.left = `${left}px`;
    if (fillWidth) {
      connected.style.width = `${width}px`;
    } else {
      connected.style.width = `${minWidth}px`;
    }
  }
}

export function detachOverlay(visible: boolean, connected: HTMLElement) {
  const overlay = containerOverlay();
  if (connected) {
    connected.remove();
    (overlay?.childNodes || []).forEach((node) => {
      if (overlay && node === connected) {
        overlay.removeChild(connected);
      }
    });
  }
}
