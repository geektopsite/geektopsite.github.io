export function prognroll(element, options) {
  const settings = {
    height: 5,
    color: "#50bcb6",
    custom: false,
    ...options,
  };

  if (element.dataset.prognroll) {
    return;
  }
  element.dataset.prognroll = true;

  const bar = document.createElement("span");
  bar.className = "bar";
  document.body.prepend(bar);

  bar.style.position = "fixed";
  bar.style.top = "0";
  bar.style.left = "0";
  bar.style.width = "0";
  bar.style.height = `${settings.height}px`;
  bar.style.backgroundColor = settings.color;
  bar.style.zIndex = "999";

  function updateProgress() {
    let scrollTop, scrollHeight, clientHeight;

    if (settings.custom) {
      scrollTop = element.scrollTop;
      scrollHeight = element.scrollHeight;
      clientHeight = element.clientHeight;
    } else {
      scrollTop = window.scrollY || document.documentElement.scrollTop;
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = document.documentElement.clientHeight;
    }

    const total = (scrollTop / (scrollHeight - clientHeight)) * 100;
    bar.style.width = `${total}%`;
  }

  if (settings.custom) {
    element.addEventListener("scroll", updateProgress);
  } else {
    window.addEventListener("scroll", updateProgress);
  }

  window.addEventListener("hashchange", () => {
    console.log(window.scrollY || document.documentElement.scrollTop);
  });

  updateProgress();
}
