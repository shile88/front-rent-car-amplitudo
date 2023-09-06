import classes from "./AddButton.module.scss"

const AddButton = ({onClick, className = ""}) => {
    return <button type="button"
                   className={`${classes["button"]} ${className}`}
                    onClick={(e) => {
                        e.preventDefault();
                        onClick()
                    }
                    }>
        Add
    </button>
}

export default AddButton;