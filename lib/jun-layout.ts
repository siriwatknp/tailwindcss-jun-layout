export const triggerEdgeDrawer = () => {
  const drawer = document.querySelector(".jun-edgeSidebar");
  const layout = document.querySelector(".jun-layout");

  if (drawer && layout) {
    drawer.classList.toggle("open");
    layout.classList.toggle("drawer-open");
  }
};
