# React useState Hook – Key Learnings and Best Practices

This document summarizes important concepts and best practices for using the `useState` hook in React, as demonstrated in the provided code example.

---

## 1. What is `useState`?

The `useState` hook is a fundamental part of React for managing state in functional components. It allows you to add state variables to your components and update them as needed.

**Basic usage:**
```jsx
const [count, setCount] = useState(0);
```
- `count` is the current state value.
- `setCount` is the function to update the state.
- `0` is the initial value.

---

## 2. State Initialization: Value vs. Function

### Direct Initialization

```jsx
const [count, setCount] = useState(0);
```
- The initial value (`0`) is set directly.
- This value is used only on the first render.

### Function-based Initialization

```jsx
function initialValue() {
  console.log("running initialisation");
  return 1;
}
const [count, setCount] = useState(initialValue());
```
- Here, `initialValue()` is **called every time the component renders**, not just on the first render. This is usually **not recommended** if the initialization is expensive.

#### The Correct Way: Lazy Initialization

```jsx
const [count, setCount] = useState(() => {
  console.log("running only 1 time");
  return 1;
});
```
- By passing a function to `useState`, React will **call this function only once** (on the initial render).
- This is useful for expensive computations or when you want initialization logic to run only once.

---

## 3. State as an Object

You can store objects in state, not just primitive values.

```jsx
const [state, setState] = useState(() => ({ count: 0, theme: "blue" }));
```

### Updating Object State

**Incorrect way (overwrites other properties):**
```jsx
setState(prev => ({ count: prev.count + 1 }));
// This will remove the 'theme' property!
```

**Correct way (using the spread operator):**
```jsx
setState(prev => ({ ...prev, count: prev.count + 1 }));
// This updates 'count' and keeps 'theme' unchanged.
```

**Example with theme change:**
```jsx
setState(prev => ({ ...prev, count: prev.count + 1, theme: "blue" }));
setState(prev => ({ ...prev, count: prev.count - 1, theme: "red" }));
```

---

## 4. Functional Updates

When updating state based on the previous value, always use the functional form:

```jsx
setCount(prev => prev + 1);
setCount(prev => prev - 1);
```

**Why?**
- React batches state updates for performance.
- If you use the current value (`count + 1`), you might get stale values if multiple updates happen quickly.
- The functional form ensures you always get the latest state.

---

## 5. Key Takeaways

- **Direct vs. Function Initialization:** Use a function for initialization only if you want the logic to run once (pass a function, not the result of a function).
- **Object State:** Always use the spread operator to update part of an object in state, to avoid losing other properties.
- **Functional Updates:** Use the functional form of state setters when the new state depends on the previous state.
- **Initialization Functions:** Passing a function to `useState` (i.e., `useState(() => ...)`) ensures the function runs only once, not on every render.

---

## 6. Example Code

```jsx
import React, { useState } from 'react';

function UseStateExample() {
  const [count, setCount] = useState(() => {
    console.log("running only 1 time");
    return 1;
  });

  const [state, setState] = useState(() => ({ count: 0, theme: "blue" }));
  const objCount = state.count;
  const objTheme = state.theme;

  function handleIncrement() {
    setState(prev => ({ ...prev, count: prev.count + 1, theme: "blue" }));
  }

  function handleDecrement() {
    setState(prev => ({ ...prev, count: prev.count - 1, theme: "red" }));
  }

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      {objCount} , {objTheme}
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

export default UseStateExample;
```

---

## 7. Summary Table

| Pattern                        | When to Use                                      | Example                                      |
|---------------------------------|--------------------------------------------------|----------------------------------------------|
| `useState(0)`                  | Simple, static initial value                     | `useState(0)`                                |
| `useState(() => expensive())`   | Expensive or one-time initialization             | `useState(() => computeInitialValue())`      |
| `setState({...prev, ...})`      | Updating part of an object in state              | `setState(prev => ({...prev, x: 1}))`        |
| `setCount(prev => prev + 1)`    | When new state depends on previous state         | `setCount(prev => prev + 1)`                 |

---

## 8. References

- [React Docs: useState](https://react.dev/reference/react/useState)
- [React Docs: State as an Object](https://react.dev/learn/choosing-the-state-structure)

---

**Happy Coding!**


# React useEffect Example & Notes

This project demonstrates the usage of the `useEffect` hook in React through a simple component. The code explores different patterns and best practices for using `useEffect` for side effects, data fetching, and event listeners.

## What I Learned

- **useEffect** is a powerful React hook for handling side effects in functional components.
- The dependency array in `useEffect` controls when the effect runs.
- You can use multiple `useEffect` hooks in a single component for different concerns.
- Cleanup functions in `useEffect` help prevent memory leaks (e.g., removing event listeners).
- Data fetching and DOM event handling are common use cases for `useEffect`.

## Code Overview

The component demonstrates:

- Fetching data from an API when a resource type changes.
- Handling window resize events and updating state accordingly.
- Using different dependency arrays to control when effects run.

## useEffect Patterns Demonstrated

### 1. Effect runs when a specific state changes

```js
useEffect(() => {
  fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(response => response.json())
    .then(json => setItems(json));
  console.log("Runs when resourceType changes");
}, [resourceType]);
```
- **Runs:** Every time `resourceType` changes.
- **Use case:** Fetch new data when a filter or tab changes.

### 2. Effect runs only once (on mount)

```js
useEffect(() => {
  // fetch(...)
  console.log("Runs only once on mount");
}, []);
```
- **Runs:** Only once, after the initial render.
- **Use case:** Initial data fetch, setting up subscriptions.

### 3. Effect runs on every render

```js
useEffect(() => {
  console.log("Runs on every render");
});
```
- **Runs:** After every render (no dependency array).
- **Use case:** Rarely needed; can cause performance issues.

### 4. Effect with cleanup (e.g., event listeners)

```js
useEffect(() => {
  const handleResize = () => setWindowSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  console.log("Runs once, sets up resize listener");
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```
- **Runs:** Once on mount, cleans up on unmount.
- **Use case:** Subscribing/unsubscribing to events, timers, etc.

## Key Notes on useEffect

- **Dependency Array:**
  - `[]` — runs once (on mount).
  - `[var1, var2]` — runs when any dependency changes.
  - Omitted — runs after every render.
- **Cleanup Function:** Return a function from `useEffect` to clean up (unsubscribe, remove listeners, etc.).
- **Multiple useEffects:** You can use as many as needed for different concerns.
- **Common Pitfalls:** Forgetting the dependency array can cause infinite loops or missed updates.

## Example UI

- Buttons to switch between "Posts", "Users", and "Comments".
- Displays fetched items as JSON.
- Shows current window width, updates on resize.

---

**References:**
- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [React Docs: Using the Effect Hook](https://legacy.reactjs.org/docs/hooks-effect.html)