function hideComponent(component: HTMLElement) {
  component.classList.add("hidden")
}

function showComponent(component: HTMLElement) {
  component.classList.remove("hidden")
}

export { hideComponent, showComponent }
