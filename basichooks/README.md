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