import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error) {
    console.error('Voxel Waterfall crashed:', error);
  }

  override render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#e8eef5', fontFamily: 'system-ui', padding: 32,
          textAlign: 'center',
        }}>
          <h2 style={{ margin: 0, fontWeight: 600 }}>WebGL could not start</h2>
          <p style={{ maxWidth: 520, color: '#9bb0c6', marginTop: 12 }}>
            The browser failed to create a WebGL context. Try a recent Chrome or
            Firefox with hardware acceleration enabled.
          </p>
          <pre style={{
            marginTop: 16, fontSize: 11, color: '#7d96b3',
            background: 'rgba(0,0,0,0.4)', padding: 12, borderRadius: 6,
            maxWidth: 600, whiteSpace: 'pre-wrap',
          }}>
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}