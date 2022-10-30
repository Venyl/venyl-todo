import { TiTick } from 'react-icons/ti';
import { BsTrashFill } from 'react-icons/bs';
import { RiArrowGoBackFill } from 'react-icons/ri';

interface Todo {
    id: string;
    content: string;
    isCompleted: boolean;
}

interface Props {
    todos: Todo[];
    title: string;
    removeTodo: (todoId: string) => void;
    completeTodo: (todoId: string) => void;
}

export default function Todos({ todos, title, removeTodo, completeTodo }: Props) {
    if (todos.length === 0) return <></>;
    return (
        <div>
            <div className="flex"></div>
            <h2 className="font-bold uppercase text-zinc-600 text-center relative separator">
                <span className="bg-zinc-900 z-[2] relative px-2">
                    {title} ({todos.length})
                </span>
            </h2>
            <ul className="list-disc">
                {todos.map(todo => (
                    <li className="flex justify-between ml-2 p-2 hover:bg-zinc-800 rounded-md">
                        <p className="max-w-[60%] break-words">{todo.content}</p>
                        <div className="flex gap-2 ">
                            <a
                                className={todo.isCompleted ? 'btn-warning' : 'btn-primary'}
                                onClick={() => completeTodo(todo.id)}
                            >
                                {todo.isCompleted ? <RiArrowGoBackFill /> : <TiTick />}
                            </a>
                            <a
                                className="btn-primary bg-red-500 hover:bg-red-600"
                                onClick={() => removeTodo(todo.id)}
                            >
                                <BsTrashFill />
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
