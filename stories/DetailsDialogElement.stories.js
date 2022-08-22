import { html } from 'lit-html'
import '@github/details-dialog-element';

export default {
  argTypes: {
    triggerText: {
      description: 'The text on the button to trigger the component',
      type: {name: 'string', required: false},
      defaultValue: 'Open dialog'
    },
    src: {
      description: 'Path to HTML to inject into the dialog when it opens',
      type: {name: 'string', required: false},
      defaultValue: null
    },
    preload: {
      description: 'Something, something preload',
      type: {name: 'boolean', required: false},
      defaultValue: null
    },
  },
};

const Template = ({triggerText}) => html`<details>
  <summary class="btn">${triggerText}</summary>
  <details-dialog>
    <div class="Overlay-backdrop">
    <div
      id="overlay-backdrop"
      class="Overlay-backdrop Overlay-backdrop--center"
      role="dialog"
      aria-labelledby="title-id"
      aria-describedby="description-id"
      data-focus-trap="active"
    >
      <div
        class="Overlay Overlay--width-medium Overlay--height-medium Overlay--motion-scaleFade"
        data-focus-trap="active"
        open=""
      >
        <header class="Overlay-header">
          <div class="Overlay-headerContentWrap">
            <div class="Overlay-titleWrap">
              <h1 id="title-id" class="Overlay-title">This is the title of the dialog</h1>
              <h2 id="description-id" class="Overlay-description">This is the subtitle of the dialog</h2>
            </div>
            <div class="Overlay-actionWrap">
              <button class="Overlay-closeButton" aria-label="Close" data-close-dialog>
                <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div class="Overlay-body">
          This is the body of the dialogThis is the body of the dialogThis is the body of the dialog This is the body of
          the dialog This is the body of the dialog This is the body of the dialog This is the body of the dialog This is
          the body of the dialog This is the body of the dialog
        </div>
        <footer class="Overlay-footer Overlay-footer--divided Overlay-footer--alignEnd">
          <button class="btn" data-close-dialog><span>Continue</span></button>
        </footer>
      </div>
    </div>
  </details-dialog>
</details>`

export const Primary = Template.bind({});
