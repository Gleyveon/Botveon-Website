// src/components/settings/subcomponents/input-field
import './styles.scss';

interface componentProps {
    placeholder?: string | undefined;
    input: string | undefined;
    setInput: (value: string) => void;
}

const InputField = ({ placeholder, input, setInput }: componentProps) => {

    function changeValue(value: string) {
        setInput(value);
    }

    return (
        <div className='setting-subcomponent input-field'>

            <div className="setting-item">
                <div className="input-field">
                    <input type="text" placeholder={placeholder} value={input} onChange={(e) => changeValue(e.target.value)} />
                </div>
            </div>

        </div>
    );
}

export default InputField;