import classes from "./SubmitButton.module.scss";

const SubmitButton = ({label, onClick = () => {}, className = ""}) => {
    return <button type="submit"
                   className={`${classes["button"]} ${className}`}
                    onClick={() => {
                        onClick()
                    }
                    }>
        {label}
    </button>
}

export default SubmitButton;