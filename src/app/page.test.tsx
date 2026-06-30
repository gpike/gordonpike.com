import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /welcome to my portfolio/i })
    ).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Home />)
    expect(screen.getByText(/i'm a full-stack developer/i)).toBeInTheDocument()
  })

  it('renders all three service cards', () => {
    render(<Home />)
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument()
    expect(screen.getByText('Backend Development')).toBeInTheDocument()
  })

  it('renders the contact button', () => {
    render(<Home />)
    expect(
      screen.getByRole('button', { name: /get in touch/i })
    ).toBeInTheDocument()
  })
})
