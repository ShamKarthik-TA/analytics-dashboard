# Real-life scenarios for `useEffect` and `useRef`:

## `useEffect` Scenarios

* **Data Fetching:** Getting user profiles, product details from an API when a page loads or ID changes.
* **Local Storage:** Saving user preferences (e.g., theme, language) to `localStorage`.
* **Media Control:** Playing/pausing videos based on a `prop`.
* **Document Title:** Updating the browser tab's title based on the current page.
* **Real-time Subscriptions:** Connecting to a chat service via WebSockets, and disconnecting on component unmount.
* **Debouncing Input:** Delaying a search query until a user stops typing.
* **Third-Party Integration:** Initializing a Google Maps embed or other external libraries.
* **Network Status:** Displaying an "offline" notification by listening to browser events.
* **Form Reset:** Clearing form fields after successful submission.

---

## `useRef` Scenarios

* **Focusing Elements:** Automatically focusing a search bar or input field on page load.
* **Triggering Clicks:** Programmatically clicking a hidden file input for uploads.
* **Measuring Dimensions:** Getting the exact `width` or `height` of a DOM element.
* **Canvas/SVG Interaction:** Providing a direct DOM reference to a `<canvas>` or SVG for drawing libraries.
* **Infinite Scroll:** Attaching a ref to the last item in a list to detect when more items should load.
* **Custom Media Controls:** Directly controlling `<video>` or `<audio>` elements (play, pause, etc.).
* **Storing Timers:** Holding `setTimeout` or `setInterval` IDs to clear them later.
* **Previous Values:** Storing a prop's or state's previous value for comparison in `useEffect`.
* **Mutable Instances:** Managing persistent instances of complex third-party classes that don't trigger re-renders.


# Here are code snippets.

---

### `useEffect` Scenarios - Code Snippets

#### 1. Data Fetching

```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Simulate API call
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]); // Re-fetch if userId changes
  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

#### 2. Local Storage

```jsx
import React, { useState, useEffect } from 'react';

function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme); // Apply theme
  }, [theme]);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
```

#### 3. Media Control (with `useRef` for direct DOM access)

```jsx
import React, { useState, useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlayingProp }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      isPlayingProp ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isPlayingProp]); // Play/pause based on prop
  return <video ref={videoRef} src={src} controls width="300" />;
}
```

#### 4. Document Title

```jsx
import React, { useEffect } from 'react';

function PageTitleUpdater({ title }) {
  useEffect(() => {
    document.title = title ? `${title} | My App` : 'My App';
  }, [title]);
  return null; // This component doesn't render anything visually
}
```

#### 5. Real-time Subscriptions (Chat Service)

```jsx
import React, { useState, useEffect } from 'react';
// Assume 'chatService' is an external module providing connect/disconnect
// import chatService from './chatService';

function ChatStatus() {
  const [status, setStatus] = useState('Disconnected');
  useEffect(() => {
    // Simulate connection
    const connect = () => {
      console.log('Connecting to chat...');
      setStatus('Connected');
    };
    const disconnect = () => {
      console.log('Disconnecting from chat...');
      setStatus('Disconnected');
    };

    connect(); // Connect on mount
    return () => disconnect(); // Disconnect on unmount
  }, []);
  return <div>Chat Status: {status}</div>;
}
```

#### 6. Debouncing Input

```jsx
import React, { useState, useEffect } from 'react';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Debounce by 500ms

    return () => {
      clearTimeout(timerId); // Clear timeout if searchTerm changes before 500ms
    };
  }, [searchTerm]); // Re-run effect when searchTerm changes

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Performing search for:', debouncedSearchTerm);
      // Actual search API call would go here
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Type to search..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  );
}
```

#### 7. Third-Party Integration (e.g., Google Maps)

```jsx
import React, { useEffect, useRef } from 'react';

function GoogleMap({ center, zoom }) {
  const mapRef = useRef(null); // Ref to the div where map will be rendered

  useEffect(() => {
    // This simulates loading Google Maps script and initializing map
    // In a real app, you'd load the script dynamically or use a library
    const initializeMap = () => {
      if (window.google && window.google.maps && mapRef.current) {
        new window.google.maps.Map(mapRef.current, { center, zoom });
        console.log('Google Map initialized!');
      } else {
        console.warn('Google Maps API not loaded or mapRef not available.');
      }
    };
    // Assume Google Maps script is already loaded
    initializeMap();
  }, [center, zoom]); // Re-initialize if center/zoom changes

  return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
}
```

#### 8. Network Status

```jsx
import React, { useState, useEffect } from 'react';

function NetworkStatusIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{ color: isOnline ? 'green' : 'red' }}>
      Status: {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

#### 9. Form Reset

```jsx
import React, { useState, useEffect } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Simulate API call success
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      setFormData({ name: '', email: '' }); // Reset form
      setIsSubmitted(false); // Reset submission status
      alert('Form submitted successfully!');
    }
  }, [isSubmitted]); // Runs when isSubmitted changes to true

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### `useRef` Scenarios - Code Snippets

#### 1. Focusing Elements

```jsx
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); // Focus on mount
  }, []);

  return <input ref={inputRef} placeholder="I will be focused" />;
}
```

#### 2. Triggering Clicks (Hidden File Input)

```jsx
import React, { useRef } from 'react';

