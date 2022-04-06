import { render } from '@testing-library/react-native';
import App from './App';

it('Renders the home screen correctly', () => {
  const app = render(<App />);

  expect(app.getByText('Hello world!')).toHaveTextContent('Hello world!');
});
