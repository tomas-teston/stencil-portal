import { Component, h, Prop, Host, State } from "@stencil/core";

@Component({
  tag: "tooltip-component",
  styleUrl: "tooltip-component.scss",
})
export class TooltipComponent {
  @Prop() label: string;

  @State() show: boolean = false;

  private tooltipRef: HTMLElement;

  private setShow(show: boolean) {
    debugger;
    this.show = show;
  }

  componentDidLoad() {
    this.tooltipRef.addEventListener("mouseover", () => this.setShow(true));
    this.tooltipRef.addEventListener("mouseout", () => this.setShow(false));
  }

  disconnectedCallback() {
    this.tooltipRef.removeEventListener("mouseover", this.setShow.bind(this));
    this.tooltipRef.removeEventListener("mouseout", this.setShow.bind(this));
  }

  render() {
    return (
      <Host ref={(el) => (this.tooltipRef = el)}>
        <slot />
        {this.show && (
          <portal-component reference={this.tooltipRef}>
            <div class="tooltip">
              <p class="tooltip__label">{this.label}</p>
            </div>
          </portal-component>
        )}
      </Host>
    );
  }
}
