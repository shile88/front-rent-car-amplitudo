import classes from "./SubmitButton.module.scss";

const SubmitButton = ({label, onClick = () => {}, className = "", disabled}) => {
    return <button type="submit"
    className={`${classes.button} ${classes[className]}`}
                    onClick={() => {
                        onClick()
                    }
                    }
                    disabled={disabled}
                    >
        {label}
    </button>
}

export default SubmitButton;