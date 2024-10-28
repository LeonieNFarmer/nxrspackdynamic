import styles from './myComponent.module.scss';
console.log('styles', styles)

export function MyComponent() {
  return <div className={`${styles.container}`}>Hello from MyComponent</div>;
}
