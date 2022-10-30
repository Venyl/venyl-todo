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
        setNewTodoContent('');
    }

    function removeTodo(todoId: string) {
        setTodos(todos => todos.filter(todo => todo.id !== todoId));
    }

    function completeTodo(todoId: string) {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    }

    function clearCompletedTodos() {
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
                    placeholder="My todo..."
                />
                <button className="grow bg-emerald-600 rounded-md py-1 hover:bg-emerald-700">
                    Add
                </button>
            </form>

            <div className="flex flex-col gap-2 max-h-[50vh] overflow-auto bg-zinc-900 p-4 rounded-xl">
                <button
                    className="btn-primary bg-zinc-700 hover:bg-zinc-800 py-1"
                    onClick={clearCompletedTodos}
                >
                    Clear completed todos
                </button>
                <Todos
                    todos={uncompletedTodos}
                    title="Uncompleted Todos"
                    removeTodo={removeTodo}
                    completeTodo={completeTodo}
                />
                <Todos
                    todos={completedTodos}
                    title="Completed Todos"
                    removeTodo={removeTodo}
                    completeTodo={completeTodo}
                />
            </div>
        </div>
    );
}

export default App;
