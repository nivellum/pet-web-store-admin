import "./form.style.scss";

type FormProps = {
    children: React.ReactNode;
    handleSubmit: React.FormEventHandler;
}

const Form = ({handleSubmit, children }: FormProps) => {
    return (
        <form onSubmit={handleSubmit} className="form">
            {children}
        </form>
    );
}

export default Form;