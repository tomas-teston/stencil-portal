import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "reference-component",
  styleUrl: "reference-component.scss",
})
export class ReferenceComponent {
  render() {
    return (
      <Host>
        <span>Over me to show tooltip</span>
      </Host>
    );
  }
}
