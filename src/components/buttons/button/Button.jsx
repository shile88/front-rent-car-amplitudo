import classes from "./Button.module.scss";

const Button = ({label, onClick, className = ""}) => {
    return <button type="button"
                   className={`${classes["button"]} ${className}`}
                    onClick={(e) => {
                        e.preventDefault();
                        onClick()
                    }
                    }>
        {label}
    </button>
}

export default Button;