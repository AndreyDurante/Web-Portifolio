import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProfileBadge from '../../src/components/ProfileBadge.jsx'

describe('ProfileBadge', () => {
  it('keeps a static reserved badge when no portrait is supplied', () => {
    const { container } = render(<ProfileBadge />)
    expect(container.firstChild).toHaveClass('aspect-[4/5]')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
