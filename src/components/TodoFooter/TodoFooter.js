import styles from "./TodoFooter.module.css";
import { FaAnglesUp, FaAnglesDown } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const TodoFooter = () => {
    {/* This is Footer Component */}
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerBar}>
                <div className={styles.inputContainer}>
                    <input type="number" className={styles.numberInput} />
                </div>
                <div className={styles.fooBtn}>
                    <button className={styles.footerButton}>
                        <FaAnglesUp />
                        First
                    </button>
                    <button className={styles.footerButton}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Prev
                    </button>
                    <button className={styles.footerButton}>1</button>
                    <button className={styles.footerButton}>
                        Next
                        <FontAwesomeIcon icon={faChevronLeft} rotation={180} />
                    </button>
                    <button className={styles.footerButton}>
                        Last
                        <FaAnglesDown />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoFooter;
