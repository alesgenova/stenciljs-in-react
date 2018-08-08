# Stencil components in React

[Stencil](https://stenciljs.com/) is not a JS framework. It is a compiler that produces a reusable web component that can be embedded anywhere else.

This is a step by step guide to consume a non-trivial stencil component in a [React](https://reactjs.org/) app.

The starter react app was created with [create-react-app](https://github.com/facebook/create-react-app).

## Similar guides
- [Stencil components in Vue](https://github.com/alesgenova/stenciljs-in-vue.git)
- [Stencil components in Angular](https://github.com/alesgenova/stenciljs-in-angular.git)

## Table of contents
- [Add the component(s) to the dependencies](#1-add-the-components-to-the-dependencies)
- [Import the component](#2-import-the-components)
- [Consume the component](#3-consume-the-component)
- [Appendix: Attribute vs Prop](#appendix-attribute-vs-prop)


## 0: Build a stenciljs component and publish it to npm
Creating your first stencil component is very easy and it is well documented [here](https://stenciljs.com/docs/my-first-component). 

This example will consume two components:
- [@openchemistry/molecule-vtkjs](https://github.com/OpenChemistry/oc-web-components/tree/master/packages/molecule-vtkjs) : To display molecular structures
- [split-me](https://github.com/alesgenova/split-me) : To create resizable split layouts


## 1: Add the component(s) to the dependencies

Add the component to the app dependencies in `package.json`

```json
// package.json

"dependencies": {
  ...
  "@openchemistry/molecule-vtkjs": "^0.1.9",
  "split-me": "^0.3.1"
}
```

## 2: Import the component(s)
Import the component in the `index.js` of the app:
```js
import { defineCustomElements as defineMolecule } from '@openchemistry/molecule-vtkjs';
import { defineCustomElements as defineSplitMe } from 'split-me';

defineMolecule(window);
defineSplitMe(window);
```

## 3: Consume the component
It is now possible to use the tag provided by the stencil component in the `render` function of any react component.

```jsx
render() {
    return (
      <split-me n="2">
        <oc-molecule-vtkjs slot="0"></oc-molecule-vtkjs>
        <oc-molecule-vtkjs slot="1"></oc-molecule-vtkjs>
      </split-me>
    )
}
```

## Appendix: Attribute vs Prop
`oc-molecule-vtkjs` has a property named `cjson` that expects an object (or a JSON.stringified object).

Strings and numbers can be passed directly as attributes to a stencil component.

One way to pass a complex object to a component could be to `JSON.stringify()` the object and then `JSON.parse()` it inside the component. But this round trip can be expensive, and it would be a good idea to pass the object directly as a prop.

React doesn't provide a convenient way to distinguish between attribute and prop, so a little work is needed to achieve this.

It just boils down to saving a reference to the element of the stencil component, and then set the property directly in the javascript code.

To make this operation easier, it can be convenient to create a reusable utility function [`wc`](https://github.com/ionic-team/ionic-react-conference-app/blob/master/src/utils/stencil.js).

```js
export function wc(customEvents = {}, props = {}) {
  let storedEl;

  return function (el) {
    for (let name in customEvents) {
      let value = customEvents[name] ;
      // If we have an element then add event listeners
      // otherwise remove the event listener
      const action = (el) ? el.addEventListener : storedEl.removeEventListener;
      if (typeof value === 'function') {
        action(name, value);
        return;
      }
    }
    
    // If we have an element then set props
    if (el) {
      for (let name in props) {
        let value = props[name] ;
        el[name] = value;
      }
    }
    storedEl = el;
  };
}
```

And then use it in the `jsx` to bind events and properties to the webcomponent this way:
```jsx
import React, { Component } from 'react';
import { wc } from './utils/webcomponent';

class SomeComponent extends Component {

  render() {
    return (
      <div style={{width: "100%", height: "20rem", position: "relative"}}>
        <oc-molecule-vtkjs
          ref={wc(
            // Events
            {},
            // Props
            {
              cjson: molecule
            }
          )}
        />
      </div>
    );
  }

}

export default SomeComponent;
```

