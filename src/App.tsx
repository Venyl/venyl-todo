import { FormEvent, useState } from 'react';
import Todos from './Todos';

interface Todo {
    id: string;
    content: string;
    isCompleted: boolean;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoContent, setNewTodoContent] = useState<string>('');
    const completedTodos: Todo[] = [];
    const uncompletedTodos: Todo[] = [];

    if (localStorage.getItem('todos') !== null) {
        const storedTodos: Todo[] = JSON.parse(localStorage.getItem('todos')!);
        const storedTodosIds = storedTodos.map(todo => todo.id);
        const todosIds = todos.map(todo => todo.id);
        for (const storedTodoId of storedTodosIds) {
            if (!todosIds.includes(storedTodoId)) {
                setTodos(storedTodos);
                return;
            }
        }
    }

    for (const todo of todos) {
        if (todo.isCompleted) {
            completedTodos.push(todo);
        } else {
            uncompletedTodos.push(todo);
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!newTodoContent) return;
        setTodos(todos =>
            todos.concat({ id: crypto.randomUUID(), content: newTodoContent, isCompleted: false })
        );
        localStorage.setItem('todos', JSON.stringify(todos));
        setNewTodoContent('');
    }

    function removeTodo(todoId: string) {
        const newTodos = todos.filter(todo => todo.id !== todoId);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(todos => todos.filter(todo => todo.id !== todoId));
    }

    function completeTodo(todoId: string) {
        const newTodos = todos.map(todo =>
            todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(todos =>
            todos.map(todo =>
                todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    }

    function clearCompletedTodos() {
        const newTodos = todos.filter(todo => !todo.isCompleted);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(todos => todos.filter(todo => !todo.isCompleted));
    }

    return (
        <div className="flex flex-col gap-4 w-[70vmin]">
            <form className="flex gap-4 bg-zinc-900 p-4 rounded-xl" onSubmit={e => handleSubmit(e)}>
                <input
                    className="rounded-md grow py-1 px-4 bg-transparent border-b-2 border-b-white focus:outline-none"
                    type="text"
                    value={newTodoContent}
                    onChange={e => setNewTodoContent(e.target.value)}
                    placeholder="Mój paln..."
                />
                <button className="grow bg-emerald-600 rounded-md py-1 hover:bg-emerald-700">
                    Dodaj
                </button>
            </form>

            <div className="flex flex-col gap-2 max-h-[50vh] overflow-auto bg-zinc-900 p-4 rounded-xl">
                {completedTodos.length > 0 && (
                    <button
                        className="btn-primary bg-zinc-700 hover:bg-zinc-800 py-1"
                        onClick={clearCompletedTodos}
                    >
                        Wyczyść ukończone palny
                    </button>
                )}
                <Todos
                    todos={uncompletedTodos}
                    title="Nieukończone palny"
                    removeTodo={removeTodo}
                    completeTodo={completeTodo}
                />
                <Todos
                    todos={completedTodos}
                    title="Ukończone palny"
                    removeTodo={removeTodo}
                    completeTodo={completeTodo}
                />
            </div>
        </div>
    );
}

export default App;
