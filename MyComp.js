export default class MyComp extends HTMLElement {
    //State holder variables\
    _pMessage;

    constructor() {
        super();

        // lets create our shadow root
        const shadowRoot = this.attachShadow({mode: 'open'});

        this._pMessage = 'I am a Component';
    }
    
    get links() { return this.breadcrums; }

    //Getter and Setters State Modifiers
    get message() {
        return this._pMessage;
    }

    set message(msg) {
        this._pMessage = msg;

        //Call DOM Modifier function
    }

    //Shadow DOM Modifier functions
    messageModify() {
        this.shadowRoot.getElementById('pMessage').textContent = this._pMessage;
    }

    //HTML CSS Definition
    getTemplate() {
        let style = `
        <style>
            :host {
                contain: content;
            }
            p {
                color: var(--color, green);
            }
        </style>
        `;

        let html = `
        <div>
            <slot name="light2"></slot>
            <p id="pMessage">${this._pMessage}</p>
            <slot name="light1"></slot>
        </div>
        `;
        return style + html;
    }

    render() {
        this.shadowRoot.innerHTML = this.getTemplate();
    }
    
    connectedCallback() {
        
        // Then lets render the template
        this.render();
    }

    disconnectedCallback() {
        console.log('Component Removed from DOM')
    }

    

    // Lets get icon and page-name from attributes
    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallBack');

        // Lets re-render after getting the new attributes
        this.render();
    }

}

{/* <script type="module">
    import MyComp from './MyComp.js';
    customElements.define('my-comp', MyComp)
</script> */}
