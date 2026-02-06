import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoApp from '../TodoApp'
import * as api from '../../api/todos'

jest.mock('../../api/todos')

/**
 * Test suite for TodoApp component
 * @desc Tests the complete todo lifecycle: creation, toggling completion state, and deletion
 * @requires @testing-library/react
 * @requires @testing-library/user-event
 */
describe('TodoApp', () => {

    // Clear localStorage and reset API mocks before each test to ensure a clean state
    beforeEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
        api.getTodos.mockResolvedValue([])
    })

    /**
     * Test: Verify that a new todo can be added to the list
     * @desc Types a todo item and clicks add button, then verifies it appears in the document
     */
    test('adds a todo', async () => {
        api.createTodo.mockResolvedValue({ id: 1, text: 'Write tests', done: false })
        render(<TodoApp />)

        const input = screen.getByPlaceholderText(/add a new todo/i)
        const addButton = screen.getByRole('button', { name: /add/i })

        await userEvent.type(input, 'Write tests')
        await userEvent.click(addButton)

        const todo = await screen.findByText('Write tests')
        expect(todo).toBeInTheDocument()
    })


    /**
     * Test: Verify that a todo item's completion state can be toggled
     * @desc Adds a todo item, clicks its checkbox to mark as complete, then verifies the todo has the 'line-through' class applied
     */
    test('toggles a todo completion state', async () => {
        api.createTodo.mockResolvedValue({ id: 2, text: 'Write tests', done: false })
        api.updateTodo.mockImplementation((id, patch) => Promise.resolve({ id, text: 'Write tests', done: patch.done }))

        render(<TodoApp />)

        const input = screen.getByPlaceholderText(/add a new todo/i)
        const addButton = screen.getByRole('button', { name: /add/i })

        await userEvent.type(input, 'Write tests')
        await userEvent.click(addButton)

        const todo = await screen.findByText('Write tests')
        const checkbox = await screen.findByRole('checkbox')
        await userEvent.click(checkbox)

        await waitFor(() => expect(todo).toHaveClass('line-through'))
    })

    /**
     * Test: Verify that a todo item can be removed from the list
     * @desc Adds a todo item, clicks its delete button, then verifies the todo is no longer in the document
     */
    test('removes a todo', async () => {
        api.createTodo.mockResolvedValue({ id: 3, text: 'Write tests', done: false })
        api.deleteTodo.mockResolvedValue()

        render(<TodoApp />)

        const input = screen.getByPlaceholderText(/add a new todo/i)
        const addButton = screen.getByRole('button', { name: /add/i })

        await userEvent.type(input, 'Write tests')
        await userEvent.click(addButton)

        const todo = await screen.findByText('Write tests')
        const deleteButton = await screen.findByRole('button', { name: /delete/i })
        await userEvent.click(deleteButton)

        await waitFor(() => expect(todo).not.toBeInTheDocument())
    })

})
