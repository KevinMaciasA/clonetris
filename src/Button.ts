import { hideComponent, showComponent } from "./utils/hideComponent";

class Button {
  private button: HTMLElement;

  constructor(button: HTMLElement) {
    this.button = button
  }

  hide() {
    hideComponent(this.button)
  }

  show() {
    showComponent(this.button)
  }

  change(text: string) {
    this.button.textContent = text
  }
}

export default Button