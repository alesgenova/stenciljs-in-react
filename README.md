# Stencil components in React

[Stencil](https://stenciljs.com/) is not a JS framework. It is a compiler that produces a reusable web component that can be embedded anywhere else.

This is a step by step guide to consume a non-trivial stencil component in a [React](https://reactjs.org/) app.

The starter react app was created with [create-react-app](https://github.com/facebook/create-react-app).

## Similar guides
- [Stencil components in Vue](https://github.com/alesgenova/stenciljs-in-vue.git)
- [Stencil components in Angular](https://github.com/alesgenova/stenciljs-in-angular.git)

## Table of contents
- [Add the component to the dependencies](#1-add-the-component-to-the-dependencies)
- [Load the component](#2-load-the-component)
- [Consume the component](#3-consume-the-component)
- [Appendix: Attribute vs Prop](#appendix-attribute-vs-prop)


## 0: Build a stenciljs component and publish it to npm
Creating your first stencil component is very easy and it is well documented [here](https://stenciljs.com/docs/my-first-component). 

This example will consume the [@openchemistry/molecule-moljs](https://github.com/OpenChemistry/oc-web-components/tree/master/packages/molecule-moljs) component.

## 1: Add the component to the dependencies

Add the component to the app dependencies in `package.json`

```json
// package.json

"dependencies": {
  ...
  "@openchemistry/molecule-moljs": "^0.0.7"
}
```

In order to have the component code bundled with the app, copy the `dist/` folder of the component into the `public/` folder of the app. This can be automated by adding a `postinstall` command.

```json
// package.json

"scripts": {
    ...
    "postinstall": "cp -R node_modules/@openchemistry/molecule-moljs/dist public/molecule-moljs"
  }
```

## 2: Load the component
Now that the component code is in the `public/molecule-moljs` folder, add the following to the `public/index.html` file.
```html
<script src="molecule-moljs/molecule-moljs.js"></script>
```

## 3: Consume the component
It is now possible to use the tag provided by the stencil component in the `render` function of any react component.

```jsx
render() {
    return (
      <oc-molecule-moljs></oc-molecule-moljs>
    )
}
```

## Appendix: Attribute vs Prop
`oc-molecule-moljs` has a property named `cjson` that expects an object (or a JSON.stringified object).

Strings can be passed directly as attributes to a stencil component.
```jsx
render() {
    return (
      <oc-molecule-moljs cjson={JSON.stringify(this.state.molecule)}></oc-molecule-moljs>
    )
}
```

While this would work, it is probably a good idea to avoid the `JSON.stringify()` and `JSON.parse()` and directly pass the object itself to the component.

React doesn't provide a convenient way to distinguish between attribute and prop, so a little work is needed to achieve this.

It just boils down to saving a reference to the element of the stencil component, and then set the property directly in the javascript code.

Here is the full code to do it:

```jsx
import React, { Component } from 'react';

class SomeComponent extends Component {

  componentRef = null;

  constructor(props) {
    super(props);
    this.state = {
      molecule: {
        /* Big complex object goes here */
      };
    }
  }

  componentDidMount() {
    this._setWcProps();
  }

  componentDidUpdate(){
    this._setWcProps();
  }

  _setWcProps(){
    this.componentRef.cjson = this.state.molecule;
  }

  render() {
    return (
      <div style={{width: "100%", height: "20rem", position: "relative"}}>
        <oc-molecule-moljs ref={ (node) => this.componentRef = node }/>
      </div>
    );
  }

}

export default SomeComponent;
```

