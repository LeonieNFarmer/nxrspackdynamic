import React, { Suspense } from 'react';
import { loadRemoteModule } from '@nx/react/mf';
import { Route, Routes } from 'react-router-dom';

// Lazy load the remote component
const RemoteComponent = React.lazy(() =>
  loadRemoteModule('remote', './Module')
);

export function App() {
  return (
    <div>
      <h1>Host App</h1>
      {/* Use Suspense to handle loading state */}
      <Suspense fallback={<div>Loading Remote Component...</div>}>
        <Routes>
          <Route path={'/'} element={<RemoteComponent />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
