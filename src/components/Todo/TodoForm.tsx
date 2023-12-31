const TodoItem = () => {
    return (
            <div className="flex-col">
                <div className="card shadow-2xl">
                    <form className="card-body border-black">
                        <div className="form-control">
                            <input type="" placeholder="" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-1">
                            <button className="btn btn-primary">TODO追加</button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default TodoItem;

