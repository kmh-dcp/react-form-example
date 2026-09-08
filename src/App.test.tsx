import { render } from '@testing-library/react'
import App from './App.tsx'

describe('App component', () => {
    it('contains hero', () => {
        const component = render(<App />);
        const hero = component.getByLabelText('hero');

        expect(hero).toBeInTheDocument();
    })
})
