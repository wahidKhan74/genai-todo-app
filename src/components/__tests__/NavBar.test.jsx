import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from '../NavBar'

test('toggles mobile menu when button clicked', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  )

  // initially only the desktop nav items exist
  expect(screen.getAllByText('Todos')).toHaveLength(1)

  const toggle = screen.getByLabelText('Toggle menu')
  fireEvent.click(toggle)

  // mobile menu opens: there should now be two "Todos" links
  expect(screen.getAllByText('Todos')).toHaveLength(2)

  // clicking again closes the mobile menu
  fireEvent.click(toggle)
  expect(screen.getAllByText('Todos')).toHaveLength(1)
})
