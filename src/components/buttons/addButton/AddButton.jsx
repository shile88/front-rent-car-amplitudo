import classes from "./AddButton.module.scss"
import { useTranslation } from "react-i18next";

const AddButton = ({onClick, className = ""}) => {
    const { t } = useTranslation("global");
    return <button type="button"
                   className={`${classes["button"]} ${className}`}
                    onClick={(e) => {
                        e.preventDefault();
                        onClick()
                    }
                    }>
        {t('buttons.addLabel')}
    </button>
}

export default AddButton;