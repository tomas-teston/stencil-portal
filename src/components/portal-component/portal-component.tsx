import { Component, h, Host, Listen, Prop } from "@stencil/core";

const DEFAULT_OFFSET = 20;
const MIN_LEFT_POSITION = 20;
const Z_INDEX = "9005";
const ID_PORTAL = "portal";

@Component({
  tag: "portal-component",
  shadow: true,
})
export class PortalComponent {
  @Prop() reference: HTMLElement;
  @Prop() offset: number;

  private portal: HTMLElement;
  private element: HTMLElement;
  private moved: boolean = false;

  @Listen("scroll", { target: "window", capture: true })
  handleScroll() {
    this.calculatePosition();
  }

  @Listen("resize", { target: "window", capture: true })
  handleResize() {
    this.calculatePosition();
  }

  private calculateLeft() {
    const rect = this.reference.getBoundingClientRect();
    const left = rect.left - this.portal.offsetWidth / 2 + rect.width / 2;
    return left < MIN_LEFT_POSITION ? MIN_LEFT_POSITION : left;
  }

  private calculateTop() {
    const rect = this.reference.getBoundingClientRect();
    const offset = this.offset !== undefined ? this.offset : DEFAULT_OFFSET;
    return rect.bottom - this.portal.offsetHeight - rect.height - offset;
  }

  private createPortal() {
    this.portal = document.createElement("div");
    this.portal.setAttribute("id", ID_PORTAL);
    this.portal.style.zIndex = Z_INDEX;
    this.portal.style.position = "absolute";
    document.body.append(this.portal);
  }

  private moveElementToPortal() {
    this.portal.appendChild(this.element);
  }

  private calculatePosition() {
    this.portal.style.top = `${this.calculateTop()}px`;
    this.portal.style.left = `${this.calculateLeft()}px`;
  }

  componentWillLoad() {
    debugger;
    this.createPortal();
  }

  componentDidLoad() {
    this.moveElementToPortal();
    this.calculatePosition();
  }

  disconnectedCallback() {
    this.moved ? this.portal.remove() : (this.moved = true);
  }

  render() {
    return (
      <Host ref={(el) => (this.element = el)}>
        <slot />
      </Host>
    );
  }
}
