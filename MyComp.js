export default class MyComp extends HTMLElement {
    //State holder variables\
    #pMessage;

    constructor() {
        super();

        // lets create our shadow root
        const shadowRoot = this.attachShadow({mode: 'open'});

        this.#pMessage = 'I am a Component';
    }

    //Getter and Setters State Modifiers
    get message() {
        return this.#pMessage;
    }

    set message(msg) {
        this.#pMessage = msg;

        //Call DOM Modifier function
        this.#messageModify();
    }

    //Shadow DOM Modifier functions
    #messageModify() {
        this.shadowRoot.getElementById('pMessage').textContent = this.#pMessage;
    }

    //HTML CSS Definition
    #getTemplate() {
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
            <p id="pMessage">${this.#pMessage}</p>
            <slot name="light1"></slot>
        </div>
        `;
        return style + html;
    }

    #render() {
        this.shadowRoot.innerHTML = this.#getTemplate();
    }
    //Factory to bubble up events
    #sentEventUp(eventName,objData) {
        //console.log('sending event',eventName);
        let id = this.getAttribute('id');
        if (id) objData['componentId'] = id;
        
        this.dispatchEvent(new CustomEvent(eventName,{
            bubbles: true,
            cancelable : false,
            composed: true,
            detail: objData
        }));
    }
    #connectEvents() {
        //Create event listeners for component. Make sure to use arrow functions to be able to use this appropiately
    }
    #disconnectEvents() {
        //Disconnect all event listeners that were created in connectEvents()
    }
    
    connectedCallback() {
        
        // Then lets render the template
        this.#render();

        this.#connectEvents();
    }

    disconnectedCallback() {
        console.log('Component Removed from DOM')
        this.#disconnectEvents();
    }

    

    // Lets get icon and page-name from attributes
    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallBack');

        // Lets re-render after getting the new attributes
        this.#render();
    }

}

{/* <script type="module">
    import MyComp from './MyComp.js';
    customElements.define('my-comp', MyComp)
</script> */}
