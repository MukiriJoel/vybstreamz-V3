import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SectionHeader from '../components/SectionHeader'

describe('SectionHeader component', () => {
  it('renders section title correctly', () => {
    const mockOnViewMoreClick = jest.fn()
    
    render(<SectionHeader title="test section" onViewMoreClick={mockOnViewMoreClick} />)
    
    expect(screen.getByText('test section')).toBeInTheDocument()
  })

  it('renders title with proper capitalization class', () => {
    const mockOnViewMoreClick = jest.fn()
    
    render(<SectionHeader title="my videos" onViewMoreClick={mockOnViewMoreClick} />)
    
    const titleElement = screen.getByText('my videos')
    expect(titleElement).toHaveClass('capitalize')
    expect(titleElement.tagName).toBe('H3')
  })

  it('renders View More button', () => {
    const mockOnViewMoreClick = jest.fn()
    
    render(<SectionHeader title="test" onViewMoreClick={mockOnViewMoreClick} />)
    
    expect(screen.getByRole('button', { name: /view more/i })).toBeInTheDocument()
  })

  it('calls onViewMoreClick when View More button is clicked', async () => {
    const mockOnViewMoreClick = jest.fn()
    const user = userEvent.setup()
    
    render(<SectionHeader title="test" onViewMoreClick={mockOnViewMoreClick} />)
    
    const viewMoreButton = screen.getByRole('button', { name: /view more/i })
    await user.click(viewMoreButton)
    
    expect(mockOnViewMoreClick).toHaveBeenCalledTimes(1)
  })

  it('renders with different titles', () => {
    const mockOnViewMoreClick = jest.fn()
    
    const { rerender } = render(
      <SectionHeader title="videos" onViewMoreClick={mockOnViewMoreClick} />
    )
    expect(screen.getByText('videos')).toBeInTheDocument()
    
    rerender(<SectionHeader title="music" onViewMoreClick={mockOnViewMoreClick} />)
    expect(screen.getByText('music')).toBeInTheDocument()
    expect(screen.queryByText('videos')).not.toBeInTheDocument()
  })

  it('has correct CSS classes for styling', () => {
    const mockOnViewMoreClick = jest.fn()
    
    render(<SectionHeader title="test" onViewMoreClick={mockOnViewMoreClick} />)
    
    const container = screen.getByText('test').parentElement
    expect(container).toHaveClass('flex', 'items-center', 'pt-2', 'justify-between')
  })

  it('button has ghost variant class', () => {
    const mockOnViewMoreClick = jest.fn()
    
    render(<SectionHeader title="test" onViewMoreClick={mockOnViewMoreClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('cursor-pointer')
  })
})