function FileUploader() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden input
  };

  const handleFileChange = (event) => {
    console.log('Selected files:', event.target.files);
    // Handle file upload logic here
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the actual input
      />
      <button onClick={handleButtonClick}>Select File</button>
    </div>
  );
}
```

#### 3. Measuring Dimensions

```jsx
import React, { useRef, useEffect, useState } from 'react';

function ResizableBox() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.clientWidth); // Get actual client width
    }
    // You might add a resize observer here for dynamic updates
  }, []); // Run once on mount

  return (
    <div ref={boxRef} style={{ border: '1px solid black', padding: '20px' }}>
      This box is {width}px wide.
      <p>Resize browser to see this might not update automatically without a ResizeObserver.</p>
    </div>
  );
}
```

#### 4. Canvas/SVG Interaction

```jsx
import React, { useRef, useEffect } from 'react';

function DrawingCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // Draw a simple rectangle on the canvas
      ctx.fillStyle = 'blue';
      ctx.fillRect(10, 10, 150, 100);
    }
  }, []); // Draw once on mount

  return <canvas ref={canvasRef} width="300" height="200" style={{ border: '1px solid gray' }} />;
}
```

#### 5. Infinite Scroll (simplified)

```jsx
import React, { useState, useEffect, useRef } from 'react';

function InfiniteScrollList() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const loaderRef = useRef(null); // Ref for the element at the bottom

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          // Load more items when the loader is visible
          setItems(prevItems => [...prevItems, ...Array.from({ length: 5 }, (_, i) => prevItems.length + i + 1)]);
        }
      },
      { threshold: 1.0 } // Trigger when 100% of the target is visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [items]); // Re-observe if items change (new loader element might appear)

  return (
    <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
      {items.map(item => (
        <div key={item} style={{ padding: '10px', borderBottom: '1px dashed #eee' }}>
          Item {item}
        </div>
      ))}
      <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center', background: '#f0f0f0' }}>
        Loading more...
      </div>
    </div>
  );
}
```

#### 6. Custom Media Controls (Re-using `VideoPlayer` logic from `useEffect` with `useRef`)

```jsx
import React, { useRef, useState } from 'react';

function CustomVideoControls({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <video ref={videoRef} src={src} width="400" height="250" controls={false} />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
// Example: <CustomVideoControls src="https://www.w3schools.com/html/mov_bbb.mp4" />
```

#### 7. Storing Timers (`setInterval` ID)

```jsx
import React, { useState, useRef, useEffect } from 'react';

function AutoCounter() {
  const [count, setCount] = useState(0);
  const intervalIdRef = useRef(null); // To hold the interval ID

  const startCounter = () => {
    if (!intervalIdRef.current) { // Prevent starting multiple intervals
      intervalIdRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
  };

  const stopCounter = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null; // Clear the ref
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCounter();
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={startCounter}>Start</button>
      <button onClick={stopCounter}>Stop</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

#### 8. Previous Values (of state/props)

```jsx
import React, { useState, useEffect, useRef } from 'react';

function PreviousValueTracker({ currentProp }) {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  const prevPropRef = useRef('');

  useEffect(() => {
    prevCountRef.current = count; // Store current count after render
    prevPropRef.current = currentProp; // Store current prop after render
  }); // Runs after every render

  return (
    <div>
      <p>Current Count: {count} (Previous: {prevCountRef.current})</p>
      <p>Current Prop: "{currentProp}" (Previous: "{prevPropRef.current}")</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
}
// Example: <PreviousValueTracker currentProp="hello" />
// Then change currentProp to "world" and see previous.
```

#### 9. Mutable Instances (e.g., non-React class)

```jsx
import React, { useEffect, useRef } from 'react';

// Simulate a simple third-party drawing library class
class MyDrawingTool {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.ctx.font = '20px Arial';
    this.drawText('Initialized!', 50, 50);
  }

  drawText(text, x, y) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear previous
    this.ctx.fillText(text, x, y);
  }

  destroy() {
    console.log('Drawing tool destroyed.');
    // Clean up resources if necessary
  }
}

function DrawingToolComponent() {
  const canvasRef = useRef(null);
  const drawingToolRef = useRef(null); // Ref to hold the instance of MyDrawingTool

  useEffect(() => {
    if (canvasRef.current && !drawingToolRef.current) {
      // Initialize MyDrawingTool instance only once
      drawingToolRef.current = new MyDrawingTool(canvasRef.current);
    }

    // Cleanup: Destroy the instance when component unmounts
    return () => {
      if (drawingToolRef.current) {
        drawingToolRef.current.destroy();
        drawingToolRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  const handleDrawHello = () => {
    if (drawingToolRef.current) {
      drawingToolRef.current.drawText('Hello React!', 20, 100);
    }
  };

  const handleDrawGoodbye = () => {
    if (drawingToolRef.current) {
      drawingToolRef.current.drawText('Goodbye!', 100, 150);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width="400" height="200" style={{ border: '1px dashed blue' }} />
      <div>
        <button onClick={handleDrawHello}>Draw Hello</button>
        <button onClick={handleDrawGoodbye}>Draw Goodbye</button>
      </div>
    </div>
  );
}
```